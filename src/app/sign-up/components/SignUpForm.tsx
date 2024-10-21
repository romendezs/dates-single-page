"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/app/firebase/config";
import styles from "./SignUpForm.module.css";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { IUser } from "@/app/shared/interfaces/IUser.interface";
import Link from "next/link";



const SignUpForm = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();

    //Log
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const handleSignUp = async (data: IUser) => {
        try {

            const response = await createUser(data.email, data.password);
            console.log(response);
            data.email = "";
            data.password = "";

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <section className={styles.auth}>
            <h1>Get Started!</h1>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <input type="text"
                    placeholder="Type your email"
                    {...register("email", { pattern: /^\S+@\S+$/i })} />

                {
                    errors.email && <span>Email must be valid</span>
                }

                <input type="password"
                    placeholder="Type a password"
                    {...register("password")} />

                <button type="submit">Sign Up</button>
                <Link href={"/sign-in"}> Already have an account? Log In</Link>
            </form>
        </section>
    );
};

export default SignUpForm;