import { useCallback, useContext } from "react";
import BookApi from "../api/books";
import SearchContext from '../Context/SearchContext';


const useFetchBooks = () => {
    const { setTotalItems, setLoading, setSearchString, setBooks, setCurrentIndex } = useContext(SearchContext);

    const fetchBooks = useCallback(async (searchString: string, index: number) => {
		setLoading(true);

        const result = await BookApi.getBooks(searchString, index);

		setLoading(false);

        if (result) {
            setTotalItems(result.totalItems);
            setBooks(result.items);
			setCurrentIndex(index);
			setSearchString(searchString);
        } else {
            console.error('Failed to fetch books');
        }
    }, [setTotalItems, setBooks, setSearchString, setCurrentIndex, setLoading]);

    return fetchBooks;
};

export default useFetchBooks;