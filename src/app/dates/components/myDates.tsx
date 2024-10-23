"use client";
import { auth, db } from "@/app/firebase/config";
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./myDates.module.css";
import Link from "next/link";

const retrievingData = async (): Promise<QuerySnapshot<DocumentData>> => {

  const email = `${auth.currentUser?.email}`;
  const q = query(collection(db, "dates"), where("User", "==", email));
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};

const MyDates = () => {

  //Session validation
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");
  if (!user && !userSession) {
    router.push("/sign-in");
  }

  const [dates, setDates] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await retrievingData();
        const fetchedDates = querySnapshot.docs.map(doc => doc.data());
        setDates(fetchedDates); // Store the data in state
        console.log(dates);
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <section className={styles.container}>
      <div>
      <table>
        <thead>
          <tr>
            <th className={styles.Pacient}>Pacient</th>
            <th className={styles.Date}>Date</th>
            <th className={styles.Purpose}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((doc, index) => (
            <tr key={index}>
              <td className={styles.Pacient}>{doc.Pacient}</td>
              <td className={styles.Date}>{doc.Date}</td>
              <td className={styles.Purpose}>{doc.Purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Link className ={styles.newDate} href="/">Create a new date</Link>
    </section>
  );
};


export default MyDates;