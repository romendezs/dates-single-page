"use client";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import React from "react";
// pages/_app.tsx or wherever you configure
import { GetServerSidePropsContext } from "next";



const Navbar = () => {

    async function getServerSideProps(context: GetServerSidePropsContext) {
        // Check if user is authenticated (e.g., via cookies, tokens)
        const user = await auth.currentUser;
      
        // Determine if the session is valid
        const isAuthenticated = !!user;
        
        return {
          props: { isAuthenticated },
        };
      }
      
    const handleClick = async()=>{
        await signOut(auth);
        redirect("/");
    };

  return (
    <nav>
        <button onClick={handleClick}>Logout</button>
    </nav>
  );
};

export default Navbar;