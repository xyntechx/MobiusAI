import Head from "next/head";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import Card from "../../components/card/card";
import { useState, useEffect } from "react";

export default function Backer() {
    const [usertype, setUsertype] = useState("");

    useEffect(() => {
        setUsertype(localStorage.getItem("usertype"));
    }, []);

    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Topnav />

            {usertype === "backer" ? (
                <main className={styles.main}>
                    <h1 className={styles.title}>Active Campaigns</h1>
                    <div className={styles.container}>
                        <Card
                            name={"Some Random Model"}
                            imageSrc={"/placeholder1.png"}
                        />
                        <Card
                            name={"Some Random Model 2"}
                            imageSrc={"/placeholder2.png"}
                        />
                        <Card
                            name={"Some Random Model 3"}
                            imageSrc={"/placeholder3.png"}
                        />
                    </div>
                </main>
            ) : (
                <main className={styles.mainError}>
                    <h1 className={styles.titleError}>
                        Oops! This page is only for Backers :p
                    </h1>
                </main>
            )}
        </div>
    );
}
