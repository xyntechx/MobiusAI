import Image from "next/image";
import Link from "next/link";
import styles from "../card/Card.module.css";
import { useState, useEffect } from "react";

export default function NewCard() {
    return (
        <Link href="/researcher/new">
            <a className={styles.newcard}>
                <p>Launch New Campaign</p>
            </a>
        </Link>
    );
}
