import React from 'react';

import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';

import {
    RecurlyProvider,
    Elements,
} from '@recurly/react-recurly';

import Layout from './components/Layout';
import Home from './pages/Home';
import Success from './pages/Success';

{/* React Router Config */ }
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                children: [
                    { index: true, element: <Home /> },
                    { path: '/success/:accountId', element: <Success /> }
                ]
            }
        ]
    }
]);

export default function App() {

    return (
        <RecurlyProvider publicKey={public_api_key}>
            <Elements>
                <RouterProvider router={router} />
            </Elements>
        </RecurlyProvider>
    );

}