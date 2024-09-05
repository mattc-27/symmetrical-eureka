import React from 'react';

function FormInput({ label, htmlFor, placeholder, value, name, defaultValue, onChange, type, dataRecurly, style }) {

    return (
        <div className='form-input-group'>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                type={type}
                data-recurly={dataRecurly}
                style={style}
            />
        </div>
    );
}


function PlanInput({ label, htmlFor, placeholder, value, name, defaultValue, onChange, type, dataRecurly, style }) {

    return (
        <div className='plan-input-group'>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                type={type}
                data-recurly={dataRecurly}
         
            />
        </div>
    );
}

function FormInputRow({ label, htmlFor, placeholder, value, name, defaultValue, onChange, type, dataRecurly }) {

    return (
        <div className='form-input-group-row'>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                placeholder={placeholder}
                value={value}
                name={name}
                defaultValue={defaultValue}
                onChange={onChange}
                type={type}
                data-recurly={dataRecurly}
            />
        </div>
    );
}

export { FormInput, FormInputRow, PlanInput };