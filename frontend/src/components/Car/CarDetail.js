import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCarById, deleteCarById, updateCar } from "../../services/api";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [car, setCar] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await getCarById(id);
        setCar(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setTags(response.data.tags.join(", "));
        setImages(response.data.images);  // Store current images
      } catch (err) {
        console.error("Error fetching car:", err.response?.data || err.message);
      }
    };

    if (token) fetchCar();
  }, [id, token]);

  const handleDelete = async () => {
    try {
      await deleteCarById(id);
      alert("Car deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting car:", err.response?.data || err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags.split(",").map((tag) => tag.trim())); // Clean tags
    images.forEach((image) => formData.append("images", image));

    try {
      await updateCar(id, formData);
      alert("Car updated successfully!");
      navigate("/dashboard"); // Navigate back to dashboard after update
    } catch (err) {
      console.error("Error updating car:", err.response?.data || err.message);
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />
        <button type="submit">Update Car</button>
      </form>

      <h2>{car.title}</h2>
      <p>{car.description}</p>
      <div className="car-images">
  {car.images.map((img, index) => {
    const imagePath = img.split("\\").pop(); // Assuming `img` is the image path string.
    return (
      <img
        key={index}
        src={`http://localhost:5000/uploads/${imagePath}`}
        alt={`Car ${index + 1}`}
      />
    );
  })}
</div>

      <button onClick={() => navigate("/dashboard")}>Back</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarDetail;





// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import { getCarById, deleteCarById,updateCar } from "../../services/api";

// const CarDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useContext(AuthContext);

//   const [car, setCar] = useState(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await getCarById(id);
//         setCar(response.data);
//       } catch (err) {
//         console.error("Error fetching car:", err.response?.data || err.message);
//       }
//     };

//     if (token) fetchCar();
//   }, [id, token]);

//   const handleDelete = async () => {
//     try {
//       await deleteCarById(id);
//       alert("Car deleted successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Error deleting car:", err.response?.data || err.message);
//     }
//   };

//   if (!car) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{car.title}</h2>
//       <p>{car.description}</p>
//       <div className="car-images">
//         {car.images.map((img, index) => (
//           <img key={index} src={img.url} alt={`Car ${index + 1}`} />
//         ))}
//       </div>
//       <button onClick={() => navigate(`/dashboard`)}>Back</button>
//       {/* <button onClick={() => navigate(`/dashboard?edit=${id}`)}>Edit</button> */}
//       <button onClick={() => updateCar(id)}>Edit</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default CarDetail;




// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";

// const CarDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useContext(AuthContext);

//   const [car, setCar] = useState(null);

//   const fetchCar = async () => {
//     try {
//       const response = await axios.get(`/api/cars/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCar(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/cars/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert("Car deleted successfully!");
//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCar();
//   }, [id]);

//   if (!car) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{car.title}</h2>
//       <p>{car.description}</p>
//       <div className="car-images">
//         {car.images.map((img, index) => (
//           <img key={index} src={img.url} alt={`Car ${index + 1}`} />
//         ))}
//       </div>
//       <button onClick={() => navigate(`/dashboard`)}>Back</button>
//       <button onClick={() => navigate(`/dashboard?edit=${id}`)}>Edit</button>
//       <button onClick={handleDelete}>Delete</button>
//     </div>
//   );
// };

// export default CarDetail;
