import css from "./SearchBox.module.css"
interface SearchInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ onChange }:SearchInputProps) {
    
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={onChange}
        />
    )
}

