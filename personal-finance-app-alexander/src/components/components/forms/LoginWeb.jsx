import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

// Importing components
import {Page} from "../layout/Page";
import {Container} from "../layout/Container";
import {Row} from "../layout/Row";
import {SignUp} from "../loginPages/SignUp";
import {Form} from "../loginPages/Form";
import {Input} from "../ui/Input";
import {Button} from "../ui/Button";
import {Footer} from "../ui/Footer";
import {Header} from "../ui/Header";
import {PageImage} from "../ui/PageImage";
import { PictureDiv } from "../layout/PictureDiv";
import { RightContainer } from "../layout/RightContainer";
import { FormControlledComponent } from "./FormControlledComponent";
import { LoginPagesHeader } from "../ui/LoginPagesHeader";

function LoginWeb() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [generalError, setGeneralError] = useState("");

  async function handleLogin(data) {
    setGeneralError(""); // Clear previous error
    const success = await login({
      email: data.email,
      password: data.password,
      setGeneralError // Pass this to login to set error from backend
    });
    if (success) {
      navigate("/overview");
    }
  }

  return (
    <Page className="page-center">
      <LoginPagesHeader>finance</LoginPagesHeader>
      <Container>
        <Row className="g-4">
        <PictureDiv>
          <PageImage />
        </PictureDiv>
        <RightContainer>
          
          <Header>Login</Header>
          <SignUp>
              <FormControlledComponent
                fields={[
                  { name: "email", type: "email", placeholder: "Email" },
                  { name: "password", type: "password", placeholder: "Password" }
                ]}
                buttonText="Login"
                onSubmit={handleLogin}
                generalError={generalError} // Pass the error to the form
              />
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

export default LoginWeb;