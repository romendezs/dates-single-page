"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Auth } from "firebase/auth";
import styles from "./LogInForm.module.css";

interface ILogin {
    email: string
    password: string
}

const LogInForm = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ILogin>();

    const onSubmit = (data:ILogin) => {
        console.log(data);
    };

    return (
        <section className={styles.auth}>
            <h1>Get Started!</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text"
                    placeholder="Type your name"
                    {...register("email",{ pattern: /^\S+@\S+$/i })}/>
                
                <input type="password"
                placeholder="Type a password"
                {...register("password")} />

                <button type="submit">Submit</button>
            </form>
        </section>
    );
};

export default LogInForm;