import { Link } from "gatsby"
import React from "react"
import styled, { css } from "styled-components"

type HeaderProps = { siteTitle: string }

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  return (
    <Wrapper>
      <SiteTitle to="/">{siteTitle}</SiteTitle>
      <HeaderLinks>
        <HederLink to="/" $isCurrent={!(location.pathname === "/about")}>
          Posts
        </HederLink>
        <HederLink to="/about" $isCurrent={location.pathname === "/about"}>
          About
        </HederLink>
      </HeaderLinks>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  padding: 1rem 1.0875rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  box-shadow: 0 0.1px 0.8px grey;
`

const SiteTitle = styled(Link)`
  text-align: center;
  font-size: 2rem;
  margin: 0;
  color: navajowhite;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem;
  @media only screen and (max-width: 480px) {
    font-size: 1.5rem;
  }
` 

const HeaderLinks = styled.div`
  display: flex;
  justify-content: space-between;
`

const HederLink = styled(Link)<{ $isCurrent: boolean }>`
  margin: 0;
  color: inherit;
  text-decoration: none;
  padding: 0.5rem;
  display: inline-block;
  ${props =>
    props.$isCurrent &&
    css`
      background: #fff1ec;
      border-radius: 5px;
    `};
  @media only screen and (max-width: 480px) {
    font-size: 0.7rem;
  }
`
export default Header
