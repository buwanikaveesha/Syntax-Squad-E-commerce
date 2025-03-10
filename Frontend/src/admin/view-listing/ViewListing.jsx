import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import CarItem from "./components/CarItem";
import apiRequest from "@/lib/apiRequest";

const ViewListing = () => {
  const [carListings, setCarListings] = useState([]);

  const GetUserCarListing = async () => {
    try {
      const response = await apiRequest.get("/car-listing/get-user-listing");
      setCarListings(response.data);
    } catch (error) {
      //   toast.error("Failed to load listings!");
    }
  };

  useEffect(() => {
    GetUserCarListing();
  }, []);

  return (
    <div>
      <AdminHeader title={"View Listing"} />
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-7 gap-8">
        {carListings.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewListing;
