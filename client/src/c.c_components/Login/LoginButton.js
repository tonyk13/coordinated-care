import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

export default function LoginButton() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button className="login_button" onClick={() => loginWithRedirect()}>
                Login !
            </Button>
        )
    )
}

