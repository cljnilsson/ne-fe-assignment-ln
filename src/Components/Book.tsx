import { useContext } from "react";
import BookContext from "../Context/BookContext.ts";
import Card from "./generic/Card.tsx";

type BookProps = {
	id: string;
	title: string;
	authors: string[];
	categories: string[];
	description: string;
	thumbnail: string;
	inStock: boolean;
	price: number;
	currency: string;
};

function Book(props: BookProps) {
	const { setViewingBook } = useContext(BookContext);

	function updateModalSelection() {
		if (!props.id || props.id.length === 0) {
			return;
		}

		setViewingBook(props.id);
	}

	return (
		<Card thumbnail={props?.thumbnail ?? ""}>
			<Card.Header>
				<h4 className="card-title">{props.title}</h4>
				<h5>{props.authors?.join(", ")}</h5>
				<small>{props.categories.join(", ")}</small>
			</Card.Header>
			<Card.Body>
				<div className="row my-2">
					<div className="col card-text">{props.description}</div>
				</div>
			</Card.Body>
			<Card.Footer>
				<div className="mt-2 mb-3">
					<p>{props.price > 0 ? props.price + " :-" : "Free!"}</p>
					<small className={props.inStock ? "" : "text-muted"}>
						{props.inStock ? "in stock" : "Out of stock"}
					</small>
				</div>
				<button
					className="btn btn-primary w-100"
					data-bs-toggle="modal"
					data-bs-target="#bookModal"
					onClick={updateModalSelection}
					disabled={!props.inStock}
				>
					More info
				</button>
			</Card.Footer>
		</Card>
	);
}

export default Book;
