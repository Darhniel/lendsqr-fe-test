'use client'
import { useState, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { Props } from '@/types/paginationProps'

export default function Pagination({
    total,
    perPage,
    currentPage,
    onPageChange,
    onPerPageChange,
}: Props) {
    const totalPages = Math.ceil(total / perPage)

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkScreen()
        window.addEventListener('resize', checkScreen)

        return () => window.removeEventListener('resize', checkScreen)
    }, [])

    const getPageNumbers = () => {
        const delta = isMobile ? 1 : 2
        const range: number[] = []
        const rangeWithDots: number[] = []
        let l: number | undefined

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i)
            }
        }

        for (let i of range) {
            if (l !== undefined) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1)
                } else if (i - l > 2) {
                    rangeWithDots.push(-1)
                }
            }
            rangeWithDots.push(i)
            l = i
        }

        return rangeWithDots
    }

    const pages = getPageNumbers()

    return (
        <div className={styles.wrapper}>
            {/* Left */}
            <div className={styles.left}>
                <span>Showing</span>

                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(Number(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </select>

                <span>out of {total}</span>
            </div>

            {/* Right */}
            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className={styles.nav}
                >
                    ‹
                </button>

                {pages.map((page, idx) =>
                    page === -1 ? (
                        <span key={`ellipsis-${idx}`} className={styles.dots}>
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`${styles.page} ${currentPage === page ? styles.active : ''
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className={styles.nav}
                >
                    ›
                </button>
            </div>
        </div>
    )
}
