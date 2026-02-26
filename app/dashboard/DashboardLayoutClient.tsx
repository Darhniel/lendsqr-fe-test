"use client";
import styles from "./dashboard.module.scss";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import {SidebarProvider} from "@/contexts/SidebarContextType";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className={styles.wrapper}>
                <Navbar />
                <div className={styles.main}>
                    <Sidebar />
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}