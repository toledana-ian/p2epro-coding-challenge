import React from "react";
import DefaultNavBar from "../../components/DefaultNavBar";

const Home = () => {
    return (
        <div className={'bg-gray-100 h-screen'}>
            <DefaultNavBar/>
            <div className={'flex bg-white container mx-auto p-2'}>
                Hello
            </div>
        </div>
    );
}

export default Home;