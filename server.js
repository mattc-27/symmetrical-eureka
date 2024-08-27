// API usage Dependencies
const express = require('express');
const recurly = require('recurly');

// Import middleware
require('dotenv').config();
const path = require('path');

const bodyParser = require('body-parser');
const { json } = require('body-parser');

const methodOverride = require('method-override')

const short = require('short-uuid');
const uuid = require('uuid');

const cors = require('cors')

var corsOptions = {
    origin: ['http://localhost:9001', 'http://localhost:3000', 'http://localhost:5173'],
    optionsSuccessStatus: 200 // For legacy browser support
}

// Set up express
const app = express();

const {
    PUBLIC_API_KEY,
    PRIVATE_API_KEY,
    PUBLIC_DIR_PATH
} = process.env;

// Mounts express.static to render example forms
const pubDirPath = PUBLIC_DIR_PATH || '/../../public';

// Implemenet middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(methodOverride('_method'))
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../client')))
app.use(express.static(pubDirPath));

// Instantiate a configured recurly client
const client = new recurly.Client(PRIVATE_API_KEY)

// Configure timer
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


/* --------------------------------------
// POST route to handle a Purchase form
-------------------------------------- */
app.post('/api/subscriptions/new', async function (req, res) {

    await delay(2500);
    res.set('Access-Control-Allow-Origin', 'http://localhost:9001');

    //console.log('Creating purchase...', req.body);

    const accountDetails = req.body.accountInfo;

    let purchaseReq = {
        currency: 'USD',
        account: {
            code: req.body.accountCode,
            address: {
                street1: accountDetails.street1, //'1234',
                city: accountDetails.city, //'Denver',
                region: accountDetails.region, //'CO',
                postalCode: accountDetails.postalCode, //'80021',
                country: accountDetails.country //'US'
            },
            billingInfo: { token_id: req.body.token_id },
        },
        subscriptions: [
            {
                planCode: req.body.plan_code,
                addOns: req.body.plan_addons
            }
        ]
    }
    try {
        let invoiceCollection = await client.createPurchase(purchaseReq)
        res.status(200).send({ invoiceCollection: invoiceCollection.chargeInvoice })
    } catch (err) {
        if (err && err.transactionError && err.transactionError.code === 'three_d_secure_action_required') {
            const { threeDSecureActionTokenId } = err.transactionError;
            //console.log(threeDSecureActionTokenId,)
            return res.send({ threeDSecure: true, threeDSecureActionTokenId });
        }
    }
});

/* --------------------------------------
// POST route to handle 3DS
-------------------------------------- */
app.post('/api/subscriptions/3ds', async function (req, res) {

    await delay(2500);
    res.set('Access-Control-Allow-Origin', 'http://localhost:9001');

    //console.log('Creating purchase...', req.body);

    const account_code = req.body.accountCode;

    try {
        const purchaseReq = {
            currency: 'USD',
            account: {
                code: account_code,//uuid.v1(),
                billingInfo: { token_id: req.body.token_id, three_d_secure_action_result_token_id: req.body.three_d_secure_action_result_token_id },
            },
            subscriptions: [
                {
                    planCode: req.body.plan_code,
                    addOns: req.body.plan_addons
                }
            ]
        }
        let invoiceCollection = await client.createPurchase(purchaseReq);
        //console.log(invoiceCollection.chargeInvoice.account.code)
        res.status(200).send({ invoiceCollection: invoiceCollection.chargeInvoice })
    } catch (err) {
        if (err && err.transactionError && err.transactionError.code === 'three_d_secure_action_required') {
            const { threeDSecureActionTokenId } = err.transactionError;
            //console.log(threeDSecureActionTokenId,)
            return res.send({ threeDSecure: true, threeDSecureActionTokenId });
        }
    }
});


// This endpoint provides configuration to recurly.js
app.get('/config', function (req, res) {
    res.setHeader('Content-Type', 'application/javascript');
    res.send(`window.recurlyConfig = { publicKey: ${PUBLIC_API_KEY} }`);
});


// Start the server
app.listen(9001, function () {
    console.log('Listening on port 9001');
});