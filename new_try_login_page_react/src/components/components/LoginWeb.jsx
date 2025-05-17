import React from "react";
import { Link } from "react-router-dom";

// Importing components
import {Page} from "./layout/Page";
import {Container} from "./layout/Container";
import {Row} from "./layout/Row";
import {SignUp} from "./pages/SignUp";
import {Form} from "./pages/Form";
import {Input} from "./ui/Input";
import {Button} from "./ui/Button";
import {Footer} from "./ui/Footer";
import {Header} from "./ui/Header";
import {PageImage} from "./ui/PageImage";
import { PictureDiv } from "./layout/PictureDiv";
import { RightContainer } from "./layout/RightContainer";




function LoginWeb() {
  return (
    <Page>
      <Container>
        <Row className="g-4">
        <PictureDiv>
          <PageImage />
        </PictureDiv>
        <RightContainer>
          <Header>Login</Header>
          <SignUp>
            <Form>
              <Input type="text" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button className="button btn btn-dark w-100" > Login </Button>
            </Form>
          </SignUp>
          <Footer url="/register" linktext={"Sign Up"}>
            Don't have an account?
          </Footer>
        </RightContainer>
        </Row>
      </Container>
    </Page>
  );
}

export default LoginWeb