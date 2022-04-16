import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {motion} from "framer-motion";
import {RiArrowGoBackFill} from "react-icons/ri";
import classNames from "classnames";
import * as XLSX from 'xlsx'

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
    const [isEdit, setIsEdit] = useState<boolean>(false);
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

    const showAllCitiziens = () => {
        setCity(null);
        getCitizen("http://localhost:8000/api/citizen");
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

    const deleteRow = async (firstName:string) => {
        try{
            await axios.delete(`http://localhost:8000/api/citizens/${firstName}`)

        }catch (err){
            console.log(err);
        }

        const url = "http://localhost:8000/api/citizen";
        getCitizen(url);
    }

    const exportToExcel = () => {
        let wb = XLSX.utils.book_new(), ws = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet");

        XLSX.writeFile(wb, "Citizens.xlsx");
    }

    return (
        isLoading ? <Loader/> :
            <table className="flex-table">
                <div className="table-options">
                    <Link to="/" className="backward-link">
                        <RiArrowGoBackFill color="black" size="2rem"/>
                    </Link>
                    <div className="edit-container">
                        <div className={classNames("edit-btn", isEdit && "edit-on")}
                             onClick={() => setIsEdit(!isEdit)}>Edit
                        </div>
                    </div>
                    <div className="export-btn">
                        <button onClick={exportToExcel}>Export</button>
                    </div>
                    <div className="filters-container">
                        <div className="by-city filter-option">
                            <Dropdown dropDownHandler={dropDownHandler} city={city}/>
                        </div>
                        <div className="get-all-citizens filter-option"
                             onClick={showAllCitiziens}>Show all
                        </div>
                        <div className="by-birth-date filter-option">
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
                        <div className="submit-filters filter-option" onClick={filterHandler}>Search</div>
                    </div>
                </div>
                <thead>
                <tr>
                    {columns.map(col => <th>{col}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.length === 0 ? <div className="no-results-msg">No records</div> :
                    data.map((row, index) =>
                        <div className="row-container" key={index}>
                            <motion.tr className="table-row"
                                       initial={animateFrom}
                                       animate={animateTo}
                                       transition={{delay: index * 0.2, type: "spring"}}>
                                <td className="table-first-name">{isEdit && <span onClick={() => deleteRow(row.first_name)}>X</span>} {row.first_name}</td>
                                <td className="table-last-name">{row.last_name}</td>
                                <td className="table-birthdate">{row.birth_date.slice(0, 10)}</td>
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
