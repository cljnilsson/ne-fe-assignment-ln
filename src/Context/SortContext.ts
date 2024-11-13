import { createContext } from "react";

const sortContext = createContext({
    sortingBy: "" as "name" | "price" | "default",
    setSortingBy: (sortingBy: "name" | "price" | "default") => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

export default sortContext;