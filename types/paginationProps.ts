export interface Props {
    total: number
    perPage: number
    currentPage: number
    onPageChange: (page: number) => void
    onPerPageChange: (value: number) => void
}
