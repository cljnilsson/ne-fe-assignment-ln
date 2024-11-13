import { useState, useContext, useEffect } from "react";
import sortContext from "../Context/SortContext";

function SubMenu() {
	const { setSortingBy } = useContext(sortContext);
	const [sortByName, setSortByName] = useState<boolean>(false);
	const [sortByPrice, setSortByPrice] = useState<boolean>(false);

	useEffect(() => {
		setSortingBy(sortByName ? "name" : sortByPrice ? "price" : "default");
	}, [sortByName, sortByPrice, setSortingBy]);

	function onToggle(sortType: "price" | "name") {
		if (sortType === "price") {
			setSortByPrice(!sortByPrice);

            if(sortByName) {
                setSortByName(false);
            }
		} else if (sortType === "name") {
			setSortByName(!sortByName);

            if(sortByPrice) {
                setSortByPrice(false);
            }
		}
	}

	return (
		<>
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					id="sortByNameBox"
					checked={sortByName}
					onChange={() => onToggle("name")}
				/>
				<label className="form-check-label" htmlFor="sortByNameBox">
					Sort by name
				</label>
			</div>
			<div className="form-check">
				<input
					className="form-check-input"
					type="checkbox"
					id="sortByPriceBox"
					checked={sortByPrice}
					onChange={() => onToggle("price")}
				/>
				<label className="form-check-label" htmlFor="sortByPriceBox">
					Sort by cheapest first
				</label>
			</div>
		</>
	);
}

export default SubMenu;
