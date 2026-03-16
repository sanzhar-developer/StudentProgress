import { Link, NavLink } from "react-router-dom";

function Nav() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/catalog">Catalog</Link>
            <Link to="/user">User</Link>
        </>
    )
}

export default Nav;