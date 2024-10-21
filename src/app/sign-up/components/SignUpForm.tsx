"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "@/app/firebase/config";
import styles from "./SignUpForm.module.css";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { IUser } from "@/shared/interfaces/IUser.interface";



const SignUpForm = () => {


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUser>();

    //Log
    const [createUser] = useCreateUserWithEmailAndPassword(auth);
    const handleSignUp = async (data:IUser) => {
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

                <input type="password"
                    placeholder="Type a password"
                    {...register("password")} />

                <button type="submit">Sign Up</button>
            </form>
        </section>
    );
};

export default SignUpForm;