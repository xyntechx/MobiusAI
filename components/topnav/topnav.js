import Link from "next/link";
import styles from "../topnav/Topnav.module.css";
import { useState, useEffect } from "react";

export default function Topnav() {
    const [usertype, setUsertype] = useState("");

    useEffect(() => {
        setUsertype(localStorage.getItem("usertype"));
    }, []);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    return (
        <header className={styles.nav}>
            {usertype === "researcher" ? (
                <Link href="/researcher">
                    <h1 className={styles.name}>
                        Mobius<span className={styles.blue}>AI</span>
                    </h1>
                </Link>
            ) : (
                <Link href="/backer">
                    <h1 className={styles.name}>
                        Mobius<span className={styles.blue}>AI</span>
                    </h1>
                </Link>
            )}
            <div className={styles.navDiv}>
                <button className={styles.button} onClick={() => logout()}>
                    Log Out
                </button>
            </div>
        </header>
    );
}
