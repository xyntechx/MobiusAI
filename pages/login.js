import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const backerLogin = () => {
        const USERNAME = "the_backer";
        const PASSWORD = "b123456";

        if (username === USERNAME && password === PASSWORD) {
            localStorage.setItem("usertype", "backer");
            window.location.href = "/backer";
        } else {
            alert("User not found!");
        }
    };

    const researcherLogin = () => {
        const USERNAME = "the_researcher";
        const PASSWORD = "r123456";

        if (username === USERNAME && password === PASSWORD) {
            localStorage.setItem("usertype", "researcher");
            window.location.href = "/researcher";
        } else {
            alert("User not found!");
        }
    };

    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Mobius<span className={styles.blue}>AI</span>
                </h1>
                <br />
                <div className={styles.formLogin}>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Username</p>
                        <input
                            type="text"
                            className={styles.formInput}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Password</p>
                        <input
                            type="password"
                            className={styles.formInput}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonDiv}>
                        <button
                            onClick={() => backerLogin()}
                            className={styles.buttonBlue}
                        >
                            Log In as Backer
                        </button>
                        <button
                            onClick={() => researcherLogin()}
                            className={styles.buttonBlue}
                        >
                            Log In as Researcher
                        </button>
                    </div>
                    <sub className={styles.guide}>
                        Don&apos;t have an account?{" "}
                        <Link href="/signup">
                            <a className={styles.linkUnderlined}>Sign up</a>
                        </Link>{" "}
                        instead!
                    </sub>
                </div>
            </main>
        </div>
    );
}
