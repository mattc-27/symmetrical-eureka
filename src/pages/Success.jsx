import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation, useParams } from 'react-router-dom';

//import AccountInfo from './components/AccountInfo';


function Success() {

    const navigate = useNavigate();
    const location = useLocation();

    const [purchaseDetails, setPurchaseDetails] = useState('');
    //const [accountId, setAccountId] = useState('');

    const [invoiceUrl, setInvoiceUrl] = useState('');

    const [currentAccount, setCurrentAccount] = useState('');

    const { accountId } = useParams();

    useEffect(() => {
        async function completedPurchase() {

            setPurchaseDetails(location.state);
            try {
                const response = await fetch(`/api/account/${accountId}`);
                const data = await response.json();
                setCurrentAccount(data);

                const hostedToken = data.account.hostedLoginToken;
                const invoiceNo = purchaseDetails.number;

                setInvoiceUrl(
                    `https://highaltitude-dev.recurly.com/account/invoices/${invoiceNo}?ht=${hostedToken}`
                )
            } catch (error) {
                console.error(error.message)
            }
        }
        completedPurchase()
    }, [])

    return (
        <>
            <div className='container w-100'>
                <div className='success-message'>
                    <h1>Thanks for your purchase!</h1>
                    <div className='checkout-complete col content-start items-start'>
                        <Link className='success-link' to={`/`} state={currentAccount}>Start over</Link>
                        {invoiceUrl ?
                            <Link className='success-link' to={invoiceUrl} >View Invoice</Link>
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Success;