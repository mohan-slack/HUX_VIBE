import { cn } from "@/lib/utils";
import { useState } from "react";

export interface PricingBadgeProps {
    retailPrice?: string;
    founderPrice?: string;
    savings?: string;
}

const PricingBadge: React.FC<PricingBadgeProps> = ({
    retailPrice = '₹17,999',
    founderPrice = '₹10,000',
    savings = '₹7,999',
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDetails = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="slide-in">
            <div className="badge-wrapper">
                <div className="badge-container">
                    <div
                        className="badge-card"
                        onClick={toggleDetails}
                    >
                        <div className="shimmer-overlay"></div>

                        <div className="badge-content">
                            <div className="icon-container">
                                <div className="icon-wrapper">
                                    <svg className="clock-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 2v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-content">
                                <p className="label">Retail Price: {retailPrice}</p>
                                <h3 className="date">Founder Price: {founderPrice}</h3>
                                <p className="day">Save {savings} with early access</p>
                            </div>

                            <div className="badge-pill-container">
                                <div className="badge-pill">
                                    <p className="badge-text">Limited</p>
                                </div>
                                <svg
                                    className={`arrow-icon ${isOpen ? 'open' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <svg className="border-svg">
                        <rect
                            x="1"
                            y="1"
                            width="calc(100% - 2px)"
                            height="calc(100% - 2px)"
                            rx="16"
                            ry="16"
                            fill="none"
                            stroke="#02b3d9"
                            strokeWidth="2"
                            className="sliding-line"
                            pathLength="1"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PricingBadge;