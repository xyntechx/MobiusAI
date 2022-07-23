import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Mobius<span className={styles.blue}>AI</span>
                </h1>
                <Link href="/signup">
                    <a className={styles.button}>Sign Up</a>
                </Link>
                <Link href="/login">
                    <a className={styles.button}>Log In</a>
                </Link>
            </main>
        </div>
    );
}
