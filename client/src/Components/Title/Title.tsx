import React from "react";
import './Title.css';


interface TitleInt {
    title: string;
}

const PageType: React.FC<TitleInt> = ({title}) => {


    return (
        <div className="title-container">
            <div className="title-content">
                {title}
            </div>
        </div>
    );
};

export default PageType;