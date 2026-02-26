"use client";

import styles from "./Navbar.module.scss";
import Image from "next/image"
import { useSidebar } from "@/contexts/SidebarContextType";
import { FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { toggleMobile } = useSidebar();

  return (
    <header className={styles.navbar}>
      <button
        className={styles.menuBtn}
        onClick={toggleMobile}
      >
        ☰
      </button>

      <Image
        src={"/images/logo.svg"}
        alt="Lendsqr logo"
        width={174}
        height={36}
        priority
        className={styles.logo}
      />
      <div className={styles.searchbox}>
        <input
          className={styles.search}
          placeholder="Search for anything"
        />
        <button>
          <FaSearch color="#fff" />
        </button>
      </div>

      <div className={styles.right}>
        <span className={styles.docs}>Docs</span>
        <div className={styles.profile}>
          <Image
            src={"/images/avatar.png"}
            alt="user avatar"
            width={36}
            height={36}
            priority
            className={styles.avatar}
          />
          <span>Adedeji</span>
        </div>
      </div>
    </header>
  );
}
