import React from "react";
import styles from "./Dashboard.module.css";

const Settings = ({ user, onUpdate }: { user: any, onUpdate: (u: any) => void }) => (
  <div>
    <h2 className={styles.sectionTitle}>Account Settings</h2>
    <form className={styles.settingsForm} onSubmit={e => { e.preventDefault(); onUpdate(user); }}>
      <label>Name</label>
      <input type="text" value={user.name} className={styles.input} />
      <label>Email</label>
      <input type="email" value={user.email} className={styles.input} />
      <label>Password</label>
      <input type="password" value="********" className={styles.input} />
      <button className={styles.saveBtn}>Save Changes</button>
    </form>
  </div>
);

export default Settings;