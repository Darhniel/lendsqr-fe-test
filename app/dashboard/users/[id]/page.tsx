"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import styles from './userDetails.module.scss'
import { LuUserRound } from "react-icons/lu";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";


export default function UserDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const stored = localStorage.getItem(`user_${id}`);
            if (stored) {
                setUser(JSON.parse(stored));
            } else {
                console.warn("User not found in localStorage");
            }
            setLoading(false);
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (!user) return <div>User not found</div>;

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className={styles.wrapper}>
            <a href="/dashboard" className={styles.back}>
                ← Back to Users
            </a>

            <div className={styles.header}>
                <h1 className={styles.title}>User Details</h1>

                <div className={styles.actions}>
                    <button className={styles.blacklist}>Blacklist User</button>
                    <button className={styles.activate}>Activate User</button>
                </div>
            </div>



            {/* Summary Card */}
            <div className={styles.summaryCard}>
                <div className={styles.userDetails}>
                    <div className={styles.profile}>
                        <div className={styles.avatar}>
                            <LuUserRound
                                size={48}
                                color="#213F7D"
                            />
                        </div>
                        <div>
                            <h2 className={styles.name}>{user.profile.fullName}</h2>
                            <p>{user.account.accountNumber}</p>
                        </div>
                    </div>

                    <div className={styles.line} />

                    <div className={styles.tierSection}>
                        <span className={styles.tier}>
                            User's Tier
                        </span>
                        <div className={styles.stars}>
                            {
                                Array.from({ length: user.account.tier }).map((_, i) => (
                                    <IoIosStar key={i} color="#E9B200" />
                                ))
                            }
                            {
                                Array.from({ length: 3 - user.account.tier }).map((_, i) => (
                                    <IoIosStarOutline key={i} color="#E9B200" />
                                ))
                            }
                        </div>
                    </div>

                    <div className={styles.line} />

                    <div className={styles.balance}>
                        <h3>
                            {formatCurrency(user.account.balance.amount, user.account.balance.currency)}
                        </h3>
                        <p>{user.account.bankName}</p>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <button className={styles.active}>General Details</button>
                    <button>Documents</button>
                    <button>Bank Details</button>
                    <button>Loans</button>
                    <button>Savings</button>
                    <button>App and System</button>
                </div>
            </div>


            {/* Details Sections */}
            <div className={styles.card}>
                <Section title="Personal Information">
                    <Detail label="Full Name" value={user.profile.fullName} />
                    <Detail label="Phone Number" value={user.profile.phoneNumber} />
                    <Detail label="Email Address" value={user.profile.email} />
                    <Detail label="bvn" value={user.profile.bvn} />
                    <Detail label="Gender" value={user.profile.gender} />
                    <Detail label="Marital Status" value={user.profile.maritalStatus} />
                    <Detail label="Children" value={user.profile.children} />
                    <Detail label="Type of Residence" value={user.profile.typeOfResidence} />
                </Section>

                <hr className={styles.divider} />

                <Section title="Education and Employment">
                    <Detail
                        label="Level of Education"
                        value={user.educationAndEmployment.levelOfEducation}
                    />
                    <Detail
                        label="Employment Status"
                        value={user.educationAndEmployment.employmentStatus}
                    />
                    <Detail
                        label="Sector of Employment"
                        value={user.educationAndEmployment.sectorOfEmployment}
                    />
                    <Detail
                        label="Duration of Employment"
                        value={user.educationAndEmployment.durationOfEmployment}
                    />
                    <Detail
                        label="Office Email"
                        value={user.educationAndEmployment.officeEmail}
                    />
                    <Detail
                        label="Monthly Income"
                        value={`${formatCurrency(
                            user.educationAndEmployment.monthlyIncome.min,
                            user.educationAndEmployment.monthlyIncome.currency
                        )} - ${formatCurrency(
                            user.educationAndEmployment.monthlyIncome.max,
                            user.educationAndEmployment.monthlyIncome.currency
                        )}`}
                    />
                    <Detail
                        label="Loan Repayment"
                        value={formatCurrency(
                            user.educationAndEmployment.loanRepayment,
                            user.educationAndEmployment.monthlyIncome.currency
                        )}
                    />
                </Section>

                <hr className={styles.divider} />

                <Section title="Socials">
                    <Detail label="Twitter" value={user.socials.twitter} />
                    <Detail label="Facebook" value={user.socials.facebook} />
                    <Detail label="Instagram" value={user.socials.instagram} />
                </Section>

                <hr className={styles.divider} />

                {/* <Section title="Guarantors">
                    {user.guarantors.map((guarantor, idx) => (
                        <div key={idx} style={{ marginBottom: "1rem" }}>

                        </div>
                    ))}
                </Section> */}

                <div>
                    <h3 className={styles.sectionTitle}>
                        Guarantors
                    </h3>
                    {user.guarantors.map((guarantor, idx) => (
                        <div key={idx} style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            justifyContent: 'start',
                            marginBottom: '30px',
                            columnGap: 'clamp(20px, 4vw, 106px)',
                            rowGap: '30px',
                            width: '100%'
                        }}>
                            <Detail label="Full Name" value={guarantor.fullName} />
                            <Detail label="Phone Number" value={guarantor.phoneNumber} />
                            <Detail label="Email" value={guarantor.email} />
                            <Detail label="Relationship" value={guarantor.relationship} />

                            <hr className={styles.divider} style={{gridColumn: "1/-1"}} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* Reusable Components */

function Section({ title, children }: any) {
    return (
        <div>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                justifyContent: 'start',
                marginBottom: '30px',
                columnGap: 'clamp(20px, 4vw, 106px)',
                rowGap: '30px',
                width: "100%"
            }}>
                {children}
            </div>
        </div>
    )
}

function Detail({ label, value }: any) {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', wordWrap: 'break-word' }}>
            <span
                style={{ fontSize: '12px', color: '#545f7d', textTransform: "uppercase", marginBottom: '0.75rem' }}
            >
                {label}
            </span>
            <p style={{ fontWeight: 500, wordBreak: 'break-all' }}>
                {value || "-"}
            </p>
        </div>
    )
}
