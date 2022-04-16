import React, {useState} from "react";
import {BiDownArrowAlt, BiUpArrowAlt} from "react-icons/bi";

import "./Dropdown.css";

interface DropdownInt {
    dropDownHandler: (city: string) => void;
    city: string | null;
}

const Dropdown: React.FC<DropdownInt> = ({dropDownHandler, city}) => {

    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

    const arrowDown = <BiDownArrowAlt color="black" size="1.5rem"/>;
    const arrowUp = <BiUpArrowAlt color="black" size="1.5rem"/>;

    const closeDropDown = (city:string) =>{
        setIsDropdownActive(false);
        dropDownHandler(city)
    }

    return (
        <div className="dropdown-container">
            <div className="dropdown-btn"
                 onClick={() => setIsDropdownActive(!isDropdownActive)}>{!!city ? city : "City:"}
                <span>
                    {isDropdownActive ? arrowUp : arrowDown}
                </span>
            </div>
            {isDropdownActive &&
            <div className="dropdown-content">
                <div className="dropdown-item paints-option"
                     onClick={() => closeDropDown("Jerusalem")}>Jerusalem
                </div>
                <div className="dropdown-item option bags-option"
                     onClick={() => closeDropDown("Tel-Aviv")}>Tel-Aviv
                </div>
                <div className="dropdown-item option courses-option"
                     onClick={() => closeDropDown("Haifa")}>Haifa
                </div>

            </div>}

        </div>
    );
};

export default Dropdown;