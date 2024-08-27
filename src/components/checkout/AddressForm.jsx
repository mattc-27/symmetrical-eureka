import React, { useState } from "react";
import { FormInput } from "../FormComponents";

export default function AddressForm({ setAccountDetails }) {

    function handleChange(name, value) {
        setAccountDetails(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <div className="form-container">
            <h2>Billing address</h2>
            <div className='form-row'>
                <FormInput
                    label={'First name'}
                    //placeholder={'First name'}
                    defaultValue={'First'}
                    name='firstName'
                    onChange={e => handleChange('firstName', e.target.value)}
                    type={'text'}
                    dataRecurly="first_name"
                />
                <FormInput
                    label={'Last name'}
                    placeholder={'Last name'}
                    defaultValue={'Last'}
                    name='lastName'
                    onChange={e => handleChange('lastName', e.target.value)}
                    type={'text'}
                    dataRecurly="last_name"
                />
            </div>
            <div className='form-row'>
                <FormInput
                    label={'Address 1'}
                    defaultValue={'9581'}
                    name='address1'
                    onChange={e => handleChange('street1', e.target.value)}
                    type={'text'}
                    dataRecurly="address1"
                    id='addr'
                />
            </div>
            <div className='form-row'>
                <FormInput
                    label={'City'}
                    defaultValue={'Fargo'}
                    name='city'
                    onChange={e => handleChange('city', e.target.value)}
                    type={'text'}
                    dataRecurly="city"
                />
                <FormInput
                    label={'State/Province'}
                    defaultValue={'ND'}
                    name='region'
                    onChange={e => handleChange('region', e.target.value)}
                    type={'text'}
                    dataRecurly="state"
                />
            </div>
            <div className='form-row'>
                <FormInput
                    label={'Postal code'}
                    defaultValue={'58106'}
                    name='postalCode'
                    onChange={e => handleChange('postalCode', e.target.value)}
                    type={'text'}
                    dataRecurly="postal_code"
                />
                <FormInput
                    label={'Country'}
                    //placeholder={'US'}
                    defaultValue={'US'}
                    name='Country'
                    onChange={e => handleChange('country', e.target.value)}
                    type={'text'}
                    dataRecurly="country"
                />
            </div>
        </div>
    );
}