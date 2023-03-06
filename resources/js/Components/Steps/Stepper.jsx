import React,{useEffect,useState,useRef} from "react";
import StepModelNew from "./Componente/StepModelNew";

const Stepper = ({ steps, currentStep ,estadoModel}) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    //console.log(estado)

    const updateStep = (stepNumber, steps)=>{
        const newSteps = [
            ...steps,
        ]


        let count = 0

        while(count<newSteps.length){

            if(count == stepNumber){
                newSteps[count] ={
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;

            } else if(count < stepNumber){
                newSteps[count] ={
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;
            } else{
                newSteps[count] ={
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }
        return newSteps;
    }
    
    useEffect(()=>{
        const stepsStatePrueba = []

        for (let i = 0; i < steps.length; i++) {

            stepsStatePrueba.push({
                'id': (i+1),
                'description': steps[i],
                'completed': false,
                // proceso o no_iniciado:
                //waiting:
                'highlighted': i == 0 ? true : false,
                'selected': i == 0 ? true : false,
            })
        }
       
        stepRef.current = stepsStatePrueba;

        const current = updateStep(currentStep -1,stepRef.current);

        setNewStep(current);

    },[steps, currentStep]);

    const displaySteps = newStep.map((step, index)=>{

        return(

            <div key={step.id} className={ step.id > 1 ? "w-full" :""}>

                <StepModelNew
                    index = {index}
                    step = {step}
                    estado = {estadoModel}
                />
            
            </div>
            )
        }
    );

    return (
        <div className="mx-auto my-5 p-4 flex justify-between items-center w-8/12">
            {displaySteps}
        </div>
    )
}
export default Stepper;
