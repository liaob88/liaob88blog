import React, { Fragment } from "react"
import styled from "styled-components"
import { useSiteMetadata } from "../../shared/hooks/useSiteMetaData"
import { GlobalStyle } from "../Styles"
import Footer from "./Footer"
import Header from "./Header"

const Layout = ({ children }) => {
  const { title, author } = useSiteMetadata()
  return (
    <Fragment>
      <GlobalStyle />
      <Header siteTitle={title} />
      <ContentsWrapper>
        <main>{children}</main>
      </ContentsWrapper>
      <Footer author={author} />
    </Fragment>
  )
}

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export default Layout
