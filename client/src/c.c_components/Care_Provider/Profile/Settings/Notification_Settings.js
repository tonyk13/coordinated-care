import React, {useState} from 'react'
import { List, ListItem, ListItemText, Divider, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';


const Options = [
    'Text Messages',
    'In-App Only'
  ];

export default function Notification_Settings() {
    const settings = [
        { id: 1, title: 'Notification Methods'},
        { id: 2, title: 'Appointment Alerts' },
        { id: 3, title: 'Task Assignment Alerts'},
        { id: 4, title: 'Message Alerts'},
        { id: 5, title: 'Discussion Board Alerts'},
      ];

      const [selections, setSelections] = useState(settings.reduce((acc, setting) => {
        acc[setting.id] = '';
        return acc;
      }, {}));
      const handleChange = (settingId, event) => {
        const { value } = event.target;
        setSelections(prevSelections => ({
          ...prevSelections,
          [settingId]: value,
        }));
      };



      return (
        <List sx={{ mt: 2, pl: 4 }}>
          {settings.map((setting) => (
            <React.Fragment key={setting.id}>
              <ListItem sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ListItemText primary={setting.title} />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={selections[setting.id]}
                    onChange={(event) => handleChange(setting.id, event)}
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
