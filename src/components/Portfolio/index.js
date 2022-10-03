import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import porfolioData from './portfolio.json'


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
        setPortfolio(porfolioData)
    }, []);
    

    const onButtonClick = () => {
        // using Java Script method to get PDF file
        fetch('ShonStory-win64.msi').then(response => {
            response.blob().then(blob => {
                // Creating new object of PDF file
                const fileURL = window.URL.createObjectURL(blob);
                // Setting various property values
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = 'ShonStory-win64.msi';
                alink.click();
            })
        })
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
                                        {port.url && <button
                                            className="btn"
                                            onClick={() => window.open(port.url)}
                                        >View</button>}
                                        {port.download && <button
                                            className="btn"
                                            onClick={() => onButtonClick()}
                                        >Download</button>}
                                        <button
                                            className="btn"
                                            onClick={() => window.open(port.git)}
                                        >Git</button>
                                    </div>
                                </div >
                                {/* <div className="divcol"> */}
                                <div className="description">
                                    <h1>{port.title}</h1><br />
                                    <p>{port.description1 || ""}<br />
                                    {port.description2 || ""}<br />
                                    {port.description3 || ""}<br />
                                    {port.description4 || ""}<br />
                                    {port.description5 || ""}</p>
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