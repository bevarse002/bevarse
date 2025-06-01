import React from "react";
import styles from "./Dashboard.module.css";

const Addresses = ({ addresses, onAdd, onEdit, onRemove }: { addresses: any[], onAdd: () => void, onEdit: (a: any) => void, onRemove: (a: any) => void }) => (
  <div>
    <h2 className={styles.sectionTitle}>Addresses</h2>
    <button className={styles.addBtn} onClick={onAdd}>Add Address</button>
    {addresses.length === 0 ? (
      <div className={styles.emptyMsg}>No addresses saved.</div>
    ) : (
      addresses.map(addr => (
        <div key={addr.id} className={styles.addressCard}>
          <div>{addr.line1}, {addr.city}, {addr.country}</div>
          <button onClick={() => onEdit(addr)}>Edit</button>
          <button onClick={() => onRemove(addr)}>Remove</button>
        </div>
      ))
    )}
  </div>
);

export default Addresses;