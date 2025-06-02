import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext/AuthContext";

// Importing components
import { Page } from "../layout/Page";
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
import { CenterTextBox } from "../ui/CenterTextBox";
import { FormControlledComponent } from "./FormControlledComponent";
import { LoginPagesHeader } from "../ui/LoginPagesHeader";



function RegisterWeb() {
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleRegister(data) {
    const success = await register(data);
    if (success) {
      navigate("/"); // Go to login page after registration
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
          <Header>Sign Up Here</Header>
          <SignUp>
              <FormControlledComponent
                fields={[
                  { name: "username", type: "text", placeholder: "username" },
                  { name: "email", type: "email", placeholder: "Email" },
                  { name: "password", type: "password", placeholder: "Create password" }
                ]}
                buttonText="Create Account"
                onSubmit={handleRegister}
              />
          </SignUp>
          <Footer url="/" linktext={"Login"}>
          Already have an account?
          </Footer>
          <CenterTextBox>“Trusted by over 30 million people and 50,000 teams worldwide”</CenterTextBox>
        </RightContainer>
        </Row>
      </Container>
    </Page>
  );
}

export default RegisterWeb;