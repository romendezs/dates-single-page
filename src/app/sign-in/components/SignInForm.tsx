"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/app/firebase/config";
import styles from "./SignInForm.module.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Link from "next/link";
import { IUser } from "@/app/shared/interfaces/IUser.interface";
import { useRouter } from "next/navigation";


const SignInForm = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();
    const router = useRouter();

    //Log
    const [signInUser] = useSignInWithEmailAndPassword(auth);
    const handleSignUp = async (data:IUser) => {
        try {

            const response = await signInUser(data.email, data.password);
            console.log({response});
            data.email = "";
            data.password = "";
            router.push("/");

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <section className={styles.auth}>
            <h1>Welcome again!</h1>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <input type="text"
                    placeholder="Type your email"
                    {...register("email", { pattern: /^\S+@\S+$/i })} />

                <input type="password"
                    placeholder="Type a password"
                    {...register("password")} />

                <button type="submit">Sign In</button>

                <Link href={"/sign-up"}>You don't have an account? Create one</Link>
                
            </form>
        </section>
    );
};

export default SignInForm;