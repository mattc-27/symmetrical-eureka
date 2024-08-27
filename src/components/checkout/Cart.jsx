import React, { useState } from 'react';
import PricingTable from './PricingTable';
import { useRecurly, useCheckoutPricing } from '@recurly/react-recurly';

export default function Cart({ pricingFormState, price }) {

    const recurly = useRecurly();

    const [recurlyError, setRecurlyError] = useState(null);
    const [{ loading }, setPricing] = useCheckoutPricing(null, setRecurlyError);

    const showPrice = !loading && !recurlyError;

    return (
        <>
            <div className='cart-title'>
                <h2>Cart</h2>
            </div>
            {recurlyError ? <span style={{ color: 'red' }}>{recurlyError.message}</span> : ''}
            {showPrice ? (
                <PricingTable pricingFormState={pricingFormState} price={price} />
            ) : null}
            {loading && 'Loading'}
        </>
    );
}

