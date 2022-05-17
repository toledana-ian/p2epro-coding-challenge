import React, {useRef, useState, createContext} from "react";
import DefaultNavBar from "../../components/DefaultNavBar";
import BookInfoModel from "../../models/BookInfoModel";
import BookInfoForm from "./BookInfoForm";

export type BookInfoContextType = {
    bookInfos: BookInfoModel[],
    setBookInfos: (value:BookInfoModel[]) => void
}

export const BookInfoContext = createContext<BookInfoContextType | null>(null);

const Home = () => {
    const [bookInfos, setBookInfos] = useState<BookInfoModel[]>([]);

    return (
        <BookInfoContext.Provider value={{bookInfos, setBookInfos}}>
            <div className={'flex flex-col bg-gray-100 min-h-screen'}>
                <DefaultNavBar/>
                <div className={'flex flex-col sm:flex-row-reverse grow bg-white container mx-auto p-4 pt-6 gap-2'}>
                    <div className={'grow p-2 gap-2 border border-2 border-dashed'}>
                        {
                            /* Show empty text if book no book info */
                            bookInfos.length == 0 &&
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
                    <BookInfoForm/>
                </div>
            </div>
        </BookInfoContext.Provider>
    );
}

export default Home;