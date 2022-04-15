import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { get } from "../Components/Utils";

function Statistics() {
  const [trainings, setTrainings] = useState([]);

  const sum = (arr) => arr.reduce((sum, curr) => sum + curr, 0);
  

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = async() => {
    const url = "https://customerrest.herokuapp.com/gettrainings";
    const trainings =  await get(url); 
      if(trainings){
        setTrainings(trainings);
      }
  };

  const activities = trainings
    .map((item) => ({
      name: item.activity,
      duration: item.duration,
    }))
    .reduce((acc, item) => {
      if (acc[item.name]) {
        acc[item.name].push(item.duration);
      } else {
        acc[item.name] = [item.duration];
      }
      return acc;
    }, {});

  const totalSum = Object.keys(activities).reduce((acc, key) => {
    acc[key] = sum(activities[key]);
    return acc;
  }, {});

  const data = Object.keys(activities).reduce((acc, key) => {
    acc.push({ Name: key, Duration: totalSum[key]})
    return acc;
  }, []);


  return (
    <div style={{ margin: " auto" }}>
      <h1 style={{ margin: "auto" }}>
        Total number of minutes per activities:
      </h1>

      <BarChart
        width={1000}
        height={600}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Name" />
        <YAxis/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Duration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Statistics;
