import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

type HeaderProps = { siteTitle: string }

const Header: React.FC<HeaderProps> = ({ siteTitle }) => (
  <header>
    <TitleWrapper>
      <Title>
        <LinkTitle to="/">{siteTitle}</LinkTitle>
      </Title>
    </TitleWrapper>
  </header>
)

const TitleWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 3rem 1.0875rem;
`
const Title = styled.h1`
  margin: 0;
`

const LinkTitle = styled(Link)`
  color: inherit;
  text-decoration: none;
  border-bottom: dotted coral 4px;
  display: inline-block;
  padding-bottom: 0.5rem;
`
export default Header
