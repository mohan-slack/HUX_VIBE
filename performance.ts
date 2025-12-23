// Performance monitoring utilities for all devices

export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const isMobile = (): boolean => getDeviceType() === 'mobile';
export const isTablet = (): boolean => getDeviceType() === 'tablet';
export const isDesktop = (): boolean => getDeviceType() === 'desktop';

export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const connection = (navigator as any).connection;
  const hardwareConcurrency = navigator.hardwareConcurrency || 1;
  const deviceMemory = (navigator as any).deviceMemory || 1;
  
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isLowCPU = hardwareConcurrency < 4;
  const isLowRAM = deviceMemory < 2;
  
  return isSlowConnection || isLowCPU || isLowRAM;
};

export const shouldReduceAnimations = (): boolean => {
  if (typeof window === 'undefined') return false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion || isLowEndDevice();
};

export const getOptimalSettings = () => {
  const deviceType = getDeviceType();
  const isLowEnd = isLowEndDevice();
  
  return {
    particleCount: isLowEnd ? 20 : deviceType === 'mobile' ? 40 : deviceType === 'tablet' ? 80 : 120,
    animationSpeed: isLowEnd ? 0.3 : deviceType === 'mobile' ? 0.6 : deviceType === 'tablet' ? 0.8 : 1,
    orbitRadius: deviceType === 'mobile' ? 0.7 : deviceType === 'tablet' ? 0.85 : 1,
    iconSize: deviceType === 'mobile' ? 0.7 : deviceType === 'tablet' ? 0.85 : 1,
    enableVideo: deviceType === 'desktop' && !isLowEnd,
    enableComplexAnimations: deviceType === 'desktop' && !shouldReduceAnimations(),
    containerSize: deviceType === 'mobile' ? 300 : deviceType === 'tablet' ? 400 : 500
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const preloadCriticalImages = (imageUrls: string[]): Promise<void[]> => {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  });
  return Promise.all(promises);
};