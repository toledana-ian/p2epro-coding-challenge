import React, {useContext, useRef, useState} from "react";
import BookModel from "../../models/BookModel";
import {BookContext, BookContextType} from "./index";
import axios from "axios";
import {promises} from "dns";

const BookForm = ()=>{
    const {books, setBooks} = useContext(BookContext) as BookContextType;

    const [inputBookTitle, setInputBookTitle] = useState('');
    const [inputBookAuthor, setInputBookAuthor] = useState('');

    const refCreateBookForm = useRef<HTMLFormElement>(null);

    const onClickCreateBook = ():void => {
        if (refCreateBookForm.current === null) return;
        if (!refCreateBookForm.current.reportValidity()) return;

        let newBook: BookModel = {
            id: 0,
            title: inputBookTitle,
            author: inputBookAuthor
        }

        axios.post('/api/books', newBook)
            .then((response)=>{
                setBooks([response.data, ...books]);
            })
        ;
    };

    return (
        <>
            <form ref={refCreateBookForm} className={'flex  flex-col gap-2 w-full sm:w-80 mx-auto p-2'}>
                <input
                    name={'book_title'}
                    placeholder={'Book Title'}
                    className={'input'}
                    required={true}
                    value={inputBookTitle}
                    onChange={event=>setInputBookTitle(event.target.value)}
                />
                <input
                    name={'book_author'}
                    placeholder={'Author'}
                    className={'input'}
                    required={true}
                    value={inputBookAuthor}
                    onChange={event=>setInputBookAuthor(event.target.value)}
                />

                <div className={'text-white w-fit px-8 py-1 bg-secondary rounded-full cursor-pointer select-none'}
                     onClick={onClickCreateBook}>Create
                </div>
            </form>
        </>
    );
}

export default BookForm;