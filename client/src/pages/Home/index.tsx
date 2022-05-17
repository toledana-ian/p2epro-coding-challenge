import React, {useState} from "react";
import DefaultNavBar from "../../components/DefaultNavBar";
import BookInfoModel from "../../models/BookInfoModel";

const Home = () => {
    const [bookInfos, setBookInfos] = useState<BookInfoModel[]>([]);

    const onClickCreateBookInfo = () => {
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
                <div className={'bg-red-200 grow p-2 gap-2'}>
                    {
                        bookInfos.map((data) => {
                            return (
                                <>
                                    <div>{data.title}</div>
                                </>
                            );
                        })
                    }
                </div>
                <div className={'flex  flex-col gap-2 w-full sm:w-80 mx-auto p-2'}>
                    <input
                        name={'book_title'}
                        placeholder={'Book Title'}
                        className={'input'}
                    />
                    <input
                        name={'book_author'}
                        placeholder={'Author'}
                        className={'input'}
                    />
                    <button className={'text-white w-fit px-8 py-1 bg-secondary rounded-full'}
                            onClick={onClickCreateBookInfo}>Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;