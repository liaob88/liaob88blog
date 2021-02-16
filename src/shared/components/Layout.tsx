import React, { Fragment } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Footer from "./Footer"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import { GlobalStyle } from '../Styles';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)
  return (
    <Fragment>
      <GlobalStyle />
      <Header siteTitle={data.site.siteMetadata.title} />
      <ContentsWrapper>
        <main>{children}</main>
      </ContentsWrapper>
      <Footer author={data.site.siteMetadata.author} />
    </Fragment>
  )
}

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default Layout
