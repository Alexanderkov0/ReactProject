import React from "react";
import { Link } from "react-router-dom";

// Importing components
import { Page } from "./layout/Page";
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



function RegisterWeb() {
  return (
    <Page>
      <Container>
        <Row className="g-4">
        <PictureDiv>
          <PageImage />
        </PictureDiv>
        <RightContainer>
          <Header>Sign Up Here</Header>
          <SignUp>
            <Form>
              <Input type="text" placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="create password" />

              <Button className="button btn btn-dark w-100"> Create Account</Button>
            </Form>
          </SignUp>
          <Footer url="/" linktext={"Login"}>
          Already have an account?
          </Footer>
        </RightContainer>
        </Row>
      </Container>
    </Page>
  );
}

export default RegisterWeb;