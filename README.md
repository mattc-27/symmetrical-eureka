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
git clone https://github.com/mattc-27/react-rjs-demo.git
cd react-rjs-demo
```

2. Add Your API Keys:

- Create a .env file in the root directory of the project.
- Add your public and private Recurly API keys to the .env file

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

## Setting the Plan Name in the URL
To set a plan for the checkout pricing you need to pass a plan code from your site in the URL using the planName query parameter in the URL:

```
http://localhost:3000/?planName=yourPlanCode
```

## Testing 3D Secure
To initialize the 3D Secure flow use a 3DS test card for the respective test gateway (e.g. if using the Recurly test gateway or Stripe this card number is `4000000000003220`).

## Documentation
- Recurly Node Client: https://github.com/recurly/recurly-client-node
- Recurly.js: https://recurly.com/developers/reference/recurly-js/#ot-pc-title
- React Recurly: https://github.com/recurly/react-recurly
- 3D secure integration guide: https://recurly.com/developers/guides/3ds2.html
