import Modal from "../../Components/generic/Modal.tsx";
import Book from "../../types/book.ts";

function BookModal({viewingBookObj}: {viewingBookObj: Book | null}) {
	return (
		<Modal title={viewingBookObj?.volumeInfo.title ?? ""} id="bookModal">
			<div className="d-flex align-items-center justify-content-center">
				<img src={viewingBookObj?.volumeInfo.imageLinks.thumbnail} />
			</div>
			<h3>{viewingBookObj?.volumeInfo.title}</h3>
			<h4>{viewingBookObj?.volumeInfo.authors?.join(", ")}</h4>
			<p>{viewingBookObj?.volumeInfo.categories?.join(", ")}</p>
			<p className="py-5">{viewingBookObj?.volumeInfo.description}</p>
			<p>Pages: {viewingBookObj?.volumeInfo.pageCount}</p>
			<p>Language: {viewingBookObj?.accessInfo.country}</p>
			<p>
				Available as pdf:{" "}
				{viewingBookObj?.accessInfo.pdf.isAvailable ? "Yes" : "no"}
			</p>
			<p>
				Available as epub:{" "}
				{viewingBookObj?.accessInfo.epub.isAvailable ? "Yes" : "no"}
			</p>

			<p className="pt-3">
				Published: {viewingBookObj?.volumeInfo.publishedDate ?? ""}
			</p>
			<p>Publisher: {viewingBookObj?.volumeInfo.publisher ?? ""}</p>
			<p>Type: {viewingBookObj?.volumeInfo.printType ?? ""}</p>
		</Modal>
	);
}

export default BookModal;
