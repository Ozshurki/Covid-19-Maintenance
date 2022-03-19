import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import {RiArrowGoBackFill} from "react-icons/ri"

import "./Table.css";
import Loader from "../Loader/Loader";
import {CitizenInt} from "../../Shared/citizen-int";
import Dropdown from "../Dropdown/Dropdown";
import {Link} from "react-router-dom";


const columns: string[] = [
    "First name", "Last Name",
    "Birth date", "Address",
    "City", "Zipcode",
    "Landline", "Cellular",
    "Infected in covid", "Conditions"
];

const animateFrom = {opacity: 0, x: -40};
const animateTo = {opacity: 1, x: 0};

const Table: React.FC = () => {

    const [data, setData] = useState<CitizenInt[]>([]);
    const [city, setCity] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fromDateRef = useRef<HTMLInputElement>(null);
    const toDateRef = useRef<HTMLInputElement>(null);

    const dropDownHandler = (city: string) => setCity(city);


    // Fetching function
    const getCitizen = async (url: string) => {
        try {
            setIsLoading(true);
            const response = await axios.get(url);
            setIsLoading(false);

            if (response.data)
                setData(response.data);

        } catch (err) {
            console.log(err);
        }
    };

    const filterHandler = async () => {

        const cityParam = `city=${city}`;
        const fromDateParam = `from-date=${fromDateRef.current?.value}`;
        const toDateParam = `to-date=${toDateRef.current?.value}`;

        const url = `http://localhost:8000/api/citizen?${cityParam}&${fromDateParam}&${toDateParam}`;
        getCitizen(url);
    };

    useEffect(() => {
        const url = "http://localhost:8000/api/citizen";
        getCitizen(url);

    }, []);

    return (
        isLoading ? <Loader/> :
            <table className="flex-table">
                <Link to="/" className="backward-link">
                    <RiArrowGoBackFill color="black" size="2rem"/>
                </Link>
                <div className="filters-container">
                    <div className="by-city filter-item">
                        <Dropdown dropDownHandler={dropDownHandler} city={city}/>
                    </div>
                    <div className="by-birth-date filter-item">
                        <label htmlFor="by-birth-date">Birth date range:</label>
                        <div className="date-range-inputs">
                            <input type="text"
                                   ref={fromDateRef}
                                   placeholder="From date... (YYYY-MM-DD)"/>
                            <input type="text"
                                   ref={toDateRef}
                                   placeholder="To date... (YYYY-MM-DD)"/>
                        </div>

                    </div>
                    <div className="submit-filters" onClick={filterHandler}>Search</div>
                </div>
                <thead>
                <tr>
                    {columns.map(col => <th>{col}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? <div className="no-results-msg">No results</div> :
                    data.map((row, i) =>
                        <div className="row-container" key={i}>
                            <motion.tr className="table-row"
                                       initial={animateFrom}
                                       animate={animateTo}
                                       transition={{delay: i * 0.2, type: "spring"}}>
                                <td className="table-first-name">{row.first_name}</td>
                                <td className="table-last-name">{row.last_name}</td>
                                <td className="table-birthdate">{row.birth_date.slice(0,10)}</td>
                                <td className="table-address">{row.address}</td>
                                <td className="table-city">{row.city}</td>
                                <td className="table-zipcode">{row.zipcode}</td>
                                <td className="table-landline">{row.land_line}</td>
                                <td className="table-cellular">{row.cellular}</td>
                                <td className="table-isInfected">{row.is_infected ? "Yes" : "No"}</td>
                                <td className="table-conditions">{row.conditions}</td>
                            </motion.tr>
                        </div>
                    )}
                </tbody>
            </table>
    );
};


export default Table;