import { useContext, useState, useEffect } from "react";
import searchContext from "../Context/SearchContext";
import useFetchBooks from "../hooks/useFetchBooks";

function Pagination(props: { totalItems: number }) {
	const { currentIndex, searchString } = useContext(searchContext);
	const fetchBooks = useFetchBooks();

	const pages = Math.ceil(props.totalItems / 30);
	const [currentPage, setCurrentPage] = useState<number>(0);

	// Automatically converts index to page
	useEffect(() => {
		console.log("index:", currentIndex, "page", currentIndex / 30);
		setCurrentPage(currentIndex / 30);
	}, [currentIndex]);

	function switchPage(toPage: number) {
		console.log("Switching page to index: " + (toPage - 1) * 30);
		fetchBooks(searchString, (toPage - 1) * 30);
	}

	function btn(page: number) {
		return (
			<button
				className="btn btn-primary mx-1"
				key={"pag-" + (page + 1)}
				onClick={() => switchPage(page + 1)}
				disabled={currentPage === page}
			>
				{page + 1}
			</button>
		);
	}

	function renderButtons() {
		const buttons = [];
		const startPage = Math.max(0, currentPage - 2);
		const endPage = Math.min(pages - 1, currentPage + 2);

		for (let i = startPage; i <= endPage; i++) {
			buttons.push(btn(i));
		}

		return buttons;
	}

	return (
		<div className="row mb-3">
			<div className="col text-center">
				<button
					className="btn btn-primary"
					onClick={() => switchPage(1)}
					disabled={currentPage === 0}
				>
					First
				</button>
				{renderButtons()}
				<button
					className="btn btn-primary"
					onClick={() => switchPage(pages)}
					disabled={currentPage === pages - 1}
				>
					Last
				</button>
			</div>
		</div>
	);
}

export default Pagination;
