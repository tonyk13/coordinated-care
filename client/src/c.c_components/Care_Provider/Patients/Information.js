import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  TextField,
  Tab,
  Tabs,
} from "@mui/material";
import Billing from "./Billing";
import EditBilling from "./EditBilling";
import Documents from "./Documents";
import Procedures from "./Procedures";
import Appointments from "./Appointments";


export default function Information() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between viewing and editing
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [formData, setFormData] = useState({
    name: "Scott, Alan",
    dob: "July 4, 1980",
    phone: "+1 (555) 123-4567",
    email: "alan@email.org",
    address: "123 Healthway Drive, Meditown, State, 45678",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1 (555) 987-6543",
    chronicConditions: "Diabetes",
  });

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const handleEditClick = () => {
		setIsEditing(true);
	};
  const toggleEdit = () => {
    setIsEditingInfo(!isEditingInfo);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveChanges = () => {
    setIsEditing(false);

  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={1} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#5162F7", fontWeight: "bold", mr: "2vw" }}
          >
            {formData.name}
          </Typography>

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Patient information tabs"
          >
            <Tab label="Patient Information" />
            <Tab label="Appointments" />
            <Tab label="Procedures" />
            <Tab label="Patient Documents" />
            <Tab label="Billing" />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <Box sx={{ mt: 2 }}>
            {isEditingInfo ? (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="chronic Conditions"
                  name="chronicConditions"
                  value={formData.chronicConditions}
                  onChange={handleInputChange}
                  margin="normal"
                />

                





                <Box sx={{ mt: 2 }}>
                  <Button
                    sx={{ mr: 1 }}
                    variant="outlined"
                    onClick={toggleEdit}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={saveChanges}>
                    Save
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                            Personal Information
                        </Typography>
                        <Typography variant="body1">Name: Scott, Alan</Typography>
                        <Typography variant="body1">Date of Birth: July 4, 1980</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body1">Contact Information:</Typography>
                        <Typography variant="body1">Phone: +1 (555) 123-4567</Typography>
                        <Typography variant="body1">Email: alan@email.org</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body1">Address: 123 Healthway Drive, Meditown, State, 45678</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="body1">Emergency Contact:</Typography>
                        <Typography variant="body1">Name: Jane Doe</Typography>
                        <Typography variant="body1">Relationship: Spouse</Typography>
                        <Typography variant="body1">Phone: +1 (555) 987-6543</Typography>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                            Chronic Conditions
                        </Typography>
                        <Typography variant="body1">Diabetes</Typography>

                        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                            <Button variant="contained" color="primary" onClick={toggleEdit}>
                                Edit Patient Information
                            </Button>
                        </Box>

              </>
            )}
          </Box>
        )}
        {selectedTab === 1 && <Appointments />}
        {selectedTab === 2 && <Procedures />}
				{selectedTab === 3 && <Documents />}
				{selectedTab === 4 && !isEditing && <Billing setCurrentPage={handleEditClick} />}
				{selectedTab === 4 && isEditing && (
					<EditBilling setCurrentPage={() => setIsEditing(false)} isEditing={isEditing} setIsEditing={setIsEditing} />
				)}
     
      </Paper>
    </Box>
  );

}
