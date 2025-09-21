import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox"
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "../../services/noteService";
import { useDebouncedCallback } from 'use-debounce';
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination"
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import type { FormData } from '../../types/note';


export default function App() { 
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const [isModalOpen, setModalOpen] = useState(false);

    const updateSearchQuery = useDebouncedCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
        300
    );
    const handleCreateNote = () => {
        setModalOpen(true)
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleNoteSubmit = (values: FormData) => {
        console.log('Нотатка створена:', values);
        setModalOpen(false);
    };


    const { data } = useQuery({
        queryKey: ["notes", searchValue, page],
        queryFn: () => fetchNotes(searchValue, page),
        placeholderData: keepPreviousData,
    });
    console.log(searchValue)
    console.log(data?.notes)
    console.log(data?.totalPages)
    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {<SearchBox onChange={updateSearchQuery}/>}
                {(data && data?.totalPages > 1) && <Pagination data={data?.totalPages} page={page} setPage={setPage} />}
		        {<button className={css.button} onClick={handleCreateNote}>Create note +</button>}
            </header>
            {(data && data?.notes.length >= 1) && <NoteList notes={data?.notes} />}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NoteForm onSubmit={handleNoteSubmit} />
                </Modal>
            )}
        </div>
    )
}

