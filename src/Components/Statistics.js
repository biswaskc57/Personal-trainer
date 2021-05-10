import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
    <div>
      <h1>Statistics:</h1>

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

      <h1>Hello</h1>
    </div>
  );
}

export default Statistics;
