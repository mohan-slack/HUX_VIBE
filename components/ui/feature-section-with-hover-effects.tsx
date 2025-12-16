import { cn } from "@/lib/utils";
import {
  CheckCircle,
  Palette,
  Users,
  Smartphone,
  Eye,
  Shield,
  Sparkles,
  Headphones,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Authentic Use First",
      description: "Share content based on real usage of the HUX Smart Ring. Speak from personal experience—daily wear, health insights, design, or lifestyle fit.",
      icon: <CheckCircle />,
    },
    {
      title: "Content Themes (Choose What Fits You)",
      description: "Wellness & health insights, design & craftsmanship, everyday lifestyle integration, tech + fashion storytelling. No requirement to cover all features.",
      icon: <Palette />,
    },
    {
      title: "Tone & Style",
      description: "Honest, informative, and natural. Premium, minimal, and aesthetic. Educational > promotional. Avoid exaggerated claims or medical promises.",
      icon: <Users />,
    },
    {
      title: "Platform Freedom",
      description: "Share on platforms where your audience already engages: Instagram, YouTube, TikTok, X, blogs, or newsletters. No posting frequency or volume mandates.",
      icon: <Smartphone />,
    },
    {
      title: "Disclosure & Transparency",
      description: "Clearly disclose collaborations or reward links where required. Follow platform-specific disclosure rules (#HUXPartner / #HUXCreator).",
      icon: <Eye />,
    },
    {
      title: "Brand Integrity",
      description: "Do not compare HUX negatively against competitors. Do not use misleading pricing or discount claims. Do not run paid ads using HUX branding unless explicitly approved.",
      icon: <Shield />,
    },
    {
      title: "Creative Freedom",
      description: "No fixed scripts. No forced CTAs. No pressure tactics. We trust creators to communicate value authentically.",
      icon: <Sparkles />,
    },
    {
      title: "Support & Assets",
      description: "Approved brand visuals and product details will be available on request. HUX team is available for clarifications or collaboration ideas.",
      icon: <Headphones />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-200",
        (index === 0 || index === 4) && "lg:border-l border-neutral-200",
        index < 4 && "lg:border-b border-neutral-200"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-hux-turquoise/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-hux-turquoise/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-hux-turquoise">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-hux-turquoise transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-hux-dark">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};