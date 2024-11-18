import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { AuthContext } from "../../context/AuthContext";
import { getCars, setAuthToken } from "../../services/api";

const CarList = () => {
  const { token } = useContext(AuthContext); // AuthContext provides the user's token
  const [cars, setCars] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (token) {
      setAuthToken(token); // Ensure the token is set for all requests
    }

    const fetchCars = async () => {
      try {
        const response = await getCars(searchKeyword); // Use centralized API function
        setCars(response.data); // Update the state with the fetched cars
      } catch (err) {
        console.error("Error fetching cars:", err.response?.data || err.message);
      }
    };

    fetchCars();
  }, [searchKeyword, token]);

  return (
    <div>
      <h2>My Cars</h2>
      <SearchBar setSearchKeyword={setSearchKeyword} /> {/* Search functionality */}
      <div className="car-list">
        {cars.length > 0 ? (
          cars.map((car) => {
            // Check if images exist and extract the image path
            const imagePath = car?.images?.[0]?.split("\\").pop(); // Safely access image path
            console.log("imagePath:",imagePath);
            return (
              <Link to={`/cars/${car._id}`} key={car._id}>
                <div className="car-item">
                  {/* If imagePath exists, prepend localhost URL to the image file name */}
                  {imagePath ? (
                    <img
                      src={`http://localhost:5000/uploads/${imagePath}`}
                      alt={car.title}
                      width={"10%"}
                      height={"10%"}
                    />
                  ) : (
                    <p>No image available</p> // Handle case if there's no image
                  )}
                  <h3>{car.title}</h3>
                  <p>{car.description.substring(0, 100)}...</p>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No cars found. Try a different search keyword!</p>
        )}
      </div>
    </div>
  );
};

export default CarList;
