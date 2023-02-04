import { useContext } from "react";
import { NavLink } from "react-router-dom";
import userContext from "../authContext";

const Header = () => {
  const { user, setUser } = useContext(userContext);

  return (
    <header>
      <h2>Welcome to React!</h2>
      <ul>
        {!user?.loggedIn ? (
          <li>
            <NavLink to={"login"}>Login</NavLink>
          </li>
        ) : (
          <li>
            <NavLink onClick={() => setUser({ loggedIn: false })} to={"logout"}>
              Logout
            </NavLink>
          </li>
        )}
        {user?.loggedIn ? (
          <li>
            <NavLink to={"posts/add"}>Add post</NavLink>
          </li>
        ) : (
          ""
        )}
      </ul>
    </header>
  );
};

export default Header;
