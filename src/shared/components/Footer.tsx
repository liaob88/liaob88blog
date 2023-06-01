import React from "react"
import styled from "styled-components"

const Footer = ({ author }: Pick<Queries.SiteSiteMetadata, "author">) => (
  <StyledFooter>
    ©{author} {new Date().getFullYear()}. All Rights Reserved
  </StyledFooter>
)

const StyledFooter = styled.footer`
  padding: 2rem 3rem;
  text-align: center;
  color: inherit;
  background: #feb530;
  margin-top: auto;
  width: 100%;
`

export default Footer
