import React from "react";
import styles from "./Dashboard.module.css";

const Payments = ({ cards, onAdd, onRemove }: { cards: any[], onAdd: () => void, onRemove: (c: any) => void }) => (
  <div>
    <h2 className={styles.sectionTitle}>Payment Methods</h2>
    <button className={styles.addBtn} onClick={onAdd}>Add Card</button>
    {cards.length === 0 ? (
      <div className={styles.emptyMsg}>No cards saved.</div>
    ) : (
      cards.map(card => (
        <div key={card.id} className={styles.cardCard}>
          <div>**** **** **** {card.last4}</div>
          <button onClick={() => onRemove(card)}>Remove</button>
        </div>
      ))
    )}
  </div>
);

export default Payments;