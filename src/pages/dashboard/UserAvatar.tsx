import React from "react";
import styles from "./Dashboard.module.css";

const UserAvatar = ({ name, image }: { name: string; image?: string }) => {
  if (image) {
    return <img src={image} alt={name} className={styles.avatarImg} />;
  }
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase();
  return <div className={styles.avatarCircle}>{initials}</div>;
};

export default UserAvatar;