import { useAuth0 } from "@auth0/auth0-react";
import { Button, Box } from "@mui/material";

export default function LogoutButton({ setShowLogoutModal }) {
	const { logout, isAuthenticated } = useAuth0();

	const handleLogout = () => {
		logout();
	};

	const handleLogoutCancel = () => {
		setShowLogoutModal(false);
	};

	return (
		isAuthenticated && (
			<Box
				sx={{
					position: "fixed",
					top: "30%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					backgroundColor: "white",
					padding: "80px",
					boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
					borderRadius: "8px",
					textAlign: "center",
					zIndex: 9999,
				}}
			>
				<p>Are you sure you want to log out?</p>
				<Box sx={{ display: "flex", justifyContent: "center", gap: "30px", mt: "60px" }}>
					<Button variant="contained" color="error" onClick={handleLogout} sx={{ mr: 1 }}>
						Confirm Logout
					</Button>
					<Button variant="outlined" color="primary" onClick={handleLogoutCancel} sx={{ ml: 1 }}>
						Cancel
					</Button>
				</Box>
			</Box>
		)
	);
}
