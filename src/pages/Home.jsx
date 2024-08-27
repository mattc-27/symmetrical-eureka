import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecurly, useCheckoutPricing, CardElement, ThreeDSecureAction } from '@recurly/react-recurly';

import uuid from 'react-uuid';

import AddressForm from '../components/checkout/AddressForm';
import Cart from '../components/checkout/Cart';

import { CompletePurchase } from '../components/Buttons';
import { submitPurchase, submitThreeDSecurePurchase } from '../services/purchase';


export default function Home() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planName = searchParams.get('planName');

    const [purchaseRequest, setPurchaseRequest] = useState();
    const [purchaseRequestBody, setpurchaseRequestBody] = useState('');

    {/* Recurly.js config       */ }
    const formRef = React.useRef();
    const recurly = useRecurly();
    const [recurlyError, setRecurlyError] = useState(null);
    const [{ price, loading }, setPricing] = useCheckoutPricing(null, setRecurlyError);
    const showPrice = !loading && !recurlyError;

    const [actionTokenId, setActionTokenId] = useState('');
    const [resultToken, setResultToken] = useState('');

    {/*        */ }
    const [accountDetails, setAccountDetails] = useState({
        firstName: '',
        lastName: '',
        street1: '',
        postalCode: '',
        city: '',
        region: '',
        country: '',
    });

    const [pricingFormState, setPricingFormState] = useState({
        plan: '' /*location.state*/,
        planQuantity: 1,
        currency: 'USD',
        addons: []
    });

    {/*        */ }
    useEffect(() => {
        setPricingFormState({
            plan: planName || '5a847f3681e6',
            planQuantity: 1,
            currency: 'USD',
            addons: []
        })
    }, [])

    // Set pricing 
    useEffect(() => {
        setRecurlyError(null);
        const subscriptions = pricingFormState.plan ? [{
            plan: pricingFormState.plan,
            quantity: pricingFormState.planQuantity,
            addons: pricingFormState.addons
        }] : [];
        setPricing({ ...pricingFormState, subscriptions });
        //console.log(price);
    }, [setPricing, setPricingFormState, pricingFormState]);

    {/*        */ }
    const handlePurchaseSubmit = event => {
        if (event.preventDefault) event.preventDefault();
        recurly.token(formRef.current, async (err, token) => {
            if (err) {
                //console.log('[error]', err);
                alert(err.message);
            }
            else {
                const body = ({
                    accountCode: uuid(),
                    accountInfo: accountDetails,
                    token_id: token.id,
                    plan_code: pricingFormState.plan,
                    plan_quantity: pricingFormState.planQuantity,
                    plan_addons: pricingFormState.addons
                })
                setpurchaseRequestBody({ ...body })
                const res = await submitPurchase({ ...body })
                if (res.threeDSecure === true) {
                    //console.log({ message: '3ds required', actionTokenId: res.threeDSecureActionTokenId })
                    setPurchaseRequest({ ...body })
                    setActionTokenId(res.threeDSecureActionTokenId)
                } else {
                    //console.log('Successful purchase', res.invoiceCollection);
                    navigate(`/success/${res.accountId}`, { state: { ...res } });
                }
            }
        });
    }


    {/* 3D Secure        */ }
    useEffect(() => {
        console.log('received action token id', actionTokenId)
    }, [setActionTokenId])

    const handleThreeDSecureToken = token =>
        setResultToken(`${token.id}`);

    {/* resultToken      */ }
    useEffect(() => {
        //console.log(resultToken)
        async function threeDSecurePurchase() {
            try {
                const res = updateThreeDSecurePurchase(['three_d_secure_action_result_token_id'], resultToken)
                //console.log(res)
                const response = await submitThreeDSecurePurchase(res)
                //console.log(response);
                if (response.threeDSecure === true) {
                    setPurchaseRequest({ ...res })
                    setActionTokenId(response.threeDSecureActionTokenId)
                } else {
                    //console.log('Successful purchase', response);
                    //const accountId = response.accountId;
                    navigate(`/success/${response.accountId}`, { state: { ...response } });
                }
                submitThreeDSecurePurchase(res);
            } catch (error) {
                console.error(error.message)
            }
        }
        threeDSecurePurchase()
    }, [resultToken])

    const updateThreeDSecurePurchase = (name, value) => {
        const body = JSON.stringify({ ...purchaseRequest, ['three_d_secure_action_result_token_id']: resultToken });
        //console.log(body)
        return body
    }


    return (
        <div className='page-container'>
            <form
                ref={formRef}
                onSubmit={handlePurchaseSubmit}
                className='main-form'
            >
                <div className='content-column'>
                    <AddressForm setAccountDetails={setAccountDetails} />
                </div>
                <div className='cart-column'>
                    <Cart
                        handleSubmit={handlePurchaseSubmit}
                        pricingFormState={pricingFormState}
                        price={price}
                    />
                    <CardElement />
                    <div className='content-row'>
                        <CompletePurchase onSubmit={handlePurchaseSubmit} />
                    </div>
                </div>
                {/*   3ds  */}
                {
                    actionTokenId ? (
                        <div>
                            <ThreeDSecureAction
                                actionTokenId={actionTokenId}
                                onToken={handleThreeDSecureToken}
                                className="recurly-three-d-secure-action"
                            />
                        </div>
                    ) : null
                }
            </form>
        </div>
    );
}