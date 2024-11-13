import { createContext } from "react";
import Book from "../types/book.ts";

const searchContext = createContext({
    books: [] as Book[],
    setBooks: (books: Book[]) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    currentIndex: 0,
    setCurrentIndex: (index: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    totalItems: 0,
    setTotalItems: (total: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    searchString: "",
    setSearchString: (searchString: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    loading: true,
    setLoading: (state: boolean) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

export default searchContext;