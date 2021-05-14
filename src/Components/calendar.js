import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import axios from "axios";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [training, setTrainings] = useState([]);
  let eventLists = [];
  let startDate, endDate;

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTrainings(responseData);
        console.log(training);

        for (var i = 0; i < responseData.length; i++) {
          if (responseData[i].date == null) {
            continue;
          }
          try {
            startDate = new Date(responseData[i].date);
            endDate = new Date(responseData[i].date);
            endDate.setUTCMinutes(
              startDate.getUTCMinutes() + responseData[i].duration
            );
            eventLists.push({
              title:
                responseData[i].activity +
                "/ " +
                responseData[i].customer.firstname +
                " " +
                responseData[i].customer.lastname,
              startingTime: startDate,
              endingTime: endDate,
            });
          } catch (err) {
            console.error("Something went wrong");
          }
          setEvents(eventLists);
        }
      })
      .catch((error) => console.log(error));
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
