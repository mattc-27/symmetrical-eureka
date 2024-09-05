# React Checkout Demo
This app demonstrates the integration of Recurly's React library and Node client library within an Express server.

## Getting Started
To get started follow the instructions below to clone the repository, add your API keys, install dependencies, and run the application locally.

## Prerequisites
Make sure you have the following installed on your machine:

- Node.js (v18 or later).
- npm (v10 or later).
- Recurly site in sandbox, or development mode. 
- Public and Private API keys.

## Installation
1. Clone the Repository:

```
git clone https://github.com/mattc-27/symmetrical-eureka.git
cd react-rjs-demo
```

2. Add your site's public + private API Keys to .env file
```
PUBLIC_API_KEY=your-public-key-here
PRIVATE_API_KAY=your-private-key-here
```

3. Install Dependencies:
```
npm install
```

## Running the App
To start the app locally run the following command:

```
npm start
```

## Setting a Plan Code
Enter a plan code from your Recurly site. Alternatively, set a plan via the URL by passing a plan code using the planName query parameter:

```
http://localhost:3000/?planName=yourPlanCode
```

## Testing 3D Secure
3D Secure and the SCA flow can be tested using the Recurly test gateway or a Stripe sandbox gateway. Both use test card (`4000000000003220`). I have not been able to get Braintree 3DS working (haven't the tested the others).

## Testing Fraud Management
After enabling Kount on your Recurly site with the sandbox credentials, uncomment the RiskDataCollector component below the form:

```
   <RiskDataCollector
        strategy="kount"
        onError={handleError} 
    />
```

## Documentation
- Recurly Node Client: https://github.com/recurly/recurly-client-node
- Recurly.js: https://recurly.com/developers/reference/recurly-js/#ot-pc-title
- React Recurly: https://github.com/recurly/react-recurly
- 3D secure integration guide: https://recurly.com/developers/guides/3ds2.html
