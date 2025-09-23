import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox"
import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes, createNote, deleteNote } from "../../services/noteService";
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
    const queryClient = useQueryClient();

    const createNotes = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
        }
    });

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
        console.log('Нотатка створена:', values.content);
        setModalOpen(false);
        createNotes.mutate(values);
    };
    

    const { data } = useQuery({
        queryKey: ["notes", searchValue, page],
        queryFn: () => fetchNotes(searchValue, page),
        placeholderData: keepPreviousData,
    });
    const deleteNoteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] }); // оновлює список
        },
    });
    const handleNoteDelete = (noteId: string) => {
        deleteNoteMutation.mutate(noteId);
    };


    


    return (
        <div className={css.app}>
	        <header className={css.toolbar}>
		        {<SearchBox onChange={updateSearchQuery}/>}
                {(data && data?.totalPages > 1) && <Pagination data={data?.totalPages} page={page} setPage={setPage} />}
		        {<button className={css.button} onClick={handleCreateNote}>Create note +</button>}
            </header>
            {(data && data?.notes.length >= 1) && <NoteList deleteNote={handleNoteDelete} notes={data?.notes} />}
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <NoteForm onSubmit={handleNoteSubmit} onClose={handleCloseModal} />
                </Modal>
            )}
        </div>
    )
}

