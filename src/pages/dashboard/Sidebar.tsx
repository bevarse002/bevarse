import React from "react";
import { motion } from "framer-motion";
import styles from "./Dashboard.module.css";

const navItems = [
  { key: "overview", label: "Dashboard" },
  { key: "orders", label: "Orders" },
  { key: "wishlist", label: "Wishlist" },
  { key: "addresses", label: "Addresses" },
  { key: "payments", label: "Payment Methods" },
  { key: "settings", label: "Account Settings" },
];

const Sidebar = ({ active, setActive, onLogout }: { active: string; setActive: (k: string) => void; onLogout: () => void }) => (
  <motion.nav
    className={styles.sidebar}
    initial={{ x: -40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 80 }}
  >
    <ul>
      {navItems.map(item => (
        <li key={item.key}>
          <button
            className={active === item.key ? styles.activeNav : styles.navBtn}
            onClick={() => setActive(item.key)}
          >
            {item.label}
          </button>
        </li>
      ))}
      <li>
        <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </li>
    </ul>
  </motion.nav>
);

export default Sidebar;