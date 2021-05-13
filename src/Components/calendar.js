import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from "axios";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  let eventLists = [];
  let startDate, endDate;

  useEffect(() => {
    getAlltrainings();
    // eslint-disable-next-line
  }, []);
  const getAlltrainings = async () => {
    try {
      const { data } = await axios.get(
        "https://customerrest.herokuapp.com/gettrainings"
      );
      for (var i = 0; i < data.length; i++) {
        if (data[i].date == null) {
          continue;
        }
        try {
          startDate = new Date(data[i].date);
          endDate = new Date(data[i].date);
          endDate.setUTCMinutes(startDate.getUTCMinutes() + data[i].duration);
          eventLists.push({
            title: data[i].activity + "/ " + data[i].customer.firstname,
            start: startDate,
            end: endDate,
          });
        } catch (err) {
          console.error("Something went wrong");
        }
      }
      setEvents(eventLists);
    } catch (err) {
      console.log("Something terrible happened");
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "70vh", width: "80vw", margin: " auto" }}
      />
    </div>
  );
}

export default CalendarPage;
