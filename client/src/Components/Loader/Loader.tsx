import React from "react";
import {motion} from "framer-motion";

import "./Loader.css";

const loaderContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.1
        }
    },
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const loaderDotVariants = {
    start: {
        y: "0%"
    },
    end: {
        y: "200%"
    }
};

const loaderDotTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeInOut"
};

const Loader: React.FC = () => {
    return (
        <motion.div className="loader"
                    variants={loaderContainerVariants}
                    initial="start"
                    animate="end">
            <motion.span className="loader-dot"
                         variants={loaderDotVariants}
                         transition={loaderDotTransition}/>
            <motion.span className="loader-dot"
                         variants={loaderDotVariants}
                         transition={loaderDotTransition}/>
            <motion.span className="loader-dot"
                         variants={loaderDotVariants}
                         transition={loaderDotTransition}/>
        </motion.div>
    );
};
export default Loader;