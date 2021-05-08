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

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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

  console.log(trainings);
  return (
    <div>
      <h1>Statistics:</h1>

      <BarChart
        width={1000}
        height={600}
        data={trainings}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>

      <h1>Hello</h1>
    </div>
  );
}

export default Statistics;
