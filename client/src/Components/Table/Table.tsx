import React, {useEffect, useState} from "react";
import axios from "axios";

import "./Table.css";
import Loader from "../Loader/Loader";
import {CitizenInt} from "../../Shared/citizen-int";


const columns: string[] = [
    "First name", "Last Name",
    "Birth date", "Address",
    "City", "Zipcode",
    "Landline", "Cellular",
    "Infected in covid", "Conditions"
];

const Table: React.FC = () => {

    const [data, setData] = useState<CitizenInt[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const getCitizen = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:8000/api/citizen');
                setIsLoading(false);
                if (response.data)
                    setData(response.data);

            } catch (err) {
                console.log(err);
            }
        };

        getCitizen();
    }, []);

    return (
        isLoading ? <Loader/> :
            <table className="flex-table">
                <thead>
                <tr>
                    {columns.map(col => <th>{col}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.map((row, i) =>
                    <div className="row-container" key={i}>
                        <tr className="table-row">
                            <td className="table-first-name">{row.firstName}</td>
                            <td className="table-last-name">{row.lastName}</td>
                            <td className="table-birthdate">{row.birthDate}</td>
                            <td className="table-address">{row.address}</td>
                            <td className="table-city">{row.city}</td>
                            <td className="table-zipcode">{row.zipcode}</td>
                            <td className="table-landline">{row.landline}</td>
                            <td className="table-cellular">{row.cellular}</td>
                            <td className="table-isInfected">{row.isInfected ? "Yes" : "No"}</td>
                            <td className="table-conditions">{row.conditions}</td>
                        </tr>
                    </div>
                )}
                </tbody>
            </table>
    );
};


export default Table;