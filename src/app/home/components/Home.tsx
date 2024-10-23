"use client";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { useForm } from "react-hook-form";
import { IUser } from "@/app/shared/interfaces/IUser.interface";
import { CreateDate } from "../interfaces/CreateDate";
import styles from "./Home.module.css";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { addDoc, collection} from "firebase/firestore";


const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "500"]
});

const HomeComponent = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateDate>();

    const userSession = sessionStorage.getItem("user");


    if (!user && !userSession) {
        router.push("/sign-in");
    }


    const buttonClass = `${montserrat.className} ${styles.submit}`;
    const myDatesClass = `${montserrat.className} ${styles.dates}`;
    
    const sendData = async(data:CreateDate)=>{
        await addDoc(collection(db,"dates"),{
            Pacient : data.pacient,
            Date: data.date,
            Purpose: data.purpose,
            User: auth.currentUser?.email,
            CreatedAt: Date()
        });

    };

    return (
        <section className={styles.datesForm}>
            <form onSubmit={handleSubmit(sendData)}>
                <h1>Create a new date</h1>
                <input type="text"
                    className={montserrat.className}
                    placeholder="Type the name of the pacient"
                    {...register("pacient", { required: true, pattern: /^\w+(\w+\s{0,1}){3}$/ })}
                />

                <input type="date"
                    className={montserrat.className}
                    {...register("date")} />

                <textarea placeholder="Type the purpose of the date"
                    className={montserrat.className}
                    {...register("purpose")}
                ></textarea>

                <button className={buttonClass} type="submit">Send</button>
            </form>

                <Link className={styles.dates} href={"/dates"}>View all my dates</Link>
        </section>
    );
};

export default HomeComponent;