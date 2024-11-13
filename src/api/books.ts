import {getRequest} from "../Utils/RequestHelper.ts";
import Book from "../types/book.ts";

type GetBookReturn = {
    items: Book[], totalItems: number
};

class BooksApi {
    private static toQueryString(params: { [key: string]: string | number | boolean }): string {
        return Object.keys(params)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key].toString()))
            .join('&');
    }

    static async getBooks(searchString: string, index: number): Promise<GetBookReturn | null> {
        const max = 30;

        const query = {
            maxResults: max,
            q: searchString,
            startIndex: index
        }

        const queryString = BooksApi.toQueryString(query);

        return getRequest<GetBookReturn>(`volumes?${queryString}`);
    }
}

export default BooksApi;