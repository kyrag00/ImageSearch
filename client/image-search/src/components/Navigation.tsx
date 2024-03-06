import { NavLink } from "react-router-dom"
import "./../styles/nav.css"

export const Navigation = () => {
return <>
<nav className="nav">
<ul>
    <li>
        <NavLink to={"/"}>Home</NavLink>
    </li>
    <li>
        <NavLink to={"favs"}>Favourites</NavLink>
    </li>
</ul>
</nav>

</>
   
}