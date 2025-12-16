import { cn } from "@/lib/utils";
import { UserPlus, Megaphone, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export function InfluencerStepsWithEffects({ setShowRewards, setShowGuidelines }: { setShowRewards: (show: boolean) => void; setShowGuidelines: (show: boolean) => void }) {
  const steps = [
    {
      title: "Apply",
      description: "Become part of the HUX creator ecosystem.",
      detail: "Apply to collaborate with HUX based on your content quality, audience trust, and alignment with wellness, tech, or lifestyle.",
      icon: <UserPlus size={40} />,
      buttonText: "Apply Now",
      buttonLink: "/influencer-signup",
      gradient: "from-green-400 to-emerald-500",
      borderColor: "border-green-400",
      textColor: "text-green-600",
      hoverBg: "hover:bg-green-50",
    },
    {
      title: "Create",
      description: "Share real experiences, not ads.",
      detail: "Create authentic content around your HUX Smart Ring—health insights, design aesthetics, lifestyle integration, or daily use. We value genuine storytelling over scripted promotions.",
      icon: <Megaphone size={40} />,
      buttonText: "Creator Guidelines",
      buttonLink: "#",
      gradient: "from-blue-400 to-indigo-500",
      borderColor: "border-blue-400",
      textColor: "text-blue-600",
      hoverBg: "hover:bg-blue-50",
    },
    {
      title: "Benefit",
      description: "Grow with HUX.",
      detail: "Earn up to 8% rewards on qualifying purchases, along with early access to new products, exclusive drops, and long-term creator collaboration opportunities.",
      icon: <DollarSign size={40} />,
      buttonText: "Rewards & Benefits",
      buttonLink: "rewards",
      gradient: "from-yellow-400 to-orange-500",
      borderColor: "border-orange-400",
      textColor: "text-orange-600",
      hoverBg: "hover:bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {steps.map((step, index) => (
        <StepCard key={step.title} {...step} index={index} setShowRewards={setShowRewards} setShowGuidelines={setShowGuidelines} />
      ))}
    </div>
  );
}

const StepCard = ({
  title,
  description,
  detail,
  icon,
  buttonText,
  buttonLink,
  gradient,
  borderColor,
  textColor,
  hoverBg,
  index,
  setShowRewards,
  setShowGuidelines,
}: {
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  buttonText: string;
  buttonLink: string;
  gradient: string;
  borderColor: string;
  textColor: string;
  hoverBg: string;
  index: number;
  setShowRewards: (show: boolean) => void;
  setShowGuidelines: (show: boolean) => void;
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 border border-neutral-200 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-hux-turquoise/5 via-transparent to-hux-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-hux-turquoise/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100" />
      <div className="absolute top-8 right-8 w-1 h-1 bg-hux-gold/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300" />
      
      <div className="text-center space-y-6 relative z-10">
        <div className={cn(
          "w-20 h-20 bg-gradient-to-br rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl",
          gradient
        )}>
          <div className="text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-hux-dark font-display group-hover:text-hux-turquoise transition-colors duration-300">
            {title}
          </h3>
          <p className="text-neutral-600 leading-relaxed group-hover:text-neutral-700 transition-colors duration-300">
            {description}
          </p>
          <p className="text-sm text-neutral-500 group-hover:text-neutral-600 transition-colors duration-300 transform group-hover:translate-y-1">
            {detail}
          </p>
        </div>
        
        <div className="flex justify-center">
          {buttonLink === "/influencer-signup" ? (
            <Link to={buttonLink}>
              <Button 
                variant="outline" 
                className={cn(
                  "transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 shadow-md group-hover:shadow-lg",
                  borderColor,
                  textColor,
                  hoverBg
                )}
              >
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button 
              variant="outline" 
              className={cn(
                "transform group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 shadow-md group-hover:shadow-lg",
                borderColor,
                textColor,
                hoverBg
              )}
              onClick={buttonLink === "rewards" ? () => setShowRewards(true) : buttonText === "Creator Guidelines" ? () => setShowGuidelines(true) : undefined}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-hux-turquoise to-hux-gold group-hover:w-full transition-all duration-700 ease-out" />
    </div>
  );
};