import { useState } from "react";
import "./App.scss";
import Nav from "../Components/Nav.tsx";
import SearchContext from "../Context/SearchContext.ts";
import BookContext from "../Context/BookContext.ts";
import { Outlet, Routes, Route } from "react-router-dom";
import Book from "../types/book.ts";
import BookPage from "../page/BookPage.tsx";

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const [books, setBooks] = useState<Book[]>([]);
	const [totalItems, setTotalItems] = useState<number>(0);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [viewingBook, setViewingBook] = useState<string>("");
	const [searchString, setSearchString] = useState<string>("");

	return (
		<SearchContext.Provider
			value={{
				totalItems,
				currentIndex,
				setTotalItems,
				setCurrentIndex,
				books,
				setBooks,
				searchString,
				setSearchString,
				loading,
				setLoading,
			}}
		>
			<Nav />
			<BookContext.Provider value={{ viewingBook, setViewingBook }}>
				<Routes>
					<Route path="/" element={<BookPage />} />
				</Routes>
				<Outlet />
			</BookContext.Provider>
		</SearchContext.Provider>
	);
}

export default App;
