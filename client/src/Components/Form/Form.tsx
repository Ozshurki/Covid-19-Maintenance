import React, {FormEvent, useState, useRef, useEffect} from "react";
import Calendar from 'react-calendar';
import axios from "axios";

import "./Form.css";
import 'react-calendar/dist/Calendar.css';
import Dropdown from "../Dropdown/Dropdown";
import {GrTable} from "react-icons/gr";
import {AiOutlineArrowRight} from "react-icons/ai"
import {Link} from "react-router-dom";
import moment from "moment";

const api = axios.create({
    baseURL: 'http://localhost:8000/api/register'
});

const btnHoverEffect = {
    scale: 1.05,
    color: "white",
    backgroundColor: "black",
    borderColor: "white",
    boxShadow: "0px 0px 5px",
};

const Form: React.FC = () => {

    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [city, setCity] = useState<string | null>(null);
    const [isInfected, setIsInfected] = useState<boolean>(false);
    const [conditions, setConditions] = useState<string[]>([]);
    const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);

    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const zipcodeRef = useRef<HTMLInputElement>(null);
    const landLineRef = useRef<HTMLInputElement>(null);
    const cellularRef = useRef<HTMLInputElement>(null);
    const otherConditionsRef = useRef<HTMLInputElement>(null);

    const dropDownHandler = (city: string) => setCity(city);

    const addCondition = (condition: string) => {

        const newConditions = [...conditions, condition];
        setConditions(newConditions);
    };

    const formHandler = async () => {

        if (otherConditionsRef.current === null) return;

        const newConditions = [...conditions, otherConditionsRef.current.value];
        setConditions(newConditions);


        const formatedDate = moment(birthDate).format('YYYY-MM-DD');

        const data = {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            birthDate: formatedDate,
            address: addressRef.current?.value,
            city: city,
            zipcode: zipcodeRef.current?.value,
            landLine: landLineRef.current?.value,
            cellular: cellularRef.current?.value,
            isInfected: isInfected,
            conditions: "covid"
        };

        try {
            await axios.post('http://localhost:8000/api/register', data);
            setShowSuccessMsg(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="form-page">
            <form className="form-container" onSubmit={formHandler}>
                <div className="form-content">
                    <div className="col col-1">
                        <div className="first-name-wrapper item">
                            <label htmlFor="form-first-name">First Name:</label>
                            <input type="text"
                                   required
                                   ref={firstNameRef}
                                   className="form-first-name"
                                   id="form-first-name"
                                   placeholder="First name..."/>
                        </div>
                        <div className="last-name-wrapper item">
                            <label htmlFor="form-last-name">Last Name:</label>
                            <input type="text"
                                   required
                                   ref={lastNameRef}
                                   className="form-last-name"
                                   id="form-last-name"
                                   placeholder="Last name..."/>
                        </div>
                        <div className="calendar-wrapper item">
                            <label>Date of birth:</label>
                            <div>{birthDate.toDateString()}</div>
                            <Calendar className="calendar"
                                      onChange={(date: Date) => setBirthDate(date)}
                                      value={birthDate}/>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="address-wrapper item">
                            <label htmlFor="form-address">Address:</label>
                            <input type="text"
                                   required
                                   ref={addressRef}
                                   className="form-address"
                                   id="form-address"
                                   placeholder="Address..."/>
                        </div>
                        <div className="city-wrapper item">
                            <Dropdown dropDownHandler={dropDownHandler} city={city}/>
                        </div>
                        <div className="zipcode-wrapper item">
                            <label htmlFor="form-zipcode">Zipcode (Optional):</label>
                            <input type="number"
                                   ref={zipcodeRef}
                                   className="form-zipcode"
                                   id="form-zipcode"
                                   placeholder="Zipcode..."/>
                        </div>
                        <div className="land-line-wrapper item">
                            <label htmlFor="form-land-line">Land-line:</label>
                            <input type="number"
                                   required
                                   ref={landLineRef}
                                   className="form-land-line"
                                   id="form-land-line"
                                   placeholder="Land-line..."/>
                        </div>
                        <div className="cellular-wrapper item">
                            <label htmlFor="form-cellular">Cellular:</label>
                            <input type="number"
                                   required
                                   ref={cellularRef}
                                   className="form-cellular"
                                   id="form-cellular"
                                   placeholder="Cellular..."/>
                        </div>
                    </div>
                    <div className="col col-3">
                        <div className="form-checkbox">
                            <label htmlFor="form-infected" className="question">Did you got infected in
                                Covid-19?</label>
                            <div className="container">
                                <div className="infected-checkbox">
                                    <label htmlFor="form-infected-yes">Yes</label>
                                    <input type="checkbox"
                                           className="form-infected"
                                           id="form-infected-yes"
                                           onClick={() => setIsInfected(true)}/>
                                </div>
                                <div className="infected-checkbox">
                                    <label htmlFor="form-infected-no">No</label>
                                    <input type="checkbox"
                                           className="form-infected"
                                           id="form-infected-no"
                                           onClick={() => setIsInfected(false)}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-checkbox">
                            <label htmlFor="diabetes" className="question">Did you had previous conditions ?</label>
                            <div className="conditions">
                                <div className="condition-checkbox">
                                    <label htmlFor="Diabetes">Diabetes</label>
                                    <input type="checkbox"
                                           className="diabetes"
                                           id="Diabetes"
                                           onClick={() => addCondition("Diabetes")}/>
                                </div>
                                <div className="condition-checkbox">
                                    <label htmlFor="cardio-vascular">Cardio-Vascular</label>
                                    <input type="checkbox"
                                           className="cardio-vascular"
                                           id="cardio-vascular"
                                           onClick={() => addCondition("Cardio-Vascular")}/>
                                </div>
                                <div className="condition-checkbox">
                                    <label htmlFor="allergies">Allergies</label>
                                    <input type="checkbox"
                                           className="allergies"
                                           id="allergies"
                                           onClick={() => addCondition("Allergies")}/>
                                </div>
                                <div className="condition-checkbox">
                                    <label htmlFor="others">Others:</label>
                                    <input type="text"
                                           ref={otherConditionsRef}
                                           className="conditions-text"
                                           id="others"
                                           placeholder="Others..."/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showSuccessMsg ? <div className="success-msg">Registered successfully!</div> : ""}
                <div className="btn-container">
                    <div className="submit-btn" onClick={formHandler}>Submit</div>
                    <Link className="table-link" to="/citizens">
                        <AiOutlineArrowRight color="black" size="1.5rem"/>
                        <GrTable color="black" size="1.8rem"/>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Form;