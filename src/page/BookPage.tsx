import { useState, useEffect, useContext } from "react";
import BookComponent from "../Components/Book.tsx";
import BookModal from "../Components/modals/bookModal.tsx";
import BookPagination from "../Components/BookPagination.tsx";
import BookContext from "../Context/BookContext.ts";
import SortContext from "../Context/SortContext.ts";
import SubMenu from "../Components/SubMenu.tsx";
import SearchContext from "../Context/SearchContext.ts";
import Book from "../types/book.ts";
import Loading from "../Components/generic/Loading.tsx";
import useFetchBooks from "../hooks/useFetchBooks.ts";

function BookPage() {
	const [viewingBookObj, setViewingBookObj] = useState<Book | null>(null);
	const [sortingBy, setSortingBy] = useState<"name" | "price" | "default">(
		"default"
	);
	const { books, totalItems, loading } = useContext(SearchContext);
	const { viewingBook } = useContext(BookContext);
	const fetchBooks = useFetchBooks();

	useEffect(() => {
		// Don't run with default / empty values
		if (books.length === 0 || viewingBook.length === 0) {
			return;
		}

		const found = books.filter((b) => b.id === viewingBook)[0];

		// Handle potential error
		if (!found) {
			console.error("Book not found, id is being incorrectly set");
			return;
		}

		setViewingBookObj(found);
	}, [viewingBook, books]);

	useEffect(() => {
		// default search term and defaults to index 0
		fetchBooks("King", 0);
	}, []);

	function BookWrapper() {
		console.log("Sorting by", sortingBy);

		// Use a copy of the array in order to not mutate the original
		const reorderedBooks = [...books].sort((a, b) => {
			if (sortingBy === "name") {
				if (a.volumeInfo.title < b.volumeInfo.title) {
					return -1;
				}
				if (a.volumeInfo.title > b.volumeInfo.title) {
					return 1;
				}
				return 0;
			} else if (sortingBy === "price") {
				const priceA = a.saleInfo.listPrice?.amount || 0;
				const priceB = b.saleInfo.listPrice?.amount || 0;
				if (priceA < priceB) {
					return -1;
				}
				if (priceA > priceB) {
					return 1;
				}
				return 0;
			}
			return 0;
		});

		return reorderedBooks.map((book, index) => (
			<div className="col-6 col-lg-3 my-5" key={"ubook-" + index}>
				<BookComponent
					id={book.id}
					title={book.volumeInfo.title}
					categories={book.volumeInfo.categories ?? []}
					authors={book.volumeInfo.authors ?? []}
					description={book.volumeInfo.description}
					thumbnail={book.volumeInfo.imageLinks?.thumbnail ?? ""}
					inStock={
						book.accessInfo.epub.isAvailable ||
						book.accessInfo.pdf.isAvailable
					}
					price={book.saleInfo.listPrice?.amount}
					currency={book.saleInfo.listPrice?.currencyCode}
				/>
			</div>
		));
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<div className="row">
				<div className="col">
					<SortContext.Provider value={{ sortingBy, setSortingBy }}>
						<SubMenu />
						<p>Showing 30 out of {totalItems}</p>
						<div className="row">
							<BookWrapper />
						</div>
					</SortContext.Provider>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<BookPagination totalItems={totalItems} />
					<BookModal viewingBookObj={viewingBookObj} />
				</div>
			</div>
		</>
	);
}

export default BookPage;
