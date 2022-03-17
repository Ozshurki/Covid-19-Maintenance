import React, {useState} from "react";
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi";

import "./Dropdown.css";

interface DropdownInt {
    dropDownHandler: (city: string) => void;
}

const Dropdown: React.FC<DropdownInt> = ({dropDownHandler}) => {

    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

    const arrowDown = <BiDownArrowAlt color="black" size="1.5rem"/>;
    const arrowUp = <BiUpArrowAlt color="black" size="1.5rem"/>;

    return (
        <>
            <div className="dropdown-btn"
                 onClick={() => setIsDropdownActive(!isDropdownActive)}>Your city
                <span>
                    {isDropdownActive ? arrowUp : arrowDown}
                </span>
            </div>
            {isDropdownActive &&
            <div className="dropdown-content">
                <div className="dropdown-item paints-option"
                     onClick={() => dropDownHandler("jerusalem")}>Jerusalem
                </div>
                <div className="dropdown-item option bags-option"
                     onClick={() => dropDownHandler("tel-aviv")}>Tel Aviv
                </div>
                <div className="dropdown-item option courses-option"
                     onClick={() => dropDownHandler("haifa")}>Haifa
                </div>
            </div>}

        </>
    );
};

export default Dropdown;