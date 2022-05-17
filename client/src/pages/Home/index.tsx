import React, {useRef, useState} from "react";
import DefaultNavBar from "../../components/DefaultNavBar";
import BookInfoModel from "../../models/BookInfoModel";

const Home = () => {
    const [bookInfos, setBookInfos] = useState<BookInfoModel[]>([]);

    const refCreateBookInfoForm = useRef<HTMLFormElement>(null);

    const onClickCreateBookInfo = () => {
        if(refCreateBookInfoForm.current===null) return;
        if(!refCreateBookInfoForm.current.reportValidity()) return;

        let newBookInfo:BookInfoModel = {
            title: 'Test',
            author:'Christian Toledana'
        }

        setBookInfos([...bookInfos, newBookInfo]);
    };

    return (
        <div className={'flex flex-col bg-gray-100 min-h-screen'}>
            <DefaultNavBar/>
            <div className={'flex flex-col sm:flex-row-reverse grow bg-white container mx-auto p-4 pt-6 gap-2'}>
                <div className={'grow p-2 gap-2 border border-2 border-dashed'}>
                    {
                        /* Show empty text if book no book info */
                        bookInfos.length==0 &&
                        <>
                            <div className={'text-xl text-center mt-10'}>Empty List</div>
                        </>
                    }
                    {
                        /* Loop to display each book info */
                        bookInfos.map((data, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div>{data.title}</div>
                                </React.Fragment>
                            );
                        })
                    }
                </div>
                <form ref={refCreateBookInfoForm} className={'flex  flex-col gap-2 w-full sm:w-80 mx-auto p-2'}>
                    <input
                        name={'book_title'}
                        placeholder={'Book Title'}
                        className={'input'}
                        required={true}
                    />
                    <input
                        name={'book_author'}
                        placeholder={'Author'}
                        className={'input'}
                        required={true}
                    />

                    <div className={'text-white w-fit px-8 py-1 bg-secondary rounded-full cursor-pointer select-none'}
                            onClick={onClickCreateBookInfo}>Create
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Home;