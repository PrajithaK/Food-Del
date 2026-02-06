import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import EditFoodPopup from "../../components/EditFoodPopup/EditFoodPopup";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>

      <div className="list-table">
        {/* TABLE HEADER */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Description</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* TABLE ROWS */}
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`${url}/images/${item.image}`} alt={item.name} />

            <p className="name">{item.name}</p>

            <p className="category">{item.category}</p>

            <p className="description">{item.description}</p>

            <p className="price">₹{item.price}</p>

            <div className="action">
              <span
                className="delete"
                onClick={() => removeFood(item._id)}
              >
                ✕
              </span>

              <img
                src={assets.edit}
                alt="edit"
                className="edit"
                onClick={() => setEditItem(item)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* EDIT POPUP */}
      {editItem && (
        <EditFoodPopup
          item={editItem}
          url={url}
          onClose={() => setEditItem(null)}
          refresh={fetchList}
        />
      )}
    </div>
  );
};

export default List;
