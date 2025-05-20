import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";
import AddAddress from "./AddAddress";

const OverviewSection = () => {
  const [userinfo, setUserinfo] = useState();
  const [showForm, setShowForm] = useState(false);
  const [addressInfo, setAddressInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const access = localStorage.getItem("access");
        const response = await instance.get("/users/api/who", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (response.status === 200) {
          const data = response.data.response;
          setUserinfo(data);
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="overview-section">
      <h2>Account Overview</h2>

      {showForm ? (
        <AddAddress
          onSave={(data) => {
            setAddressInfo(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <div className="overview-grid">
          <div className="overview-box">
            <h4>Account Details</h4>
            <p>
              {userinfo ? userinfo.first_name : "Loading..."}{" "}
              {userinfo ? userinfo.last_name : "Loading..."}
            </p>
            <p>{userinfo ? userinfo.email : "Loading..."}</p>
          </div>

          <div className="overview-box">
            <h4 className="mb-3">Contact Information</h4>

            {addressInfo ? (
              <div className="mb-3">
                <p className="mb-1">
                  <strong>Address:</strong> {addressInfo.address},{" "}
                  {addressInfo.city}
                </p>
                <p className="mb-0">
                  <strong>Phone:</strong> {addressInfo.phone}
                </p>
              </div>
            ) : (
              <p className="text-muted">
                No default shipping address available
              </p>
            )}

            <button style={{fontSize: "20px"} }
              className="btn btn-outline-primary"
              onClick={() => setShowForm(true)}
            >
              Edit Address
            </button>
          </div>

          <div className="overview-box">
            <h4>Newsletter Preferences</h4>
            <p>Manage your email subscriptions</p>
            <button style={{fontSize: "20px"} }>Edit Newsletter Preferences</button>
          </div>

          <div className="overview-box">
            <h4>Your Account Balance</h4>
            <p>0.00 EGP</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewSection;
