import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { supabase } from "../../lib/supabaseClient";
import Wishlist from "./Wishlist";
import Settings from "./Settings";
import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [active, setActive] = useState("overview");
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        router.push("/account"); // Redirect if not logged in
      } else {
        setUser({
          name: data.user.user_metadata?.name || "",
          email: data.user.email,
        });
      }
    });
  }, [router]);


  const wishlistItems: any[] = [];
 

  // Dummy handlers (can be replaced with real logic)
  const handleLogout = () => alert("Logged out!");
  const handleAddToCart = (item: any) => alert(`Added ${item.name} to cart!`);
  const handleRemoveWishlist = (item: any) => alert(`Removed ${item.name} from wishlist!`);
  const handleUpdateUser = (u: any) => alert("User updated!");

  const handleShowPassword = () => {
    setShowPassword(true);
    setTimeout(() => setShowPassword(false), 2000); // Hide after 2 seconds
  };

  // Add this helper before your return:
  const overviewUser = {
    name: user?.name ?? "Guest",
    image: (user as any)?.image ?? undefined, // If you ever add image support
  };
  const stats = { orders: 0, wishlist: 0, shipping: 0 }; // Replace with real stats if available

  return (
    <div className={styles.dashboardContainer}>
      
      <main className={styles.dashboardMain}>
        <div className={styles.dashboardHeader}>
          
          <span className={styles.dashboardWelcome}>Welcome, {user?.name || "Guest"}</span>
        </div>
        {user?.email && (
          <div className={styles.dashboardEmail}>
            Email: {user.email}
          </div>
        )}
        
        {active === "wishlist" && (
          <Wishlist
            
            
            
          />
        )}
        
        
        {active === "settings" && (
          <Settings user={user || { name: "Guest" }} onUpdate={handleUpdateUser} />
        )}
        {success && <div className={styles.verifyMsg}>{success}</div>}
      </main>
    </div>
  );
}