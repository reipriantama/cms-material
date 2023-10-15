import React from "react";
import CarList from "../../components/CarList/CarList";

const CarsPage = ({ searchResults }) => {
  return (
    <div>
      <CarList cars={searchResults} />
    </div>
  );
};

export default CarsPage;
