import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import Card from "../../components/card/card";
import NewCard from "../../components/card/newcard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Researcher() {
    const [usertype, setUsertype] = useState("");
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        setUsertype(localStorage.getItem("usertype"));

        axios
            .get(
                "https://mztlsgg2zanq5pmemkg537k4p40dxurf.lambda-url.ap-southeast-1.on.aws/"
            )
            .then((res) => {
                const temp_campaigns = [];
                for (let i = 0; i < res.data.length; i++) {
                    const data = res.data[i];

                    const name = data.name;
                    const raised = data.raised + data.backer_amt;
                    const goal = data.goal;
                    const progress =
                        Math.round((raised / goal) * 100).toString() + "%";
                    const imageSrc =
                        "/placeholder" +
                        Math.floor(Math.random() * 3 + 1) +
                        ".png";

                    temp_campaigns.push({
                        name,
                        raised,
                        goal,
                        progress,
                        imageSrc,
                    });
                }
                setCampaigns(temp_campaigns);
            });
    }, []);

    if (campaigns) {
        return (
            <div>
                <Head>
                    <title>MobiusAI</title>
                    <meta
                        name="description"
                        content="For a dynamic AI ecosystem"
                    />
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
                            {campaigns.map((campaign, i) => (
                                <Card
                                    key={i}
                                    name={campaign.name}
                                    raised={campaign.raised}
                                    goal={campaign.goal}
                                    progress={campaign.progress}
                                    imageSrc={campaign.imageSrc}
                                />
                            ))}
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
}
