import React from "react";
import styles from "./Dashboard.module.css";

const OrderCard = ({ order }: { order: any }) => (
  <div className={styles.orderCard}>
    <img src={order.image} alt={order.product} className={styles.orderImg} />
    <div>
      <div className={styles.orderNum}>Order #{order.number}</div>
      <div>{order.product}</div>
      <div>
        Status:{" "}
        <span className={styles.orderStatus}>{order.status}</span>
      </div>
      <div>Total: ${order.total}</div>
      <button className={styles.viewBtn}>View</button>
    </div>
  </div>
);

export default OrderCard;