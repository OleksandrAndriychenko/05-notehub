import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import { useDebounce } from 'use-debounce';
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination"
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
// import type { FormData } from '../../types/note';


export default function App() { 
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    const [debouncedSearchValue] = useDebounce(searchValue, 300);

    const updateSearchQuery = ((value: string) => {
            setSearchValue(value);
            setPage(1);
        }
    );
    const handleCreateNote = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const { data } = useQuery({
        queryKey: ["notes", debouncedSearchValue, page],
        queryFn: () => fetchNotes(debouncedSearchValue, page),
        placeholderData: keepPreviousData,
    });


    


    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {<SearchBox onChange={updateSearchQuery}/>}
                {(data && data?.totalPages > 1) && <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />}
		        {<button className={css.button} onClick={handleCreateNote}>Create note +</button>}
            </header>
            {(data && data?.notes.length >= 1) && <NoteList notes={data?.notes} />}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NoteForm onClose={handleCloseModal} />
                </Modal>
            )}
        </div>
    )
}

