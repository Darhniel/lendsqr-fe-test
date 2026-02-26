"use client"
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { FaBriefcase, FaRegHandshake } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";
import { FaHome, FaPiggyBank, FaHandHoldingUsd, FaScroll, FaRegChartBar, FaClipboardList } from "react-icons/fa";
import { MdGroup, MdGroups } from "react-icons/md";
import { LiaCoinsSolid } from "react-icons/lia";
import { TbMoneybag, TbGalaxy } from "react-icons/tb";
import { BiSolidUserCheck, BiSolidUserX } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { RiUserSettingsLine } from "react-icons/ri";
import { BsSliders2 } from "react-icons/bs";
import { LuBadgePercent } from "react-icons/lu";
import { useSidebar } from "@/contexts/SidebarContextType";


export default function Sidebar() {
    const { mobileOpen, closeMobile } = useSidebar();
    console.log("mobileOpen:", mobileOpen);

    const handleLinkClick = () => {
        closeMobile();
    };

    return (
        <>
            {mobileOpen && <div className={styles.overlay} onClick={closeMobile} />}
            <aside className={`${styles.sidebar} ${mobileOpen ? styles.mobileOpen : ""}`}>

                <nav className={styles.nav}>
                    <div>
                        <FaBriefcase color="#213F7D" />
                        <span>Switch Organization</span>
                        <IoChevronDown color="#213F7D" />
                    </div>
                    <a onClick={handleLinkClick}>
                        <FaHome />
                        Dashboard
                    </a>
                    <p className={styles.section}>CUSTOMERS</p>
                    <a className={styles.active} >
                        <MdGroup color="#213F7D" />
                        Users
                    </a>
                    <a onClick={handleLinkClick}>
                        <MdGroups />
                        Guarantors
                    </a>
                    <a onClick={handleLinkClick}>
                        <TbMoneybag />
                        Loans
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaRegHandshake />
                        Decision Models
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaPiggyBank />
                        Savings
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaHandHoldingUsd />
                        Loan Requests
                    </a>
                    <a onClick={handleLinkClick}>
                        <BiSolidUserCheck />
                        Whitelist
                    </a>
                    <a onClick={handleLinkClick}>
                        <BiSolidUserX />
                        Karma
                    </a>

                    <p className={styles.section}>BUSINESSES</p>
                    <a onClick={handleLinkClick}>
                        <FaBriefcase />
                        Organization
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaHandHoldingUsd />
                        Loan Products
                    </a>
                    <a onClick={handleLinkClick}>
                        <CiBank />
                        Savings Products
                    </a>
                    <a onClick={handleLinkClick}>
                        <LiaCoinsSolid />
                        Fees and Charges
                    </a>
                    <a onClick={handleLinkClick}>
                        <GrTransaction />
                        Transactions
                    </a>
                    <a onClick={handleLinkClick}>
                        <TbGalaxy />
                        Services
                    </a>
                    <a onClick={handleLinkClick}>
                        <RiUserSettingsLine />
                        Service Account
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaScroll />
                        Settlements
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaRegChartBar />
                        Reports
                    </a>

                    <p className={styles.section}>SETTINGS</p>
                    <a onClick={handleLinkClick}>
                        <BsSliders2 />
                        Preferences
                    </a>
                    <a onClick={handleLinkClick}>
                        <LuBadgePercent />
                        Fees and Pricing
                    </a>
                    <a onClick={handleLinkClick}>
                        <FaClipboardList />
                        Audit Logs
                    </a>
                </nav>
            </aside>
        </>
    );
}
