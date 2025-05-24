import React, { useState } from "react";
import { instance } from "../../axiosInstance/instance";
import styles from "./Address.module.css";

const AddAddress = ({ onSave, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    phone: initialData.phone || "",
    address: initialData.address || "",
    city: initialData.city || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const access = localStorage.getItem("access");
      const response = await instance.put("/users/api/profile/", formData, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (response.status === 200) {
        onSave(formData);
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h3>Edit Address & Info</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />
            <span className={styles.helper}>Use your real first name for deliveries</span>
            {errors.first_name && <span className={styles.error}>{errors.first_name}</span>}
          </div>
          <div className={styles.field}>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <span className={styles.helper}>Last name as it appears on your ID</span>
            {errors.last_name && <span className={styles.error}>{errors.last_name}</span>}
          </div>
        </div>

        <div className={styles.field}>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <span className={styles.helper}>Enter an active Egyptian mobile number (e.g. 01012345678)</span>
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        <div className={styles.field}>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street Address"
            required
          />
          <span className={styles.helper}>Street, building number, floor, apartment</span>
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>

        <div className={styles.field}>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select Governorate</option>
            <option value="Cairo">Cairo</option>
            <option value="Giza">Giza</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Dakahlia">Dakahlia</option>
            <option value="Red Sea">Red Sea</option>
            <option value="Beheira">Beheira</option>
            <option value="Fayoum">Fayoum</option>
            <option value="Gharbia">Gharbia</option>
            <option value="Ismailia">Ismailia</option>
            <option value="Menofia">Menofia</option>
            <option value="Minya">Minya</option>
            <option value="Qaliubia">Qaliubia</option>
            <option value="New Valley">New Valley</option>
            <option value="Suez">Suez</option>
            <option value="Aswan">Aswan</option>
            <option value="Assiut">Assiut</option>
            <option value="Beni Suef">Beni Suef</option>
            <option value="Port Said">Port Said</option>
            <option value="Damietta">Damietta</option>
            <option value="Sharkia">Sharkia</option>
            <option value="South Sinai">South Sinai</option>
            <option value="Kafr El Sheikh">Kafr El Sheikh</option>
            <option value="Matrouh">Matrouh</option>
            <option value="Luxor">Luxor</option>
            <option value="Qena">Qena</option>
            <option value="North Sinai">North Sinai</option>
            <option value="Sohag">Sohag</option>
          </select>
          <span className={styles.helper}>Choose your governorate for delivery area</span>
          {errors.city && <span className={styles.error}>{errors.city}</span>}
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.saveBtn}>Save</button>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;