import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiFillHome } from "react-icons/ai";
import { IoSearchCircle } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa'; 

export default function Nav() {
    let icons = {size: '10vw', className: 'icons'}

    return (
        <nav className='navbar'>
            <NavLink to="/home">
                <IconContext.Provider value={icons}>
                    <AiFillHome />
                </IconContext.Provider>
            </NavLink>

            <NavLink to="/discover">
                <IconContext.Provider value={icons}>
                    <IoSearchCircle />
                </IconContext.Provider>
            </NavLink>

            <NavLink to="/profile">
                <IconContext.Provider value={icons}>
                    <FaUser />
                </IconContext.Provider>
            </NavLink>
        </nav>
    )
}