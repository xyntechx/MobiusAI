import Link from "next/link";
import styles from "../topnav/Topnav.module.css";

export default function Topnav() {
    const logout = () => {
        console.log("logout");
        window.location.href = "/";
    };

    return (
        <header className={styles.nav}>
            <h1 className={styles.name}>
                Mobius<span className={styles.blue}>AI</span>
            </h1>
            <div className={styles.navDiv}>
                <button className={styles.button} onClick={() => logout()}>
                    Log Out
                </button>
            </div>
        </header>
    );
}
