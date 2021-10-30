import React, { CSSProperties } from "react";

const ProgressBar = ({
    total_quantity,
    currentStep
}: {
    total_quantity: number,
    currentStep: string
}) => {
    const steps = [
        ["address", "Delivery"],
        ["payment", "Payment"],
        ["complete", "Complete"]
    ];
    const currentIndex = steps.findIndex(step => step[0] === currentStep);
    
    const bar_position = {
        position: "absolute",
        zIndex: -1,
        height: "4px",
        top: "12px",
    } as CSSProperties;
    const barColors = steps.map((step, index) => {
        if (currentStep === "complete") {
            return step[0] = "bg-green-700";
        } else if (index < currentIndex) {
            return step[0] = "bg-green-700";
        } else if (index > currentIndex) {
            return step[0] = "bg-gray-300";
        } else {
            return step[0] = "bg-blue-400";
        }
    });

    if (total_quantity === 0 && currentStep !== "complete") {
        return null;
    } else {
        return (
            <div className="pb-8">
                {/* progress indicator bar in three different steps */}
                <div className="relative">
                    <div className={barColors[0]} style={{...bar_position, width: "32px", left: 0}}></div>
                    <div className={barColors[1]} style={{...bar_position, width: "calc(50% - 32px)", left: "32px"}}></div>
                    <div className={barColors[2]} style={{...bar_position, width: "50%", left: "50%"}}></div>
                </div>
                {/* step icons are styled according to whether it's current, next or completed */}
                <div className="flex justify-between text-center">
                    {steps.map((step, index) => {
                        if (currentStep === "complete" || index < currentIndex) {
                            return (
                                <div key={index} className="w-16">
                                    <div>
                                        <span className="material-icons text-green-700 bg-white rounded-full">check_circle</span>
                                    </div>
                                    <div className="-m-2">
                                        <label className="text-xs text-green-700 font-bold">{step[1]}</label>
                                    </div>
                                </div>
                            )
                        } else if (index === currentIndex) {
                            return (
                                <div key={index} className="w-16">
                                    <div>
                                    <span className="material-icons text-white bg-blue-400 rounded-full">radio_button_unchecked</span>
                                    </div>
                                    <div className="-m-2">
                                        <label className="text-xs text-blue-400 font-bold">{step[1]}</label>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className="w-16">
                                    <div>
                                        <span className="material-icons text-gray-300 bg-white rounded-full">radio_button_unchecked</span>
                                    </div>
                                    <div className="-m-2">
                                        <label className="text-xs text-gray-300">{step[1]}</label>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
};

export default ProgressBar;