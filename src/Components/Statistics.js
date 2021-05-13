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

function Statistics() {
  const [trainings, setTrainings] = useState([]);

  const sum = (arr) => arr.reduce((sum, curr) => sum + curr, 0);
  console.log(sum);

  console.log("o lala lala");

  useEffect(() => {
    fetchTrainings();
    // eslint-disable-next-line
  }, []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data.content))
      .catch((err) => console.error(err));
    console.log(trainings);
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

  console.log(activities);
  console.log(trainings);
  console.log(totalSum);

  const data = Object.keys(activities).reduce((acc, key) => {
    acc.push({ name: key, sum: totalSum[key] });
    return acc;
  }, []);

  console.log(data);

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sum" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Statistics;
