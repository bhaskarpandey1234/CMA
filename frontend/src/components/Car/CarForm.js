import React, { useState } from "react";
import { createCar } from "../../services/api";

const CarForm = ({ fetchCars }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate images
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append(
      "tags",
      tags.split(",").map((tag) => tag.trim()) // Clean tags
    );
    images.forEach((image) => formData.append("images", image));

    try {
      // Create car and refresh the list
      await createCar(formData);
      fetchCars();
      alert("Car added successfully!");
      
      // Reset form fields
      setTitle("");
      setDescription("");
      setTags("");
      setImages([]);
    } catch (err) {
      console.error("Error adding car:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Car</h2>
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
        name="images"
        multiple
        onChange={(e) => setImages([...e.target.files])}
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;


// import React, { useState } from "react";
// import { createCar } from "../../services/api";

// const CarForm = ({ fetchCars }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");
//   const [images, setImages] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (images.length === 0) {
//       alert("Please upload at least one image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("tags", tags.split(",").map((tag) => tag.trim())); // Clean tags
//     images.forEach((image) => formData.append("images", image));

//     // Debugging: Log FormData content
//     for (let pair of formData.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       await createCar(formData);
//       fetchCars();
//       alert("Car added successfully!");
//       setTitle("");
//       setDescription("");
//       setTags("");
//       setImages([]);
//     } catch (err) {
//       console.error("Error adding car:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add a Car</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Tags (comma-separated)"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         required
//       />
//       <input
//         type="file"
//         multiple
//         onChange={(e) => setImages([...e.target.files])}
//         required
//       />
//       <button type="submit">Add Car</button>
//     </form>
//   );
// };

// export default CarForm;



// import React, { useState } from "react";
// import axios from "axios";
// import { createCar } from "../../services/api";

// const CarForm = ({ fetchCars }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [tags, setTags] = useState("");
//   const [images, setImages] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("tags", tags.split(","));
//     images.forEach((image) => formData.append("images", image));

//     try {
//       // await axios.post("/api/cars", formData, {
//       //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       // });
//       await createCar(formData);
//       fetchCars();
//       alert("Car added successfully!");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add a Car</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Tags (comma-separated)"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         required
//       />
//       <input
//         type="file"
//         multiple
//         onChange={(e) => setImages([...e.target.files])}
//         required
//       />
//       <button type="submit">Add Car</button>
//     </form>
//   );
// };

// export default CarForm;
