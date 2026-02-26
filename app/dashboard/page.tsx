import styles from "./dashboard.module.scss";
import StatCard from "@/components/dashboard/StatCard";
import UsersTable from "@/components/dashboard/UsersTable";
import { MdGroup, MdGroups } from "react-icons/md";
import { GrDocumentStore } from "react-icons/gr";
import { LiaCoinsSolid } from "react-icons/lia";
import usersData from "@/app/api/users/data/users.json"
import {User} from "@/types/user"

export default function DashboardPage() {
    const users = usersData as User[]
    
    return (
        <>
            <h2>Users</h2>

            <div className={styles.statsGrid}>
                <StatCard
                    title="USERS"
                    value="2,453"
                    icon={MdGroup}
                    color="#DF18FF"
                />
                <StatCard
                    title="ACTIVE USERS"
                    value="2,453"
                    icon={MdGroups}
                    color="#5718FF"
                />
                <StatCard
                    title="USERS WITH LOANS"
                    value="12,453"
                    icon={GrDocumentStore}
                    color="#F55F44"
                />
                <StatCard
                    title="USERS WITH SAVINGS"
                    value="102,453"
                    icon={LiaCoinsSolid}
                    color="#FF3366"
                />
            </div>

            <UsersTable users={users}/>
        </>
    )
}