import React from "react";
import './LoginRegisterCss.css'
// import '../Button.jsx'
// import '../Container.jsx'
// import '../Header.jsx'
// import '../Input.jsx'
// import '../Page.jsx'
// import '../PageImage.jsx'
import Page from "../components/Page";
import PageImage from "../components/PageImage";
import Container from "../components/Container";
import Header from "../components/Header";





function LoginWeb(){
    return(
        <Page>
            <Container>
                <div className="left">
                    <PageImage/>
                </div>
                <div className="right">
                    <Header>Login</Header>
                </div>
            </Container>
        </Page>
    )
}

export default LoginWeb