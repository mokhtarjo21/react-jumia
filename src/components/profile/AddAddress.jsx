import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { instance } from "../../axiosInstance/instance";

const AddAddress = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);

  const governorates = [
    "Cairo", "Giza", "Alexandria", "Dakahlia", "Beheira",
    "Sharqia", "Monufia", "Qalyubia", "Gharbia", "Kafr El Sheikh",
    "Fayoum", "Beni Suef", "Minya", "Assiut", "Sohag",
    "Qena", "Luxor", "Aswan", "Red Sea", "New Valley",
    "Matrouh", "North Sinai", "South Sinai", "Damietta", "Port Said", "Ismailia", "Suez"
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const access = localStorage.getItem("access");
        const res = await instance.get("/users/api/profile/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (res.status === 200) {
          setFormData({
            first_name: res.data.first_name || "",
            last_name: res.data.last_name || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            city: res.data.city || "",
          });
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const access = localStorage.getItem("access");
      const res = await instance.put(
        "/users/api/profile/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        onSave(formData);
      } else {
        alert("Something went wrong while saving the address.");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <Form
        onSubmit={handleSubmit}
        className="p-4 shadow"
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #ddd",
          maxWidth: "650px",
          width: "100%",
        }}
      >
        <h4
          className="mb-4 text-center"
          style={{ color: "#f68b1e", fontWeight: "700" }}
        >
          Add New Address
        </h4>

        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter first name"
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
        </Form.Group> 

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Enter last name"
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
        </Form.Group> 

        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="city">
          <Form.Label>Governorate</Form.Label>
          <Form.Select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            <option value="">Select Governorate</option>
            {governorates.map((gov, idx) => (
              <option key={idx} value={gov}>
                {gov}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="d-flex gap-2">
          <Button
            type="submit"
            className="w-100"
            style={{
              backgroundColor: "#f68b1e",
              border: "none",
              borderRadius: "25px",
              padding: "12px",
              fontSize: "1.1rem",
              fontWeight: "bold",
              color: "white",
            }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Address"}
          </Button>

          <Button
            variant="secondary"
            onClick={onCancel}
            style={{
              borderRadius: "25px",
              padding: "12px",
              fontSize: "1.1rem",
            }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddAddress;
