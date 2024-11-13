import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand mx-5" to="/">
					NE Bookstore
				</Link>
				<SearchInput />
			</div>
		</nav>
	);
}

export default Nav;
