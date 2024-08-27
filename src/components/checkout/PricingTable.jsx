import React from 'react';

export default function PricingTable(props) {

    return (
        <div className='cart-table'>
            {props.pricingFormState &&
                <table>
                    <tbody >
                        <tr>
                            <th className='pricing-th'>
                                Item
                            </th>
                            <th className='pricing-th'>
                                Quantity
                            </th>
                        </tr>
                        <tr>
                            <td className="r1" style={{ borderBottom: '1px solid #252525' }}>{
                                props.pricingFormState.plan === '5a847f3681e6' ? 'Basic'
                                    : props.pricingFormState.plan === '44a63ceedf5e' ? 'Premium'
                                        : 'Annual'}</td>
                            <td className="r2" style={{ borderBottom: '1px solid #252525' }}>{props.pricingFormState.planQuantity}</td>
                        </tr>
                        {props.pricingFormState.addons &&
                            // eslint-disable-next-line no-unused-vars
                            props.pricingFormState.addons.map((addon, i) => (
                                // eslint-disable-next-line react/jsx-key
                                <tr className='table-row' style={{ borderBottom: '1px solid #252525' }}>
                                    <td className="r1" style={{ borderBottom: '1px solid #252525' }}>{addon.name}</td>
                                    <td className="r2" style={{ borderBottom: '1px solid #252525' }}>{addon.quantity}</td>
                                </tr>
                            ))
                        }
                        <tr className='subtotal-row'>
                            <td className="r1-total" style={{ borderBottom: '1px solid #252525' }} >Subtotal: </td>
                            <td className="r2-total" style={{ borderBottom: '1px solid #252525' }}>{`${props.price.currency.symbol}${props.price.now.subtotal}`}</td>
                            <td style={{ borderBottom: '1px solid #252525' }}>{/* */}</td>
                        </tr>
                        <tr className='totals-row'>
                            <td className="r1-total">Total: </td>
                            <td className="r2-total">{`${props.price.currency.symbol}${props.price.now.subtotal}`}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    );
}