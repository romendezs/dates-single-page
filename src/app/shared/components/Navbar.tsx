"use client";
import { auth } from "@/app/firebase/config";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  });

  const handleClick = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <p>Hey there!!</p>
      <button onClick={handleClick}>Logout</button>
    </nav>
  );
};

export default Navbar;