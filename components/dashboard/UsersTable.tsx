"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useMemo } from "react";
import styles from "./UsersTable.module.scss";
import { IoFilterSharp } from "react-icons/io5";
import { User } from "@/types/user"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { GrUserExpert } from "react-icons/gr";
import { LuUserX } from "react-icons/lu";
import { FaCalendarAlt } from "react-icons/fa"
import Pagination from "./Pagination";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


interface UsersTableProps {
  users: User[]
}

const formatDate = (apiDate: string): string => {
  const date = new Date(apiDate);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const [openFilter, setOpenFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    status: "",
    phone: "",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (
        filters.organization &&
        !user.organization.toLowerCase().includes(filters.organization.toLowerCase())
      )
        return false;

      if (
        filters.username &&
        !user.profile.fullName.toLowerCase().includes(filters.username.toLowerCase())
      )
        return false;

      if (
        filters.email &&
        !user.profile.email.toLowerCase().includes(filters.email.toLowerCase())
      )
        return false;

      if (filters.status && user.status.toLowerCase() !== filters.status.toLowerCase())
        return false;

      return true;
    });
  }, [users, filters]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );
  }, [filteredUsers, currentPage, perPage]);

  const filterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setOpenFilter(false);
      }

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  function handleViewDetails(user: User) {
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
    router.push(`/dashboard/users/${user.id}`);
  }

  function handleReset() {
    setFilters({
      organization: "",
      username: "",
      email: "",
      status: "",
      phone: ""
    });
    setOpenFilter(false);
  };

  function handleApply() {
    setOpenFilter(false);
  };

  const [date, setDate] = useState<Date | null>(null)


  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                ORGANIZATION
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th>
                USERNAME
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th>
                EMAIL
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th>
                PHONE NUMBER
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th>
                DATE JOINED
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th>
                STATUS
                <IoFilterSharp
                  className={styles.filterIcon}
                  onClick={() =>
                    setOpenFilter(!openFilter)
                  }
                />
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.profile.fullName}</td>
                <td>{user.profile.email}</td>
                <td>{user.profile.phoneNumber}</td>
                <td>{formatDate(user.dateJoined)}</td>
                <td>
                  <span className={`${styles.status} ${styles[user.status.toLowerCase()]}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className={styles.actionsCell}>
                  <span
                    className={styles.menuTrigger}
                    onClick={() =>
                      setOpenMenu(openMenu === user.id ? null : user.id)
                    }
                  >
                    ⋮
                  </span>

                  {openMenu === user.id && (
                    <div className={styles.actionMenu} ref={menuRef}>
                      <button onClick={() => handleViewDetails(user)}>
                        <MdOutlineRemoveRedEye />
                        View Details
                      </button>
                      <button>
                        <GrUserExpert />
                        Activate User
                      </button>
                      <button>
                        <LuUserX />
                        Blacklist User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {openFilter && (
          <div className={styles.filterPopup} ref={filterRef}>
            <div>
              <label htmlFor="organization">
                Organization
              </label>
              <select
                id="organization"
                value={filters.organization}
                onChange={(e) =>
                  setFilters({ ...filters, organization: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Lendbox">Lendbox</option>
                <option value="Lendstar">Lendstar</option>
                <option value="Irorun">Irorun</option>
                <option value="Lendsqr">Lendsqr</option>
              </select>
            </div>

            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={filters.username}
                onChange={(e) =>
                  setFilters({ ...filters, username: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <div style={{position: "relative"}}>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  customInput={
                    <input
                      id="date"
                      placeholder="Date"
                      readOnly
                    />
                  }
                />
                <label htmlFor="date" style={{ position: "absolute", right: "8px", top: "8px", cursor: "pointer " }}>
                  <FaCalendarAlt size={20} />
                </label>
              </div>

            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                type="number"
                placeholder="Phone Number"
                value={filters.phone}
                onChange={(e) =>
                  setFilters({ ...filters, phone: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })}
              >
                <option>Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
                <option>Blacklisted</option>
              </select>
            </div>

            <div className={styles.filterButtons}>
              <button
                className={styles.reset}
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                className={styles.apply}
                onClick={handleApply}
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      <Pagination
        total={filteredUsers.length}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onPerPageChange={(value) => {
          setPerPage(value)
          setCurrentPage(1)
        }}
      />
    </>
  );
}
