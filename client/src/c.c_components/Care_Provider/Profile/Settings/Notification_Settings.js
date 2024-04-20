import React, {useState, useEffect} from 'react'
import { List, ListItem, ListItemText, Divider, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const Options = [
    'Text Messages',
    'In-App Only'
  ];

export default function Notification_Settings() {
    const settings = [
        { id: 1, title: 'Notification Methods', settingKey: 'notificationMethods' },
        { id: 2, title: 'Appointment Alerts', settingKey: 'appointmentAlerts' },
        { id: 3, title: 'Task Assignment Alerts', settingKey: 'taskAssignmentAlerts' },
        { id: 4, title: 'Message Alerts', settingKey: 'messageAlerts' },
        { id: 5, title: 'Discussion Board Alerts', settingKey: 'discussionBoardAlerts' },
      ];

      const defaultSelections = settings.reduce((acc, setting) => {
        acc[setting.settingKey] = '';
        return acc;
      }, {});
      const [getRequestMade, setGetRequestMade] = useState(false);
      const [selections, setSelections] = useState(defaultSelections);
      



      const handleChange = (settingId, event) => {
        const { value } = event.target;
        setSelections(prevSelections => ({
          ...prevSelections,
          [settingId]: value,
        }));
      };

      // GET request on load
      useEffect(() => {
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const employee_id = Cookies.get("employee_id");
        axios.get(`${baseURL}/api/employees/${employee_id}/get_notification_settings`)
        .then(response => {
          const { notificationMethods, appointmentAlerts, taskAssignmentAlerts, messageAlerts, discussionBoardAlerts} = response.data.notificationSettings;
          setSelections({
            notificationMethods,
            appointmentAlerts,
            taskAssignmentAlerts,
            messageAlerts,
            discussionBoardAlerts,
          });
          setGetRequestMade(true);
          // console.log(selections)
        })
        .catch(error => {
            console.error('Error getting employee notification settings:', error);
        });
    }, []);

    // PUT request on Change
    useEffect(() => {
      if (getRequestMade === false) {
        return;
      }
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const employee_id = Cookies.get("employee_id");
      axios.put(`${baseURL}/api/employees/${employee_id}/update_notification_settings`, { notificationSettings: selections })
          .then(response => {
              // console.log('Privacy settings updated successfully:', response.data);
          })
          .catch(error => {
              console.error('Error updating employee notification settings:', error);
          });
  }, [selections]);





      return (
        <List sx={{ mt: 2, pl: 4 }}>
          {settings.map((setting) => (
            <React.Fragment key={setting.id}>
              <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ListItemText primary={setting.title} />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                    value={selections[setting.settingKey]}
                    onChange={(event) => handleChange(setting.settingKey, event)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    { Options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Choose option</FormHelperText>
                </FormControl>
              </ListItem>
              {setting.id < settings.length && <Divider />}
            </React.Fragment>
          ))}
        </List>
      );
}
