import axios from 'axios';
import type { Note, FormData} from '../types/note';


interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}




const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${myKey}` 
    }
};
export const fetchNotes = async (query: string, page: number): Promise<FetchNotesResponse> => {
    const url = `https://notehub-public.goit.study/api/notes?search=${query}&page=${page}&perPage=12`;
    const res = await axios.get<FetchNotesResponse>(url, options);
    return res.data;
}
export const createNote = async (values: FormData) => {
    const url = `https://notehub-public.goit.study/api/notes?${values}`;
    const res = await axios.post(url, options);
    return res.data;
}

export const deleteNote = async (id:string) => {
    const url = `https://notehub-public.goit.study/api/notes?${id}`;
    const res = await axios.delete(url, options);
    return res.data;
}