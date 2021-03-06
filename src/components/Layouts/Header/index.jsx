import React, { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";

import Context from "../../../Context/Context";
import Logo from "../../Layouts/Logo";
import "./Header.scss";

function Header(props) {
  const history = useHistory();

  //Context
  const context = useContext(Context);
  const { setLogined } = context;

  //States
  const { active } = props;
  const userInfo = JSON.parse(localStorage.getItem("user_info"));

  //Functions
  const handleLogOut = (e) => {
    e.preventDefault();
    setLogined(false);
    localStorage.removeItem("isLogined");
    localStorage.removeItem("user_info");
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <header className={`header ${active}`}>
      <div className="container header__container">
        <Logo />
        <nav className="menu">
          <li className="menu__item">
            <NavLink
              exact
              className="menu__link"
              activeClassName="menu__link--active"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <div className="menu__link">
              Movies <i className="fas fa-caret-down"></i>
            </div>
            <ul className="menu__sub">
              <li className="menu__sub-item">
                <NavLink
                  exact
                  className="menu__link"
                  activeClassName="menu__link--active"
                  to="/movie/list"
                >
                  Now Playing
                </NavLink>
              </li>
            </ul>
          </li>

          {userInfo ? (
            <li className="menu__item user__info">
              <div className="menu__link">{userInfo.name}</div>
              <ul className="menu__sub">
                {userInfo && (
                  <li className="menu__sub-item">
                    <NavLink
                      exact
                      className="menu__link"
                      activeClassName="menu__link--active"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                )}
                {userInfo.role_id === 2 && (
                  <li className="menu__sub-item">
                    <NavLink
                      exact
                      className="menu__link"
                      activeClassName="menu__link--active"
                      to="/manage/showtime"
                    >
                      Showtime
                    </NavLink>
                  </li>
                )}
                {userInfo.role_id === 1 && (
                  <li className="menu__sub-item">
                    <NavLink
                      exact
                      className="menu__link"
                      activeClassName="menu__link--active"
                      to="/admin"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
                <li className="menu__sub-item">
                  <Link className="menu__link" onClick={handleLogOut} to="/">
                    Log out
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="menu__item btn-login">
              <Link className="menu__link" to="/login">
                Join us
              </Link>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

/* <li className="menu__item">
<NavLink
  className="menu__link"
  activeClassName="menu__link--active"
  to="/contact"
>
  Contact
</NavLink>
</li>
<li className="menu__item">
<NavLink
  className="menu__link"
  activeClassName="menu__link--active"
  to="/about"
>
  About
</NavLink>
</li> */
