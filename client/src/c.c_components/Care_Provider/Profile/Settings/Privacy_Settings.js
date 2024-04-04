import React, {useState} from 'react'
import { List, ListItem, ListItemText, Divider, MenuItem, FormControl, Select, FormHelperText } from '@mui/material';


const Options = [
    'All Employees',
  ];
const LastSettingOptions = ['Opt In', 'Opt Out'];

export default function Privacy_Settings() {


    const settings = [
        { id: 1, title: 'Who can view my work schedule'},
        { id: 2, title: 'Who can view my patient list' },
        { id: 3, title: 'Who can send me messages'},
        { id: 4, title: 'Who can view my personal information'},
        { id: 5, title: 'Who can view my phone number'},
        { id: 6, title: 'Share my information with the developers for analytics purposes'},

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
