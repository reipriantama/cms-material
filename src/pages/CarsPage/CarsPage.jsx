import React from "react";
import CarList from "../../components/CarList/CarList";
import { useLocation } from "react-router";

const CarsPage = () => {
  const {search} = useLocation()
  
  const searchParam = search.split('=')[1]

  return (
    <div>
      <CarList search={searchParam}/>
    </div>
  );
};

export default CarsPage;
