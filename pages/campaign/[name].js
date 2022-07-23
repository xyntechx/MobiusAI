import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Campaign.module.css";
import Topnav from "../../components/topnav/topnav";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CampaignView() {
    const router = useRouter();
    const { name } = router.query;
    const [status, setStatus] = useState("");
    const [color, setColor] = useState("");
    const [userType, setUserType] = useState("");
    const [description, setDescription] = useState("");
    const [benefits, setBenefits] = useState("");
    const [fundsUsage, setFundsUsage] = useState("");
    const [availablePlans, setAvailablePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [messageBacker, setMessageBacker] = useState("");
    const [messageResearcher, setMessageResearcher] = useState("");

    useEffect(() => {
        // TODO: get status of model from database
        setStatus("Not Backed"); // or In Progress or Completed
        setColor("#6B7280"); // or #EA580C or #16A34A

        // TODO: get user account
        setUserType("backer"); // or researcher

        // TODO: get campaign details
        setDescription("description");
        setBenefits("benefits");
        setFundsUsage("funds usage");
    }, []);

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

                {/* // TODO: Progress bar, like, share */}

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
                        <p>{description}</p>
                        <h1 className={styles.panelTitle}>
                            Benefits to{" "}
                            {userType === "backer" ? (
                                <span>You</span>
                            ) : (
                                <span>Backers</span>
                            )}
                        </h1>
                        <p>{benefits}</p>
                        <h1 className={styles.panelTitle}>Funds Usage</h1>
                        <p>{fundsUsage}</p>
                        {userType === "researcher" && status === "Completed" && (
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
                                    <button className={styles.buttonBlue}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                        {userType === "backer" && status === "Completed" && (
                            <div className={styles.message}>
                                <h1 className={styles.panelTitleBlue}>
                                    Message from Researchers
                                </h1>
                                <p className={styles.messageBacker}>
                                    {messageBacker}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className={styles.sidepanel}>
                        <h1 className={styles.panelTitle}>Who We Are</h1>
                        {teamMembers.map((name, i) => (
                            <div key={i} className={styles.profile}>
                                <div>PLACE IMAGE HERE</div>
                                <p>{name}</p>
                            </div>
                        ))}
                        {userType === "backer" && status === "Not Backed" && (
                            <>
                                <h1 className={styles.panelTitle}>
                                    Become a Backer
                                </h1>
                                {availablePlans.map((plan, i) => (
                                    <div key={i} className={styles.plan}>
                                        <p>plan.title</p>
                                        <p>plan.desc</p>
                                        <button>Select</button>
                                    </div>
                                ))}
                            </>
                        )}
                        {userType === "backer" && status !== "Not Backed" && (
                            <>
                                <h1 className={styles.panelTitle}>Your Plan</h1>
                                <div className={styles.plan}>
                                    <p>plan.title</p>
                                    <p>plan.desc</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
