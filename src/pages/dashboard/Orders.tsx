import React from "react";
import OrderCard from "./OrderCard";
import styles from "./Dashboard.module.css";

const Orders = ({ orders }: { orders: any[] }) => {
  if (!Array.isArray(orders)) {
    return <div className={styles.emptyMsg}>No orders yet.</div>;
  }
  return (
    <div>
      <h2 className={styles.sectionTitle}>Your Orders</h2>
      {orders.length === 0 ? (
        <div className={styles.emptyMsg}>No orders yet.</div>
      ) : (
        orders.map(order => <OrderCard key={order.number} order={order} />)
      )}
    </div>
  );
};

export default Orders;