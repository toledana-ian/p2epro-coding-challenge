import React, {useContext, useRef, useState} from "react";
import BookInfoModel from "../../models/BookInfoModel";
import {BookInfoContext, BookInfoContextType} from "./index";

const BookInfoForm = ()=>{
    const {bookInfos, setBookInfos} = useContext(BookInfoContext) as BookInfoContextType;

    const [inputBookTitle, setInputBookTitle] = useState('');
    const [inputBookAuthor, setInputBookAuthor] = useState('');

    const refCreateBookInfoForm = useRef<HTMLFormElement>(null);

    const onClickCreateBookInfo = () => {
        if(refCreateBookInfoForm.current===null) return;
        if(!refCreateBookInfoForm.current.reportValidity()) return;

        let newBookInfo:BookInfoModel = {
            title: inputBookTitle,
            author: inputBookAuthor
        }

        setBookInfos([newBookInfo, ...bookInfos]);
    };

    return (
        <>
            <form ref={refCreateBookInfoForm} className={'flex  flex-col gap-2 w-full sm:w-80 mx-auto p-2'}>
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
                     onClick={onClickCreateBookInfo}>Create
                </div>
            </form>
        </>
    );
}

export default BookInfoForm;