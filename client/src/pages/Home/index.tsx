import React, {useState, createContext, useEffect} from "react";
import DefaultNavBar from "../../components/DefaultNavBar";
import BookModel from "../../models/BookModel";
import BookForm from "./BookForm";
import axios from "axios";

export type BookContextType = {
    books: BookModel[],
    setBooks: (value:BookModel[]) => void
}

export const BookContext = createContext<BookContextType | null>(null);

const Home = () => {
    const [books, setBooks] = useState<BookModel[]>([]);

    const refreshBooks = () => {
        axios.get('/api/books')
            .then((response)=>{
                setBooks(response.data.reverse());
            })
        ;
    };

    const onClickDeleteBook = (book:BookModel):void=> {
        axios.delete('/api/books/'+book.id)
            .then(()=>{
                refreshBooks();
            })
        ;
    }

    useEffect(()=>{
        refreshBooks();
    }, [])

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
                        <div className={'flex flex-wrap h-fit gap-4 justify-center w-full'}>
                            {
                                /* Loop to display each book info */
                                books.map((data, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <div className={'flex flex-col gap-2 bg-accent w-full sm:w-80 h-fit px-6 py-2'}>
                                                <div className={'h-0 ml-auto -mr-4'}>
                                                    <button
                                                        className={'text-gray-400 -mt-3 align-text-top text-xl font-semibold hover:text-black'}
                                                        onClick={()=>onClickDeleteBook(data)}
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                                <div className={'text-xl font-semibold'}>{data.title}</div>
                                                <div className={'text-base font-semibold text-secondary'}>{data.author}</div>
                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <BookForm/>
                </div>
            </div>
        </BookContext.Provider>
    );
}

export default Home;