import Image from "next/image";
import Link from "next/link";
import styles from "../card/Card.module.css";
import { useState, useEffect } from "react";

export default function Card({ name, imageSrc }) {
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
                {/* TODO: Progress bar */}
            </div>
        </Link>
    );
}
