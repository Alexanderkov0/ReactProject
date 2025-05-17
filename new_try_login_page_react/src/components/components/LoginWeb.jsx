import React from "react";
import "./Page.css";
import myImage from "../../assets/loginImage.jpg";
import './Container.css'
import { Link } from "react-router-dom";

function Page({ children }) {
  return <div className="page-container">{children}</div>;
}


function Container({ children }) {
  return <div className="container shadow rounded p-0 overflow-hidden">{children}</div>;
}

function Row({ children, className = "" }) {
  return <div className={`row ${className}`}>{children}</div>;
}

//sign up body container
function SignUp({ children }) {
  return <div className="container w-100">{children}</div>;
}
//form component
function Form({ children }) {
  return <form className="form w-100">{children}</form>
};

function Header({ children }) {
  return <h1 className="header text-center mb-4">{children}</h1>;
}

function PageImage() {
  return <img src={myImage} alt="Login visual" className="page-image img-fluid rounded" />;
}


//input component
function Input({ type, placeholder}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-field form-control mb-3"
    />
  );
}

//button component
function Button({ onClick, children, className = ""  }) {
  return <button onClick={onClick} className={`${className}`}>{children}</button>;
}

//footer component
function Footer({ url, children, linktext }) {
  return (
    <footer className="footer text-center mt-3">
      {children}
      <a href={url} className="footer-link ms-2 text-primary text-decoration-none">{`${linktext}`}</a>
    </footer>
  );
}



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