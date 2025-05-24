import React, { useEffect, useState } from "react";
import {instance} from "../../axiosInstance/instance";
import { useNavigate } from "react-router-dom";
import styles from "./MyOrders.module.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const access = localStorage.getItem("access");
        const response = await instance.get(`/orders/my-orders/?page=${page}`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        setOrders(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page]);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>You have no orders yet.</p>;

  return (
    <div className={styles.ordersWrapper}>
      <h2 className={styles.title}>My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className={styles.orderCard}
          onClick={() => navigate(`/profile/orders/${order.id}`)}
        >
          <div className={styles.orderInfo}>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            <p><strong>Payment Method:</strong> {order.payment_method.toUpperCase()}</p>
            <p><strong>Total:</strong> EGP {order.total_price}</p>
            <p>
              <strong>Payment:</strong> {order.payment_completed ? "Completed" : "Pending"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`${styles.badge} ${styles[order.status]}`}>
                {order.status}
              </span>
            </p>
          </div>
        </div>
      ))}

      <div className={styles.pagination}>
        <button disabled={!previous} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </button>
        <button disabled={!next} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyOrders;
