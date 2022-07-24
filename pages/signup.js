import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState(""); // must be unique
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const backerSignUp = () => {
        if (firstName && lastName && username && password1 && password2) {
            if (password1 === password2) {
                localStorage.setItem("usertype", "backer");
                window.location.href = "/backer";
            } else {
                alert("Your passwords don't match!");
            }
        } else {
            alert("Please fill up all fields before signing up!");
        }
    };

    const researcherSignUp = () => {
        if (firstName && lastName && username && password1 && password2) {
            if (password1 === password2) {
                localStorage.setItem("usertype", "researcher");
                window.location.href = "/researcher";
            } else {
                alert("Your passwords don't match!");
            }
        } else {
            alert("Please fill up all fields before signing up!");
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
                <h1 className={styles.title}>Sign Up</h1>
                <br />
                <div className={styles.form}>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>First Name</p>
                        <input
                            type="text"
                            className={styles.formInput}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Last Name</p>
                        <input
                            type="text"
                            className={styles.formInput}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
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
                            onChange={(e) => setPassword1(e.target.value)}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Confirm Password</p>
                        <input
                            type="password"
                            className={styles.formInput}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonDiv}>
                        <button
                            onClick={() => backerSignUp()}
                            className={styles.buttonBlue}
                        >
                            Sign Up as Backer
                        </button>
                        <button
                            onClick={() => researcherSignUp()}
                            className={styles.buttonBlue}
                        >
                            Sign Up as Researcher
                        </button>
                    </div>
                    <sub className={styles.guide}>
                        Already have an account?{" "}
                        <Link href="/login">
                            <a className={styles.linkUnderlined}>Log in</a>
                        </Link>{" "}
                        instead!
                    </sub>
                </div>
            </main>
        </div>
    );
}
