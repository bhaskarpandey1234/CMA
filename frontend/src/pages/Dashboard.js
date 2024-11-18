import React, { useState } from "react";
import CarList from "../components/Car/CarList";
import CarForm from "../components/Car/CarForm";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  const fetchCars = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <CarForm fetchCars={fetchCars} />
      <CarList key={refresh} />
    </div>
  );
};

export default Dashboard;
