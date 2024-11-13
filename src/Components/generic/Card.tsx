import { PropsWithChildren } from "react";

type CardProps = {
	thumbnail: string;
};

function Card(props: PropsWithChildren<CardProps>) {
	return (
		<div className="card bookCard h-100">
			<img
				src={props.thumbnail}
				className="card-img-top thumbnail"
				alt="Preivew image"
				loading="lazy"
			/>

			{props.children}
		</div>
	);
}

Card.Header = ({ children }: PropsWithChildren<unknown>) => <div className="card-header bg-transparent">{children}</div>
Card.Body = ({ children }: PropsWithChildren<unknown>) => <div className="card-body">{children}</div>
Card.Footer = ({ children }: PropsWithChildren<unknown>) => <div className="card-footer bg-transparent">{children}</div>

export default Card;
