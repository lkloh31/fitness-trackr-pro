import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/activities">Activities</NavLink>
        {token ? (
          <NavLink to="logout">Log out</NavLink>
        ) : (
          <>
            <NavLink to="register">Register</NavLink>
            <NavLink to="login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
