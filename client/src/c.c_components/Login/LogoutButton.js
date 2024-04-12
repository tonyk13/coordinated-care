import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button className="login_button" onClick={() => logout()}>
                Logout (To Be Moved)
            </Button>
        )
    )
}

export default LogoutButton