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




function LoginWeb() {
  return (
    <Page>
      <Container>
        <Row className="g-4">
        <div className="col-md-6 d-flex align-items-center justify-content-center ">
          <PageImage />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center p-4">
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
        </div>
        </Row>
      </Container>
    </Page>
  );
}

export default LoginWeb