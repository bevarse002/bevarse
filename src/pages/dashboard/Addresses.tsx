import React, { useState } from "react";
import styles from "./Dashboard.module.css";

type AddressType = {
  id: number;
  line1: string;
};

type AddressesProps = {
  addresses: AddressType[];
  onAdd?: () => void;
  onEdit?: (a: AddressType) => void;
  onRemove?: (a: AddressType) => void;
};

const Addresses = (props: AddressesProps) => {
  const [addresses, setAddresses] = useState<AddressType[]>(props.addresses ?? []);

  return (
    <div>
      <h2 className={styles.sectionTitle}>Addresses</h2>
      <button
        className={styles.addBtn}
        onClick={props.onAdd ? props.onAdd : undefined}
        disabled={!props.onAdd}
      >
        Add Address
      </button>
      {addresses.length > 0 ? (
        addresses.map(addr => (
          <div key={addr.id}>
            {addr.line1}
            {props.onEdit && (
              <button onClick={() => props.onEdit?.(addr)}>Edit</button>
            )}
            {props.onRemove && (
              <button onClick={() => props.onRemove?.(addr)}>Remove</button>
            )}
          </div>
        ))
      ) : (
        <div>No addresses</div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.example.com/data`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      addresses: data.addresses ?? [],
    },
  };
}

export default Addresses;