import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';


const Portfolio = () => {
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);




    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    });

    useEffect(() => {
        getPortfolio();
    }, []);

    const getPortfolio = async () => {
        const querySnapshot = await getDocs(collection(db, 'portfolio'));
        setPortfolio(querySnapshot.docs.map((doc) => doc.data()));
    }

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div key={idx} className="divmid">
                                <div className="image-box" key={idx}>
                                    <img
                                        src={port.cover}
                                        className="portfolio-image"
                                        alt="portfolio" />
                                    <div className="content">
                                        <p className="title">{port.title}</p>
                                        {port.url !== "" && <button
                                            className="btn"
                                            onClick={() => window.open(port.url)}
                                        >View</button>}
                                        <button
                                            className="btn"
                                            onClick={() => window.open(port.git)}
                                        >Git</button>
                                    </div>
                                </div >
                                {/* <div className="divcol"> */}
                                <div className="description">
                                    <h1>{port.title}</h1><br/>
                                    {port.description1 || ""}<br/>
                                    {port.description2 || ""}<br/>
                                    {port.description3 || ""}<br/>
                                    {port.description4 || ""}<br/>
                                    {port.description5 || ""}
                                </div>
                                {/* </div> */}
                            </div>
                        )
                    })

                }
            </div>
        );
    }


    return (
        <>
            <div className="container portfolio-page">
                <h1 className="page-title">
                    <AnimatedLetters
                        letterClass={letterClass}
                        strArray={"Portfolio".split("")}
                        idx={15}
                    />
                </h1>
                <div>{renderPortfolio(portfolio)}</div>
                {/* <div className="images-container">
                {
                    portfolio.map((port, idx) => {
                        return (
                            <div className="image-box" key={idx}>
                                <img 
                                src={port.cover}
                                className="portfolio-image"
                                alt="portfolio" />
                                <div className="content">
                                    <p className="title">{port.title}</p>
                                    <h4 className="description">{port.description}</h4>
                                    <button
                                        className="btn"
                                        onClick={() => window.open(port.url)}
                                    >View</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div> */}

            </div>
            <Loader type="pacman" />
        </>
    );
}

export default Portfolio;