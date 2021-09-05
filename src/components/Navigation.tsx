import { Link } from "react-router-dom";

import { LinkConfig } from "../types";

interface Props {
  links: LinkConfig[];
  loggedIn: boolean;
  onLogOut: () => void;
  username?: string;
}

const Navigation = ({ links, loggedIn, onLogOut, username }: Props) => (
  <nav className="navigation container">
    <ul className="nav-menu">
      {links.map((link: LinkConfig) => {
        if (link.protected && !loggedIn) return null;
        return (
          <li key={link.to}>
            <Link className="navigation__link" to={link.to}>
              {link.title}
            </Link>
          </li>
        );
      })}
    </ul>
    <ul className="nav-menu">
      {loggedIn ? (
        <>
          <li>{username || "N/A"}</li>
          <li>
            <button className="navigation__link" onClick={onLogOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link className="navigation__link" to="/login">
            Log in
          </Link>
        </li>
      )}
    </ul>
  </nav>
);

export default Navigation;
