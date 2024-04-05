import React, { useState, useRef, useEffect } from "react";

// No Calendar in mui anymore
import { Button, Grid, Typography, Box, Avatar, Container, Link} from "@mui/material";
import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { DayPilot } from "@daypilot/daypilot-lite-react";

export default function Schedules() {
    const calendarRef = useRef();
  
    useEffect(() => {
      const events = [
        {
          id: DayPilot.guid(),
          text: "Follow Up With Alan Scott",
          start: "2024-04-06T13:00:00",
          end: "2024-04-06T14:00:00",
          backColor: "#1e90ff", 
        },
      ];
  
      calendarRef.current.control.update({ events });
    }, []);
  
    const [calendarConfig] = useState({
      viewType: "Week",
      cellHeight: 20
    });
  
    return (
      <div>
        <div className="DpCalendar">
          <DayPilotCalendar {...calendarConfig} ref={calendarRef} />
        </div>
      </div>
    );
  }