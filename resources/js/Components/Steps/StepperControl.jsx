import React from "react";
import StepControl from "./Componente/StepControl";

const StepperControl = ({handleClick,currentStep,steps,estadoModel}) => {

    return (
        <div className="flex justify-around mt-4 mb-8">
            <StepControl
                handleClick = {handleClick}
                currentStep = {currentStep}
                steps = {steps}
                estado = {estadoModel}
            />
        </div>
    )
}
export default StepperControl;
