import React from 'react';

export function CompletePurchase({ onSubmit }) {

    return (
        <button
            id='checkoutButton'
            type="submit"
            onSubmit={onSubmit}>
            Complete Checkout
        </button>
    );
}