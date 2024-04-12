import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';

//Utilize .env file later
// const domain = process.env.REACT_APP_COORDINATED_CARE_DOMAIN;
// const clientId = process.env.REACT_APP_COORDINATED_CARE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-crsl7fds3e2pp8gg.us.auth0.com"
            clientId="qzb196eeCom4w7g9m5gW7IAfRTWAA2qN"
            redirectUri={window.location.origin}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
