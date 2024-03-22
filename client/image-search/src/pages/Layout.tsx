import { Outlet } from "react-router-dom"
import { Navigation } from "../components/Navigation"
import "./../styles/layout.css";

export const Layout = () => {
    return <>
    <header>
        <Navigation/>
    </header>
    <main>
        <Outlet/>
    </main>
    <footer>
        <br />
        <p>Image search</p>
    </footer>
    </>
}