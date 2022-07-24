import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import Card from "../../components/card/card";
import NewCard from "../../components/card/newcard";
import { useState, useEffect } from "react";

export default function Researcher() {
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

            {usertype === "researcher" ? (
                <main className={styles.main}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>My Campaigns</h1>
                        <div className={styles.buttonContainer}>
                            <Link href="/researcher/new">
                                <a className={styles.button}>New</a>
                            </Link>
                        </div>
                    </div>
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
                        <NewCard />
                    </div>
                </main>
            ) : (
                <main className={styles.mainError}>
                    <h1 className={styles.titleError}>
                        Oops! This page is only for Researchers :p
                    </h1>
                </main>
            )}
        </div>
    );
}
