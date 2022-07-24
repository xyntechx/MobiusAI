import Image from "next/image";
import Link from "next/link";
import styles from "../card/Card.module.css";

export default function Card({ name, raised, goal, progress, imageSrc }) {
    return (
        <Link href={"/campaign/" + name}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <Image
                        src={imageSrc}
                        layout="fill"
                        alt="Model placeholder image"
                    />
                </div>
                <p className={styles.name}>{name}</p>
                <div className={styles.progress}>
                    <p
                        style={{
                            marginBottom: "0.5rem",
                            color: "#374151",
                            width: "90%",
                        }}
                    >
                        ${raised} out of ${goal} pledged
                    </p>
                    <p
                        style={{
                            marginBottom: "0.5rem",
                            color: "#374151",
                            width: "10%",
                            textAlign: "right",
                        }}
                    >
                        {progress}
                    </p>
                </div>
                <div className={styles.skeletonProgress}>
                    <div
                        className={styles.fillProgress}
                        style={{ width: progress }}
                    ></div>
                </div>
            </div>
        </Link>
    );
}
