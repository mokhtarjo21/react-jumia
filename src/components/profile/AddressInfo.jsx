import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";
import { FaMapMarkerAlt, FaPhoneAlt, FaEdit, FaPlus } from "react-icons/fa";
import "./AddressInfo.css";

const AddressInfo = () => {
  const [addressInfo, setAddressInfo] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const access = localStorage.getItem("access");
        const response = await instance.get("/users/api/profile", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        const address = response.data.response || response.data.results?.[0] || response.data;
        setAddressInfo(address);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <div className="address-info-container">
      <h2 className="address-title">My Address</h2>

      {addressInfo && addressInfo.address ? (
        <div className="address-card">
          <div className="address-row">
            <FaMapMarkerAlt className="icon" />
            <span>{addressInfo.address}, {addressInfo.city}</span>
          </div>
          <div className="address-row">
            <FaPhoneAlt className="icon" />
            <span>{addressInfo.phone}</span>
          </div>
          
        </div>
      ) : (
        <div className="no-address">
          <p className="text-muted">You haven't added a default shipping address yet.</p>
          <button className="btn-add">
            <FaPlus /> Add New Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressInfo;
