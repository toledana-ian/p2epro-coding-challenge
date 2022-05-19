import React, {useState, createContext} from "react";
import DefaultNavBar from "../../components/DefaultNavBar";
import BookModel from "../../models/BookModel";
import BookForm from "./BookForm";
import BookList from "./BookList";

export type BookContextType = {
    books: BookModel[],
    setBooks: (value:BookModel[]) => void
}

export const BookContext = createContext<BookContextType | null>(null);

const Home = () => {
    const [books, setBooks] = useState<BookModel[]>([]);

    return (
        <BookContext.Provider value={{books: books, setBooks: setBooks}}>
            <div className={'flex flex-col bg-gray-100 min-h-screen'}>
                <DefaultNavBar/>
                <div className={'flex flex-col sm:flex-row-reverse grow bg-white container mx-auto p-4 pt-6 gap-2'}>
                    <div className={'flex flex-wrap grow p-2 border border-2 border-dashed'}>
                        {
                            /* Show empty text if book no book info */
                            books.length === 0 &&
                            <>
                                <div className={'text-xl text-center mt-10'}>Empty List</div>
                            </>
                        }
                        <BookList/>
                    </div>
                    <BookForm/>
                </div>
            </div>
        </BookContext.Provider>
    );
}

export default Home;