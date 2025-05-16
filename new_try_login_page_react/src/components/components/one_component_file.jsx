import React from "react";
import "./Page.css";
import myImage from "../../assets/loginImage.jpg";
import './Container.css'

function Page({ children }) {
  return <div className="page-container">{children}</div>;
}


function Container({ children }) {
  return <div className="container">{children}</div>;
}

//sign up body container
function SignUp({ children }) {
  return <div className="container">{children}</div>;
}
//form component
function Form({ children }) {
  return <form className="form">{children}</form>
};

function Header({ children }) {
  return <h1 className="header">{children}</h1>;
}

function PageImage() {
  return <img src={myImage} alt="Page visual" />;}


//input component
function Input({ type, placeholder}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="input-field"
    />
  );
}

//button component
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

//footer component
function Footer({ url, children }) {
  return <footer className="footer">
    {children}
    <a href={url} className="footer-link"></a>
    </footer>;
}


function LoginWeb(){
    return(
        <Page>
            <Container>
                <div className="left">
                    <PageImage/>
                </div>
            </Container>
            <Container>
                <div className="right">
                    <Header>Login</Header>
                </div>
                <div>
                    <SignUp>
                        <Form>
                            <Input type="text" placeholder="Email" />
                            <Input type="password" placeholder="Password" />
                        </Form>
                        <Button>Login</Button>
                    </SignUp>
                </div>
                <div>
                    <Footer url="https://www.example.com">
                        Don't have an account? Sign up here.
                    </Footer>
                </div>
            </Container>
        </Page>
    )
}

export default LoginWeb