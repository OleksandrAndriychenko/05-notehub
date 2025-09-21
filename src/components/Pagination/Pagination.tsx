import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate";

interface PaginationProps {
    data: number;
    page: number;
    setPage: (selected: number) => void;
}



export default function Pagination({data, page, setPage}:PaginationProps) {
    return (
        (
                    <ReactPaginate
                        pageCount={data ?? 0}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={1}
                        onPageChange={({ selected }) => setPage(selected + 1)}
                        forcePage={page - 1}
                        containerClassName={css.pagination}
                        activeClassName={css.active}
                        nextLabel="→"
                        previousLabel="←"
                        />
                    )
    )
}