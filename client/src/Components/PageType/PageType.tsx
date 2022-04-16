import { motion } from "framer-motion";
import React from "react";
import './PageType.css';


interface PageTypeInt {
    title: string;
    img: string;
}

const PageType: React.FC<PageTypeInt> = ({title, img}) => {

    const titleVariants ={
        hidden: {
            opacity: 0,
            x: '-100vw'
        },
        visible: {
            opacity: 1,
            x: 0,
            transition:{
                type: 'spring',
                duration: 1
            }
        }
    }

    return (
        <motion.div className="title-container"
        variants={titleVariants}
        initial="hidden"
        animate="visible">
            <div className="title-content">
                <img src={img} alt="covid"/>
                <div className="title-text">{title}</div>
            </div>
        </motion.div>
    );
};

export default PageType;