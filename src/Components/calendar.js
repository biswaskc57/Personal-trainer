import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from "axios";

const localizer = momentLocalizer(moment);

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [training, setTrainings] = useState([]);
  let eventLists = [];
  let startDate, endDate;

  useEffect(() => {
    getAlltrainings();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTrainings(responseData);

  
      for (var i = 0; i < training.length; i++) {
        if (training[i].date == null) {
          continue;
        }
        try {
          startDate = new Date(data[i].date);
          endDate = new Date(data[i].date);
          endDate.setUTCMinutes(startDate.getUTCMinutes() + data[i].duration);
          eventLists.push({
            title:
              data[i].activity +
              "/ " +
              data[i].customer.firstname +
              " " +
              data[i].customer.lastname,
            startingTime: startDate,
            endingTime: endDate,
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
        startAccessor="startingTime"
        endAccessor="endingTime"
        style={{ width: 1000, height: 600, margin: " auto" }}
      />
    </div>
  );
}

export default CalendarPage;
