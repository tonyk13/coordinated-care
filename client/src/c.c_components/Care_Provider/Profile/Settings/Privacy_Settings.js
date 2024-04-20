import React, {useState, useEffect} from 'react'
import { List, ListItem, ListItemText, Divider, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';

const Options = [
    'All Employees',
  ];
const LastSettingOptions = ['Opt In', 'Opt Out'];

export default function Privacy_Settings() {


    const settings = [
        { id: 1, title: 'Who can view my work schedule', settingKey: 'workScheduleVisibility' },
        { id: 2, title: 'Who can view my patient list', settingKey: 'patientListVisibility' },
        { id: 3, title: 'Who can send me messages', settingKey: 'messagePermission' },
        { id: 4, title: 'Who can view my personal information', settingKey: 'personalInfoVisibility' },
        { id: 5, title: 'Who can view my phone number', settingKey: 'phoneNumberVisibility' },
        { id: 6, title: 'Share my information with the developers for analytics purposes', settingKey: 'shareInfoWithDevelopers' },
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
          [settingId]: value || '', 
        }));
      };


      // GET request on load
      useEffect(() => {
        const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const employee_id = Cookies.get("employee_id");
        axios.get(`${baseURL}/api/employees/${employee_id}/get_privacy_settings`)
        .then(response => {
          const { messagePermission, patientListVisibility, personalInfoVisibility, phoneNumberVisibility, shareInfoWithDevelopers, workScheduleVisibility } = response.data.privacySettings;
          setSelections({
              messagePermission,
              patientListVisibility,
              personalInfoVisibility,
              phoneNumberVisibility,
              shareInfoWithDevelopers,
              workScheduleVisibility,
          });
          setGetRequestMade(true);
          // console.log(selections)
        })
        .catch(error => {
            console.error('Error getting employee privacy settings:', error);
        });
    }, []);


    // PUT request on Change
    useEffect(() => {
      if (getRequestMade === false) {
        return;
      }
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";
      const employee_id = Cookies.get("employee_id");
      axios.put(`${baseURL}/api/employees/${employee_id}/update_privacy_settings`, { privacySettings: selections })
          .then(response => {
              // console.log('Privacy settings updated successfully:', response.data);
          })
          .catch(error => {
              console.error('Error updating employee privacy settings:', error);
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
                    {(setting.id === settings.length ? LastSettingOptions : Options).map((option) => (
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
