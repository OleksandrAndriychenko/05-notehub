import css from "./NoteList.module.css"
import type { Note } from '../../types/note';


interface NoteListProps {
    notes: Note[];
    deleteNote: (id: string) => void;
}

export default function NoteList({notes, deleteNote}:NoteListProps) {
    return (
        <ul className={css.list}>
            {notes.map((el) => (
                <li key={el.id} className={css.listItem}>
                    <h2 className={css.title}>{el.title}</h2>
                    <p className={css.content}>{el.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{el.tag}</span>
                        <button type="button" onClick={() => deleteNote(el.id)} className={css.button}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

