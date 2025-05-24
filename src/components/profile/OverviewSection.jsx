import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";
import AddAddress from "./AddAddress";
import styles from "./overviewSection.module.css";
import { FaEnvelope, FaEdit } from "react-icons/fa";

const OverviewSection = () => {
  const [userinfo, setUserinfo] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [addressInfo, setAddressInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const access = localStorage.getItem("access");

        const userResponse = await instance.get("/users/api/who", {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (userResponse.status === 200) {
          setUserinfo(userResponse.data.response);
        }

        const addressResponse = await instance.get("/users/api/profile/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        if (addressResponse.status === 200) {
          setAddressInfo({
            first_name: addressResponse.data.first_name,
            last_name: addressResponse.data.last_name,
            phone: addressResponse.data.phone,
            address: addressResponse.data.address,
            city: addressResponse.data.city,
          });
        }
      } catch (error) {
        console.error("Error fetching user or address info:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.overviewContainer}>
      <h2 className={styles.title}>Account Overview</h2>

      {showForm ? (
        <AddAddress
          onSave={(data) => {
            setAddressInfo(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          initialData={addressInfo}
        />
      ) : (
        <>
          {/* First Row */}
          <div className={styles.row}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>Account Details</div>
              <p>{userinfo ? `${userinfo.first_name} ${userinfo.last_name}` : "Loading..."}</p>
              <p><FaEnvelope className={styles.inlineIcon} /> {userinfo?.email || "Loading..."}</p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>
                Address Book
                <button className={styles.editButton} onClick={() => setShowForm(true)}>
                  <FaEdit />
                </button>
              </div>
              {addressInfo ? (
                <>
                  <p><strong>Your default shipping address:</strong></p>
                  <p>{userinfo?.first_name} {userinfo?.last_name}</p>
                  <p>{addressInfo.address}</p>
                  <p>{addressInfo.city}</p>
                  <p>{addressInfo.phone}</p>
                </>
              ) : (
                <p>No address available</p>
              )}
            </div>
          </div>

          {/* Second Row */}
          <div className={styles.row}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>Jumia Store Credit</div>
              <p><a className={styles.link}>Jumia store credit balance: EGP 0.00</a></p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardHeader}>Newsletter Preferences</div>
              <p>Manage your email communications to stay updated with the latest news and offers.</p>
              <p><a className={styles.link}>Edit Newsletter preferences</a></p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewSection;
