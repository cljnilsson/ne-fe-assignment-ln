import { useContext } from "react";
import searchContext from "../Context/SearchContext";
import useFetchBooks from "../hooks/useFetchBooks.ts";

function SearchInput() {
	const { searchString, setSearchString } = useContext(searchContext);
    const fetchBooks = useFetchBooks();

	async function search() {
        fetchBooks(searchString, 0);
	}

	function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			search();
		}
	}

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchString(e.target.value)
	}

    return (<div className="input-group">
        <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchString}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={search}>
            Search
        </button>
    </div>);
}

export default SearchInput;