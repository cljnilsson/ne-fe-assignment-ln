import { createContext } from "react";

const bookContext = createContext({
    viewingBook: "",
    setViewingBook: (bookId: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

export default bookContext;