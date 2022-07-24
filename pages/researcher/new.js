import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/User.module.css";
import Topnav from "../../components/topnav/topnav";
import { useState, useEffect } from "react";
import axios from "axios";
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
    const [teamMembers, setTeamMembers] = useState(["The Mobius"]);
    const [raised, setRaised] = useState(0); // remains at 0 during create
    const [message, setMessage] = useState(""); // still empty unless campaign is Completed
    const [backerAmt, setBackerAmt] = useState(0); // only for backers (i.e. the plan they choose)
    const [usertype, setUsertype] = useState("");

    useEffect(() => {
        setUsertype(localStorage.getItem("usertype"));
    }, []);

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

    const createCampaign = (
        name,
        description,
        benefits,
        fund_usage,
        basic_amt,
        basic_desc,
        premium_amt,
        premium_desc,
        pro_amt,
        pro_desc,
        goal,
        raised,
        messsage,
        backer_amt,
        team
    ) => {
        let plans = [];

        if (basic_amt) {
            plans.push({
                name: "Basic",
                cost: Number(basic_amt),
                description: basic_desc,
            });
        }

        if (premium_amt) {
            plans.push({
                name: "Premium",
                cost: Number(premium_amt),
                description: premium_desc,
            });
        }

        if (pro_amt) {
            plans.push({
                name: "Pro",
                cost: Number(pro_amt),
                description: pro_desc,
            });
        }

        if (name && description && benefits && fund_usage && plans && goal) {
            axios
                .post(
                    "https://mztlsgg2zanq5pmemkg537k4p40dxurf.lambda-url.ap-southeast-1.on.aws/",
                    {
                        name,
                        description,
                        benefits,
                        fund_usage,
                        plans,
                        goal,
                        raised,
                        messsage,
                        backer_amt,
                        team,
                    }
                )
                .finally((window.location.href = "/campaign/" + name));
        } else {
            alert(
                "Remember to complete all fields before launching your campaign!"
            );
        }
    };

    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Topnav />
            {usertype === "researcher" ? (
                <main className={styles.mainCenter}>
                    <h1 className={styles.titleNewCampaign}>
                        Launch New Campaign
                    </h1>
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
                            <p className={styles.formLabel}>
                                Fundraising Goal ($)
                            </p>
                            <input
                                type="number"
                                className={styles.formSimpleInput}
                                onChange={(e) =>
                                    setGoal(Number(e.target.value))
                                }
                            />
                        </div>
                        <div className={styles.formColElement}>
                            <h1 className={styles.formBoldLabel}>
                                Description
                            </h1>
                            <sub className={styles.instructions}>
                                Who are you? What is the purpose of this
                                campaign? What will you accomplish?
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
                                Select the backer plan(s) you will offer. List
                                the benefits of each plan.
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
                                        onChange={(e) =>
                                            setProDesc(e.target.value)
                                        }
                                    />
                                    <button
                                        className={
                                            proSelected
                                                ? styles.selectedButton
                                                : styles.selectButton
                                        }
                                        onClick={() =>
                                            setProSelected(!proSelected)
                                        }
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
                            <h1 className={styles.formBoldLabel}>
                                Team Members
                            </h1>
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
                                    onClick={() => {
                                        if (teamMembers.includes(user.name)) {
                                            setTeamMembers(
                                                teamMembers.filter(
                                                    (name) => name !== user.name
                                                )
                                            );
                                        } else {
                                            setTeamMembers((arr) => [
                                                ...arr,
                                                user.name,
                                            ]);
                                        }
                                    }}
                                >
                                    <Image
                                        src={user.imageSrc}
                                        alt={user.name + "'s Profile Picture"}
                                        width={30}
                                        height={30}
                                    />
                                    <p
                                        className={
                                            teamMembers.includes(user.name)
                                                ? styles.usernameSelected
                                                : styles.username
                                        }
                                    >
                                        {user.name}
                                    </p>
                                </div>
                            ))}
                            {teamMembers.map((name, i) => (
                                <div
                                    key={i}
                                    className={styles.profileSelected}
                                    style={{ border: "none" }}
                                >
                                    <Image
                                        alt={name + "'s Profile Picture"}
                                        width={30}
                                        height={30}
                                        src={
                                            name !== "The Mobius"
                                                ? "/users/" + name + ".png"
                                                : "/users/me.png"
                                        }
                                    />
                                    <p className={styles.username}>{name}</p>
                                </div>
                            ))}
                        </div>

                        <br />

                        <div className={styles.buttonDiv}>
                            <button
                                onClick={() =>
                                    createCampaign(
                                        name,
                                        description,
                                        benefits,
                                        fundUsage,
                                        basicAmount,
                                        basicDesc,
                                        premiumAmount,
                                        premiumDesc,
                                        proAmount,
                                        proDesc,
                                        goal,
                                        raised,
                                        message,
                                        backerAmt,
                                        teamMembers
                                    )
                                }
                                className={styles.buttonBlue}
                            >
                                Launch
                            </button>
                        </div>
                    </div>
                </main>
            ) : (
                <main className={styles.mainError}>
                    <h1 className={styles.titleError}>
                        Oops! This page is only for Researchers :p
                    </h1>
                </main>
            )}
        </div>
    );
}
