import { Link } from "gatsby"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { SiteSiteMetadata } from "../../../gatsby-graphql"

interface HeaderProps {
  siteTitle: SiteSiteMetadata["title"]
}
const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const [currentPath, setCurrentPath] = useState("")
  useEffect(() => {
    setCurrentPath(window.location.pathname)
  })
  return (
    <Wrapper>
      <HeaderContents>
        <SiteTitle to="/">{siteTitle}</SiteTitle>
        <HeaderLinks>
          <HederLink to="/" $isCurrent={!(currentPath === "/about")}>
            Posts
          </HederLink>
          <HederLink to="/about" $isCurrent={currentPath === "/about"}>
            About
          </HederLink>
        </HeaderLinks>
      </HeaderContents>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: 1rem 1.0875rem;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0.1px 0.8px grey;
`

const HeaderContents = styled.div`
  max-width: 960px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`

const SiteTitle = styled(Link)`
  text-align: center;
  font-size: 2rem;
  margin: 0;
  color: #feb530;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem;
  @media only screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
`

const HeaderLinks = styled.nav`
  display: flex;
  justify-content: space-between;
`

const HederLink = styled(Link)<{ $isCurrent: boolean }>`
  margin: 0;
  color: inherit;
  text-decoration: none;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  display: inline-block;
  ${props =>
    props.$isCurrent &&
    css`
      background: #feb530;
      border-radius: 5px;
    `};
  @media only screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`
export default Header
