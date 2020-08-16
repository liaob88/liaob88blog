import { Link } from "gatsby";
import React from "react";

type HeaderProps = { siteTitle: string }

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header>
    <div className="header-content">
      <h1 className="header-title">
        <Link className="header-link" to="/">
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
