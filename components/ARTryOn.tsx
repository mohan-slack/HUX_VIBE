import React, { useEffect, useRef, useState } from 'react';
import { X, Camera, RotateCcw, Check, ScanFace, Target } from 'lucide-react';
import { Button } from './Button';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// Fix for React Three Fiber JSX elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      torusGeometry: any;
      meshPhysicalMaterial: any;
      meshStandardMaterial: any;
      cylinderGeometry: any;
      meshBasicMaterial: any;
      shadowMaterial: any;
      ambientLight: any;
      directionalLight: any;
      orthographicCamera: any;
    }
  }
}

interface ARTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productColor: string;
}

// ----------------------------------------------------------------------
// 3D RING COMPONENT WITH IMAGE TEXTURE
// ----------------------------------------------------------------------
const RingModel = ({ position, rotation, scale, color, isAligned }: any) => {
  const ringTexture = useTexture('/images/productImages/ring-angle-4.png');
  
  // Map friendly color names to hex
  const getColorHex = (c: string) => {
    switch (c) {
      case 'Sterling Gold': return '#FFD700';
      case 'Lunar Rose': return '#E0A899';
      case 'Tarnish Grey': return '#2a2a2a';
      default: return '#D4AF37';
    }
  };

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Alignment glow effect when properly positioned */}
      {isAligned && (
        <mesh scale={[1.2, 1.2, 1.2]}>
          <torusGeometry args={[1, 0.15, 32, 64]} />
          <meshBasicMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      
      {/* Main ring with texture */}
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1, 0.12, 64, 100]} />
        <meshPhysicalMaterial 
          map={ringTexture}
          color={getColorHex(color)} 
          metalness={0.8} 
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>
      
      {/* Inner decorative ridge */}
      <mesh scale={[0.98, 0.98, 0.98]}>
        <torusGeometry args={[1, 0.03, 32, 64]} />
        <meshStandardMaterial color="#000" roughness={0.9} />
      </mesh>

      {/* Phantom finger occlusion system */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh renderOrder={-1}>
          <cylinderGeometry args={[0.85, 0.85, 8, 32]} />
          <meshBasicMaterial colorWrite={false} />
        </mesh>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.86, 0.86, 8, 32]} />
          <shadowMaterial transparent opacity={0.6} color="black" />
        </mesh>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------
// AR SCENE MANAGER WITH ALIGNMENT DETECTION
// ----------------------------------------------------------------------
const ARScene = ({ handData, productColor, onAlignmentChange }: { handData: any, productColor: string, onAlignmentChange: (aligned: boolean) => void }) => {
  const ringRef = useRef<THREE.Group>(null);
  const [isAligned, setIsAligned] = useState(false);
  
  useFrame(() => {
    if (handData && ringRef.current) {
      // Smooth interpolation for jitter reduction
      ringRef.current.position.lerp(handData.position, 0.2);
      ringRef.current.rotation.x = THREE.MathUtils.lerp(ringRef.current.rotation.x, handData.rotation.x, 0.2);
      ringRef.current.rotation.y = THREE.MathUtils.lerp(ringRef.current.rotation.y, handData.rotation.y, 0.2);
      ringRef.current.rotation.z = THREE.MathUtils.lerp(ringRef.current.rotation.z, handData.rotation.z, 0.2);
      
      const currentScale = ringRef.current.scale.x;
      const targetScale = handData.scale;
      const smoothScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.2);
      ringRef.current.scale.set(smoothScale, smoothScale, smoothScale);
      
      // Check alignment based on stability and positioning (lowered thresholds)
      const aligned = handData.confidence > 0.3 && handData.stability > 0.3;
      if (aligned !== isAligned) {
        setIsAligned(aligned);
        onAlignmentChange(aligned);
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />

      <group ref={ringRef} visible={!!handData}>
        <RingModel color={productColor} isAligned={isAligned} />
      </group>
    </>
  );
};

// ----------------------------------------------------------------------
// MAIN AR COMPONENT
// ----------------------------------------------------------------------
export const ARTryOn: React.FC<ARTryOnProps> = ({ isOpen, onClose, productColor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [handData, setHandData] = useState<any>(null);
  const [isAligned, setIsAligned] = useState(false);
  const [fingerHighlight, setFingerHighlight] = useState<{x: number, y: number} | null>(null);
  const requestRef = useRef<number | null>(null);
  const stabilityBuffer = useRef<number[]>([]);

  // 1. Initialize MediaPipe
  useEffect(() => {
    const initMediaPipe = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        setHandLandmarker(landmarker);
        setLoading(false);
      } catch (error) {
        console.error("Error loading MediaPipe:", error);
        setLoading(false);
      }
    };

    if (isOpen && !handLandmarker) {
      initMediaPipe();
    }
  }, [isOpen]);

  // 2. Start Camera
  const startCamera = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', predictWebcam);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please allow permissions.");
    }
  };

  // 3. Enhanced Prediction Loop with Stability Tracking
  const predictWebcam = () => {
    if (!handLandmarker || !videoRef.current) return;

    const nowInMs = Date.now();
    const results = handLandmarker.detectForVideo(videoRef.current, nowInMs);

    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      
      // Key Landmarks for Index Finger: 5 (MCP), 6 (PIP), 7 (DIP), 8 (TIP)
      const mcp = landmarks[5];
      const pip = landmarks[6];
      const dip = landmarks[7];
      const tip = landmarks[8];
      
      // Simple detection check
      if (!mcp || !pip || !tip) {
        console.log('Missing landmarks');
        setHandData(null);
        setFingerHighlight(null);
        return;
      }

      // Calculate finger highlight position (screen coordinates)
      const videoRect = videoRef.current.getBoundingClientRect();
      setFingerHighlight({
        x: mcp.x * videoRect.width,
        y: mcp.y * videoRect.height
      });

      // --- ENHANCED 3D POSITION CALCULATION ---
      const aspect = 640 / 480;
      const fovFactor = 8;
      
      const x = (mcp.x - 0.5) * fovFactor * aspect;
      const y = -(mcp.y - 0.5) * fovFactor;
      const z = mcp.z || 0;

      // --- IMPROVED ROTATION CALCULATION ---
      const fingerVector = {
        x: pip.x - mcp.x,
        y: pip.y - mcp.y
      };
      const angle = Math.atan2(-fingerVector.y, fingerVector.x);
      
      // --- ADAPTIVE SCALE CALCULATION ---
      const fingerLength = Math.sqrt(
        Math.pow(tip.x - mcp.x, 2) + Math.pow(tip.y - mcp.y, 2)
      );
      const scaleBase = Math.max(0.5, Math.min(2.0, fingerLength * 12));

      // --- STABILITY TRACKING ---
      const currentStability = Math.min(fingerLength * 10, 1.0);
      stabilityBuffer.current.push(currentStability);
      if (stabilityBuffer.current.length > 10) {
        stabilityBuffer.current.shift();
      }
      const avgStability = stabilityBuffer.current.reduce((a, b) => a + b, 0) / stabilityBuffer.current.length;

      // --- SIMPLIFIED CONFIDENCE ---
      const confidence = fingerLength > 0.05 ? 0.8 : 0.2;
      
      console.log('Detection:', { fingerLength: fingerLength.toFixed(3), confidence, visible: fingerLength > 0.05 });

      setHandData({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(0, 0, angle + Math.PI / 2),
        scale: scaleBase,
        confidence,
        stability: avgStability
      });

    } else {
      setHandData(null);
      setFingerHighlight(null);
      stabilityBuffer.current = [];
    }

    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  // Cleanup
  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
      setIsCameraActive(false);
      setHandData(null);
    } else if (handLandmarker && !isCameraActive) {
      startCamera();
    }
  }, [isOpen, handLandmarker]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center animate-fadeIn">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white hover:text-hux-turquoise bg-white/10 p-2 rounded-full backdrop-blur-md z-[110] transition-colors"
      >
        <X size={32} />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-2xl aspect-[4/3] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        
        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-neutral-900">
            <div className="w-12 h-12 border-4 border-hux-turquoise border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-display tracking-widest text-sm">INITIALIZING NEURAL ENGINE...</p>
          </div>
        )}

        {/* Permission State */}
        {!loading && !isCameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 bg-neutral-900/80 backdrop-blur">
             <Camera size={48} className="text-hux-turquoise mb-6" />
             <h3 className="text-2xl font-display font-bold mb-2">Allow Camera Access</h3>
             <p className="text-neutral-400 mb-8 max-w-xs text-center">To visualize HUX on your hand, we need access to your camera. No data is stored.</p>
             <Button onClick={startCamera}>Enable Camera</Button>
          </div>
        )}

        {/* Hand Guide Overlay */}
        {isCameraActive && !handData && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center">
              {/* Realistic Hand Gesture SVG */}
              <svg width="280" height="350" viewBox="0 0 280 350" className="mb-6 opacity-90">
                <defs>
                  <linearGradient id="handGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.7"/>
                  </linearGradient>
                </defs>
                <g fill="url(#handGradient)" stroke="white" strokeWidth="2">
                  {/* Palm - realistic shape */}
                  <path d="M80 180 Q70 160 75 140 Q85 120 105 115 Q130 110 140 120 Q160 110 180 115 Q200 120 210 140 Q215 160 205 180 L200 260 Q195 280 175 285 Q140 290 105 285 Q85 280 80 260 Z" />
                  
                  {/* Thumb - realistic positioning */}
                  <path d="M85 170 Q60 160 45 140 Q35 120 40 100 Q50 85 70 90 Q85 100 90 120 Q88 140 85 160" />
                  
                  {/* Index Finger - extended and highlighted */}
                  <g stroke="#00ff88" strokeWidth="3" fill="#00ff88" fillOpacity="0.3">
                    <path d="M115 115 Q115 100 115 80 Q115 60 115 40 Q115 25 125 20 Q135 25 135 40 Q135 60 135 80 Q135 100 135 115" />
                    {/* Finger segments */}
                    <circle cx="125" cy="95" r="8" fill="#00ff88" fillOpacity="0.2" />
                    <circle cx="125" cy="70" r="7" fill="#00ff88" fillOpacity="0.2" />
                    <circle cx="125" cy="45" r="6" fill="#00ff88" fillOpacity="0.2" />
                  </g>
                  
                  {/* Other fingers - folded/bent */}
                  <path d="M150 115 Q150 100 155 85 Q160 75 165 80 Q170 85 165 95 Q160 105 155 115" opacity="0.6" />
                  <path d="M175 115 Q175 100 180 85 Q185 75 190 80 Q195 85 190 95 Q185 105 180 115" opacity="0.6" />
                  <path d="M200 125 Q200 110 205 100 Q210 95 215 100 Q220 105 215 115 Q210 125 205 130" opacity="0.6" />
                  
                  {/* Ring on index finger */}
                  <ellipse cx="125" cy="55" rx="10" ry="4" fill="#FFD700" stroke="#FFA500" strokeWidth="1.5" />
                  <ellipse cx="125" cy="55" rx="8" ry="3" fill="#FFED4E" opacity="0.8" />
                </g>
                
                {/* Wrist */}
                <rect x="90" y="280" width="100" height="40" rx="20" fill="url(#handGradient)" stroke="white" strokeWidth="2" opacity="0.8" />
              </svg>
              
              <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-sm">
                <p className="text-white text-xl font-bold mb-2">🖐️ Show Your Hand</p>
                <p className="text-green-400 text-sm font-semibold mb-1">Point your INDEX FINGER up</p>
                <p className="text-neutral-300 text-xs">Keep other fingers folded like the image above</p>
              </div>
            </div>
          </div>
        )}

        {/* Video Feed (Mirrored) */}
        <video 
          ref={videoRef}
          autoPlay 
          playsInline
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" 
        />

        {/* Finger Highlight Overlay */}
        {fingerHighlight && (
          <div 
            className="absolute pointer-events-none z-10"
            style={{
              left: fingerHighlight.x - 20,
              top: fingerHighlight.y - 20,
              transform: 'scaleX(-1)' // Mirror to match video
            }}
          >
            <div className={`w-10 h-10 rounded-full border-2 ${isAligned ? 'border-green-400 bg-green-400/20' : 'border-cyan-400 bg-cyan-400/20'} animate-pulse`}>
              <Target className={`w-6 h-6 m-2 ${isAligned ? 'text-green-400' : 'text-cyan-400'}`} />
            </div>
          </div>
        )}

        {/* Alignment Guides */}
        {handData && !isAligned && (
          <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
            <div className="border-2 border-dashed border-cyan-400/60 rounded-full w-32 h-32 flex items-center justify-center animate-pulse">
              <div className="text-cyan-400 text-xs font-bold text-center">
                ALIGN<br/>FINGER
              </div>
            </div>
          </div>
        )}

        {/* AR Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas 
            shadows
            camera={{ position: [0, 0, 5], fov: 50 }} 
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          >
            <ARScene handData={handData} productColor={productColor} onAlignmentChange={setIsAligned} />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
          <div className="text-white">
            <h4 className="font-display font-bold text-lg">{productColor}</h4>
            <p className="text-xs text-neutral-300">Point your index finger up</p>
          </div>
          
          <div className="flex gap-2">
            {!handData ? (
               <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 px-3 py-1.5 rounded-full text-yellow-200 text-xs font-bold animate-pulse">
                 <ScanFace size={14} /> Scanning...
               </div>
            ) : !isAligned ? (
               <div className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-500/50 px-3 py-1.5 rounded-full text-cyan-200 text-xs font-bold animate-pulse">
                 <Target size={14} /> Align Index Finger
               </div>
            ) : (
               <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 px-3 py-1.5 rounded-full text-green-200 text-xs font-bold">
                 <Check size={14} /> Perfect Fit!
               </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-neutral-500 text-xs mt-6 text-center max-w-md">
        Powered by MediaPipe & WebGL.
      </p>
    </div>
  );
};