import React, { useEffect, useState } from "react";
import "../../stylesheets/App.css";
import Button from "@mui/material/Button";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login({ setCurrentPage }) {
    const [isAdmin, setIsAdmin] = useState(false);

    function takemetomainpage() {
        setCurrentPage("care-provider");
    }

    function takemetoadminpage() {
        setCurrentPage("admin");
    }

    function takemetorequestaccountpage() {
        setCurrentPage("request-account");
    }

    const { isAuthenticated, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated && user) {
            const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
            const userEmail = user.email;
            console.log(user);
            axios
                .post(`${baseURL}/api/employees/get_employee_by_email`, { email: userEmail })
                .then((response) => {
                    Cookies.set("employee_id", response.data.employee_id);
                    setIsAdmin(response.data.employee.isAdmin);
                    if (response.data.employee.isAdmin) {
                        takemetoadminpage();
                    } else {
                        takemetomainpage();
                    }
                })
                .catch((error) => {
                    console.error("Error fetching employee ID:", error);
                });
        } else {
            Cookies.remove("employee_id");
        }
    }, [isAuthenticated, user, setCurrentPage]);

    return (
        <>
            {!isAuthenticated && (
                <div className="login_screen">
                    <div className="login_app_name">Coordinated Care</div>
                    <br />
                    <div className="motto">
                        Revolutionizing the future of
                        <br /> hospital process management
                        <br /> systems
                    </div>
                    <LoginButton />
                    <br />
                    {/* <br />
                    <Button className="request_account_button" onClick={takemetorequestaccountpage}>
                        Request Account
                    </Button>
                    <br /> */}
                </div>
            )}
            <div className="credits">Proudly presented by Team Dodger Blue</div>
        </>
    );
}
