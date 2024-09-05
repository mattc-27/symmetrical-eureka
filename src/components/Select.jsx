import React, { useEffect, useState } from 'react';

//import '../../main.css';

export function SelectPlanDropdown({ setPlanCode, data }) {

    const [selectedPlan, setSelectedPlan] = useState('');
    const [planOptions, setPlanOptions] = useState('');

    useEffect(() => {
        setPlanOptions(data.plans)
    }, [])

    const handleSelectChange = (e) => {
        const plan = e.target.value;
        setSelectedPlan(plan);
        //setSelectedState(state);
        setPlanCode({ code: plan })
    }
    return (

        <div className='dropdown-component'>
            <select
                onChange={handleSelectChange}
                value={selectedPlan}
                className='dropdown-selection'
            >
                {planOptions.map((plan) => (
                    <option
                        className='select-option'
                        //key={plan.id}
                        value={plan}
                    >
                        {plan}
                    </option>
                ))}
            </select>
        </div>

    );
}

{/* 
    
      <div className=''>

            </div>*/}