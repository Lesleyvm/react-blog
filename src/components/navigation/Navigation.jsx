import './Navigation.css'
import {NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav className="navbar-container">
            <ul className="navbar-menu">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive}) => isActive ? 'active-link' : 'default-link'}>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/feed" className={({ isActive}) => isActive ? 'active-link' : 'default-link'}>Feed</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/overzicht" className={({ isActive}) => isActive ? 'active-link' : 'default-link'}>Overzicht</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;