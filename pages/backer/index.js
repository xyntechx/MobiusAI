import Head from "next/head";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import Card from "../../components/card/card";

export default function Backer() {
    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Topnav />

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
        </div>
    );
}
