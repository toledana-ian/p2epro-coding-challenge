import axios from "axios";
import BookModel from "../../models/BookModel";
import React, {useContext, useEffect} from "react";
import {BookContext, BookContextType} from "./index";

const BookList = () => {
    const {books, setBooks} = useContext(BookContext) as BookContextType;

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
        <>
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
        </>
    );
}

export default BookList;