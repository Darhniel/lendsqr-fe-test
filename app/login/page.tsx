"use client"
import { useState } from "react";
import Image from "next/image";
import styles from "./login.module.scss"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        router.push(`/dashboard`)
    }

    return (
        <div className={styles.page}>
            <Image
                src={"/images/logo.svg"}
                alt="Lendsqr logo"
                width={174}
                height={36}
                priority
                className={styles.logo}
            />

            <div className={styles.container}>
                <div className={styles.left}>


                    <div className={styles.illustration}>
                        <Image
                            src={"/images/illustration.svg"}
                            alt="login illustration"
                            width={600}
                            height={338}
                            priority
                        />
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.formWrapper}>
                        <h1>Welcome</h1>
                        <p>Enter details to login.</p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles.showPassword}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </span>
                            </div>

                            <a href="#" className={styles.forgotPassword}>
                                Forgot Password?
                            </a>

                            <button type="submit" className={styles.button}>
                                LOG IN
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}