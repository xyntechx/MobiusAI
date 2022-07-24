import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Campaign.module.css";
import Topnav from "../../components/topnav/topnav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import allUsers from "../../public/users/users.json";

export default function CampaignView() {
    const router = useRouter();
    const [name, setName] = useState();
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [userType, setUserType] = useState("");
    const [description, setDescription] = useState("");
    const [benefits, setBenefits] = useState("");
    const [fundsUsage, setFundsUsage] = useState("");
    const [availablePlans, setAvailablePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState([]);
    const [team, setTeam] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [messageBacker, setMessageBacker] = useState("");
    const [messageResearcher, setMessageResearcher] = useState("");
    const [basicAmount, setBasicAmount] = useState(0);
    const [basicDesc, setBasicDesc] = useState(0);
    const [premiumAmount, setPremiumAmount] = useState(0);
    const [premiumDesc, setPremiumDesc] = useState(0);
    const [proAmount, setProAmount] = useState(0);
    const [proDesc, setProDesc] = useState(0);
    const [id, setId] = useState("");
    const [raised, setRaised] = useState(0);
    const [goal, setGoal] = useState(0);
    const [progress, setProgress] = useState("");

    useEffect(() => {
        setUserType(localStorage.getItem("usertype"));
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        setName(router.query.name);
    }, [router.isReady]);

    useEffect(() => {
        axios
            .get(
                "https://mztlsgg2zanq5pmemkg537k4p40dxurf.lambda-url.ap-southeast-1.on.aws/"
            )
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    const data = res.data[i];
                    if (data.name === name) {
                        setDescription(data.description);
                        setBenefits(data.benefits);
                        setFundsUsage(data.fund_usage);
                        setTeamMembers(data.team);
                        setAvailablePlans(data.plans);
                        setId(data.id);
                        setSelectedPlan(data.backer_amt);
                        setRaised(data.raised + data.backer_amt);
                        setGoal(data.goal);
                        setMessageBacker(data.message);
                        setProgress(
                            Math.round((raised / goal) * 100).toString() + "%"
                        );

                        if (userType === "researcher") {
                            if (Number(raised) < Number(goal)) {
                                setStatus("In Progress");
                                setColor("#EA580C");
                            } else {
                                setStatus("Completed");
                                setColor("#16A34A");
                            }
                        } else {
                            if (Number(data.backer_amt) === 0) {
                                setStatus("Not Backed");
                                setColor("#6B7280");
                            } else if (
                                Number(data.backer_amt) > 0 &&
                                Number(raised) < Number(goal)
                            ) {
                                setStatus("In Progress");
                                setColor("#EA580C");
                            } else if (
                                Number(data.backer_amt) > 0 &&
                                Number(raised) >= Number(goal)
                            ) {
                                setStatus("Completed");
                                setColor("#16A34A");
                            }
                        }
                        break;
                    }
                }
            });
    }, [name, raised, goal]);

    useEffect(() => {
        if (teamMembers) {
            const USERS = allUsers.users;
            let temp_team = [];
            for (let i = 0; i < USERS.length; i++) {
                const user = USERS[i];
                if (teamMembers.includes(user.name)) temp_team.push(user);
            }
            setTeam(temp_team);
        }
    }, [teamMembers]);

    useEffect(() => {
        if (availablePlans) {
            for (let i = 0; i < availablePlans.length; i++) {
                const { name, cost, description } = { ...availablePlans[i] };
                switch (name) {
                    case "Basic":
                        setBasicAmount(cost);
                        setBasicDesc(description);
                        break;
                    case "Premium":
                        setPremiumAmount(cost);
                        setPremiumDesc(description);
                        break;
                    case "Pro":
                        setProAmount(cost);
                        setProDesc(description);
                        break;
                }
            }
        }
    }, [availablePlans]);

    const updateBackerAmount = (id, backer_amt) => {
        if (Number(backer_amt) > 0) {
            axios
                .put(
                    "https://mztlsgg2zanq5pmemkg537k4p40dxurf.lambda-url.ap-southeast-1.on.aws/",
                    { id: id, backer_amt: Number(backer_amt) }
                )
                .then((res) => {
                    setRaised(Number(raised) + Number(backer_amt));
                    setProgress(
                        Math.round(
                            (Number(raised) / Number(goal)) * 100
                        ).toString() + "%"
                    );
                    if (Number(raised) < Number(goal)) {
                        setStatus("In Progress");
                        setColor("#EA580C");
                    } else if (Number(raised) >= Number(goal)) {
                        setStatus("Completed");
                        setColor("#16A34A");
                    }
                });
        }
    };

    const uploadMessage = (message) => {
        axios
            .put(
                "https://mztlsgg2zanq5pmemkg537k4p40dxurf.lambda-url.ap-southeast-1.on.aws/",
                { id: id, message: message }
            )
            .then((res) => {
                setMessageBacker(message);
            });
    };

    return (
        <div>
            <Head>
                <title>MobiusAI</title>
                <meta name="description" content="For a dynamic AI ecosystem" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Topnav />

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {name}{" "}
                    <span
                        className={styles.status}
                        style={{ borderColor: color, color: color }}
                    >
                        {status}
                    </span>
                </h1>
                <div className={styles.progress}>
                    <p
                        style={{
                            marginBottom: "0.5rem",
                            color: "#374151",
                            width: "50%",
                        }}
                    >
                        ${raised} out of ${goal} pledged
                    </p>
                    <p
                        style={{
                            marginBottom: "0.5rem",
                            color: "#374151",
                            width: "50%",
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
                <br />

                <hr
                    style={{
                        width: "100%",
                        border: "none",
                        borderTop: "#D9D9D9 solid 1px",
                    }}
                />
                <div className={styles.content}>
                    <div className={styles.mainpanel}>
                        <h1 className={styles.panelTitle}>Description</h1>
                        <p style={{ whiteSpace: "pre-wrap" }}>{description}</p>

                        <br />

                        <h1 className={styles.panelTitle}>
                            Benefits to{" "}
                            {userType === "backer" ? (
                                <span>You</span>
                            ) : (
                                <span>Backers</span>
                            )}
                        </h1>
                        <p style={{ whiteSpace: "pre-wrap" }}>{benefits}</p>

                        <br />

                        <h1 className={styles.panelTitle}>Funds Usage</h1>
                        <p style={{ whiteSpace: "pre-wrap" }}>{fundsUsage}</p>

                        <br />

                        {userType === "researcher" &&
                            status === "Completed" &&
                            !messageBacker && (
                                <div className={styles.message}>
                                    <h1 className={styles.panelTitleBlue}>
                                        Send Message to Backers
                                    </h1>
                                    <sub className={styles.instructions}>
                                        You may include the URLs for the model,
                                        dataset, research paper, etc.
                                    </sub>
                                    <textarea
                                        rows="10"
                                        cols="50"
                                        className={styles.textarea}
                                        onChange={(e) =>
                                            setMessageResearcher(e.target.value)
                                        }
                                    />
                                    <div className={styles.buttonContainer}>
                                        <button
                                            className={styles.buttonBlue}
                                            onClick={() =>
                                                uploadMessage(messageResearcher)
                                            }
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )}
                        {((userType === "backer" &&
                            status === "Completed" &&
                            messageBacker) ||
                            (userType === "researcher" &&
                                status === "Completed" &&
                                messageBacker)) && (
                            <div className={styles.message}>
                                {userType === "backer" ? (
                                    <h1 className={styles.panelTitleBlue}>
                                        Message from Researchers
                                    </h1>
                                ) : (
                                    <h1 className={styles.panelTitleBlue}>
                                        Message to Backers
                                    </h1>
                                )}

                                <p
                                    style={{
                                        margin: "0",
                                        whiteSpace: "pre-wrap",
                                    }}
                                >
                                    {messageBacker}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className={styles.sidepanel}>
                        <h1 className={styles.panelTitle}>Who We Are</h1>
                        {team.map((user, i) => (
                            <div key={i} className={styles.profile}>
                                <Image
                                    src={user.imageSrc}
                                    alt={user.name + "'s Profile Picture"}
                                    width={40}
                                    height={40}
                                />
                                <p>{user.name}</p>
                            </div>
                        ))}

                        <br />

                        {userType === "backer" && status === "Not Backed" && (
                            <>
                                <h1 className={styles.panelTitle}>
                                    Become a Backer
                                </h1>
                                {basicAmount > 0 && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Basic: ${basicAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {basicDesc}
                                        </p>
                                        <button
                                            className={styles.selectButton}
                                            onClick={() => {
                                                setSelectedPlan(basicAmount);
                                                updateBackerAmount(
                                                    id,
                                                    basicAmount
                                                );
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                )}
                                {premiumAmount > 0 && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Premium: ${premiumAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {premiumDesc}
                                        </p>
                                        <button
                                            className={styles.selectButton}
                                            onClick={() => {
                                                setSelectedPlan(premiumAmount);
                                                updateBackerAmount(
                                                    id,
                                                    premiumAmount
                                                );
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                )}
                                {proAmount > 0 && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Pro: ${proAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {proDesc}
                                        </p>
                                        <button
                                            className={styles.selectButton}
                                            onClick={() => {
                                                setSelectedPlan(proAmount);
                                                updateBackerAmount(
                                                    id,
                                                    proAmount
                                                );
                                            }}
                                        >
                                            Select
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                        {userType === "backer" && status !== "Not Backed" && (
                            <>
                                <h1 className={styles.panelTitle}>Your Plan</h1>
                                {Number(selectedPlan) === basicAmount && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Basic: ${basicAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {basicDesc}
                                        </p>
                                    </div>
                                )}
                                {Number(selectedPlan) === premiumAmount && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Premium: ${premiumAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {premiumDesc}
                                        </p>
                                    </div>
                                )}
                                {Number(selectedPlan) === proAmount && (
                                    <div className={styles.plan}>
                                        <p className={styles.amount}>
                                            Pro: ${proAmount}
                                        </p>
                                        <p
                                            style={{
                                                margin: "0",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {proDesc}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
