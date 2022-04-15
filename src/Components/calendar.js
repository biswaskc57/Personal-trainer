import React, { useEffect, useState } from "react";
import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { get } from "../Components/Utils";
const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  let eventLists = [];
  let startDate, endDate;

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = async () => {
    try {
      const url = "https://customerrest.herokuapp.com/gettrainings";
      const trainings = await get(url);
      for (var i = 0; i < trainings.length; i++) {
        if (!trainings[i].date) {
          continue;
        }
        startDate = new Date(trainings[i].date);
        endDate = new Date(trainings[i].date);
        endDate.setUTCMinutes(
          startDate.getUTCMinutes() + trainings[i].duration
        );
        eventLists.push({
          title:
            trainings[i].activity +
            "/ " +
            trainings[i].customer.firstname +
            " " +
            trainings[i].customer.lastname,
          startingTime: startDate,
          endingTime: endDate,
        });
      }
      setEvents(eventLists);
    } catch (err) {
      console.error("Error");
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
