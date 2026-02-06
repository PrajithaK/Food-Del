import React, { useState } from "react";
import axios from "axios";
import "./EditFoodPopup.css";
import { toast } from "react-toastify";

const EditFoodPopup = ({ item, url, onClose, refresh }) => {

  const [data, setData] = useState({
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description || ""
  });

  const [image, setImage] = useState(null);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", item._id);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (image) {
      formData.append("image", image);
    }

    const response = await axios.post(
      `${url}/api/food/update`,
      formData
    );

    if (response.data.success) {
      toast.success("Item updated");
      refresh();
      onClose();
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="edit-popup">
      <form className="edit-popup-container" onSubmit={onUpdate}>
        <h3>Edit Food</h3>

        {/* IMAGE PREVIEW */}
        <div className="image-preview">
          <img src={`${url}/images/${item.image}`} alt="food" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <input
          name="name"
          value={data.name}
          onChange={onChangeHandler}
          placeholder="Food Name"
          required
        />

        {/* CATEGORY */}
        <select
          name="category"
          value={data.category}
          onChange={onChangeHandler}
          required
        >
          <option value="salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure veg">Pure veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>

        <textarea
          name="description"
          value={data.description}
          onChange={onChangeHandler}
          placeholder="Description"
          required
        />

        <input
          name="price"
          value={data.price}
          onChange={onChangeHandler}
          placeholder="Price"
          required
        />

        <div className="btns">
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditFoodPopup;
