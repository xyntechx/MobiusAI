import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import { useState, useEffect } from "react";
import allUsers from "../../public/users/users.json";

export default function NewCampaign() {
    const [name, setName] = useState("");
    const [goal, setGoal] = useState(0);
    const [description, setDescription] = useState("");
    const [benefits, setBenefits] = useState("");
    const [fundUsage, setFundUsage] = useState("");
    const [basicAmount, setBasicAmount] = useState(0);
    const [basicDesc, setBasicDesc] = useState(0);
    const [premiumAmount, setPremiumAmount] = useState(0);
    const [premiumDesc, setPremiumDesc] = useState(0);
    const [proAmount, setProAmount] = useState(0);
    const [proDesc, setProDesc] = useState(0);
    const [basicSelected, setBasicSelected] = useState(false);
    const [premiumSelected, setPremiumSelected] = useState(false);
    const [proSelected, setProSelected] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            const USERS = allUsers.users;
            let results = [];
            for (let i = 0; i < USERS.length; i++) {
                const user = USERS[i];
                const name = user.name.toLowerCase();
                if (name.includes(searchQuery)) {
                    results.push(user);
                }
            }
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    const launch = () => {
        window.location.href = "/campaign/" + name;
    };

    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Topnav />

            <main className={styles.mainCenter}>
                <h1 className={styles.titleNewCampaign}>Launch New Campaign</h1>
                <div className={styles.form}>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Name</p>
                        <input
                            type="text"
                            className={styles.formSimpleInput}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formElement}>
                        <p className={styles.formLabel}>Fundraising Goal ($)</p>
                        <input
                            type="number"
                            className={styles.formSimpleInput}
                            onChange={(e) => setGoal(Number(e.target.value))}
                        />
                    </div>
                    <div className={styles.formColElement}>
                        <h1 className={styles.formBoldLabel}>Description</h1>
                        <sub className={styles.instructions}>
                            Who are you? What is the purpose of this campaign?
                            What will you accomplish?
                        </sub>
                        <textarea
                            rows="10"
                            cols="50"
                            className={styles.textarea}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className={styles.formColElement}>
                        <h1 className={styles.formBoldLabel}>
                            Benefits to Backers
                        </h1>
                        <sub className={styles.instructions}>
                            How will backers benefit from this campaign?
                        </sub>
                        <textarea
                            rows="10"
                            cols="50"
                            className={styles.textarea}
                            onChange={(e) => setBenefits(e.target.value)}
                        />
                    </div>
                    <div className={styles.formColElement}>
                        <h1 className={styles.formBoldLabel}>Fund Usage</h1>
                        <sub className={styles.instructions}>
                            Give a breakdown of how the funds raised will be
                            used. Max. of 20% can go to you.
                        </sub>
                        <textarea
                            rows="10"
                            cols="50"
                            className={styles.textarea}
                            onChange={(e) => setFundUsage(e.target.value)}
                        />
                    </div>
                    <div className={styles.formColElement}>
                        <h1 className={styles.formBoldLabel}>Plans</h1>
                        <sub className={styles.instructions}>
                            Select the backer plan(s) you will offer. List the
                            benefits of each plan.
                        </sub>
                        <div className={styles.plans}>
                            <div className={styles.plan}>
                                <p className={styles.formSublabel}>
                                    Basic: ${" "}
                                    <input
                                        type="number"
                                        className={styles.amtInput}
                                        onChange={(e) =>
                                            setBasicAmount(e.target.value)
                                        }
                                    ></input>
                                </p>
                                <textarea
                                    rows="10"
                                    cols="50"
                                    className={styles.textarea}
                                    onChange={(e) =>
                                        setBasicDesc(e.target.value)
                                    }
                                />
                                <button
                                    className={
                                        basicSelected
                                            ? styles.selectedButton
                                            : styles.selectButton
                                    }
                                    onClick={() =>
                                        setBasicSelected(!basicSelected)
                                    }
                                >
                                    {basicSelected ? (
                                        <p className={styles.buttonText}>
                                            Selected
                                        </p>
                                    ) : (
                                        <p className={styles.buttonText}>
                                            Select
                                        </p>
                                    )}
                                </button>
                            </div>
                            <div className={styles.plan}>
                                <p className={styles.formSublabel}>
                                    Premium: ${" "}
                                    <input
                                        type="number"
                                        className={styles.amtInput}
                                        onChange={(e) =>
                                            setPremiumAmount(e.target.value)
                                        }
                                    ></input>
                                </p>
                                <textarea
                                    rows="10"
                                    cols="50"
                                    className={styles.textarea}
                                    onChange={(e) =>
                                        setPremiumDesc(e.target.value)
                                    }
                                />
                                <button
                                    className={
                                        premiumSelected
                                            ? styles.selectedButton
                                            : styles.selectButton
                                    }
                                    onClick={() =>
                                        setPremiumSelected(!premiumSelected)
                                    }
                                >
                                    {premiumSelected ? (
                                        <p className={styles.buttonText}>
                                            Selected
                                        </p>
                                    ) : (
                                        <p className={styles.buttonText}>
                                            Select
                                        </p>
                                    )}
                                </button>
                            </div>
                            <div className={styles.plan}>
                                <p className={styles.formSublabel}>
                                    Pro: ${" "}
                                    <input
                                        type="number"
                                        className={styles.amtInput}
                                        onChange={(e) =>
                                            setProAmount(e.target.value)
                                        }
                                    ></input>
                                </p>
                                <textarea
                                    rows="10"
                                    cols="50"
                                    className={styles.textarea}
                                    onChange={(e) => setProDesc(e.target.value)}
                                />
                                <button
                                    className={
                                        proSelected
                                            ? styles.selectedButton
                                            : styles.selectButton
                                    }
                                    onClick={() => setProSelected(!proSelected)}
                                >
                                    {proSelected ? (
                                        <p className={styles.buttonText}>
                                            Selected
                                        </p>
                                    ) : (
                                        <p className={styles.buttonText}>
                                            Select
                                        </p>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formColElement}>
                        <h1 className={styles.formBoldLabel}>Team Members</h1>
                        <sub className={styles.instructions}>
                            Select other researcher(s) who are part of the
                            campaign.
                        </sub>
                        <input
                            type="text"
                            className={styles.formSimpleInput}
                            placeholder="Search by name or email"
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchResults.map((user, i) => (
                            <div
                                key={i}
                                className={styles.profile}
                                onClick={() =>
                                    setTeamMembers((arr) => [...arr, user])
                                }
                            >
                                <Image
                                    src={user.imageSrc}
                                    width={50}
                                    height={50}
                                />
                                <p className={styles.username}>{user.name}</p>
                            </div>
                        ))}

                        {/* {teamMembers.map((user) => (
                                <div>{user.name}</div>
                            ))} */}
                    </div>

                    <br />

                    <div className={styles.buttonDiv}>
                        <button
                            onClick={() => launch()}
                            className={styles.buttonBlue}
                        >
                            Launch
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
