import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [trainings, setTrainings] = useState([]);
  let eventLists = [];
  let startDate, endDate;

  const fetchTrainings = async () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setTrainings(responseData);
        console.log(trainings);
        console.log(responseData.length);
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

          console.log(eventLists);
        }
        setEvents(eventLists);
        console.log(eventLists);
        console.log(events);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log(events);
    fetchTrainings();
    console.log(events);
    // eslint-disable-next-line
  }, []);
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
