import React, { ReactElement } from 'react';
import {
    Route,
    Link,
    HashRouter
  } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppState } from '../../redux/types';
import { Button } from '../../Controls';
import { logoutAndResetApplication } from '../../redux/ducks/application';
import { About, QuizList, Home } from '..';
import { Navbar, Nav, Form, Container } from 'react-bootstrap';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

  function Main(props: Props): ReactElement {

    const handleLogout = (): void => {
        props.logout();
    };

    return (
        <HashRouter>
          <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Quiz Maker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Form inline>
            <Button value="Logout" onClick={handleLogout} />
          </Form>
        </Navbar>
        <Container className="appWrapper">
          <Route path="/" component={Home} exact push />
          <Route path="/quizzes" component={QuizList} />
          <Route path="/about" component={About} />
        </Container>
      </HashRouter>
    );
  }

  const mapDispatchToProps = (dispatch: any) => ({
    logout: () => {
        return dispatch(logoutAndResetApplication());
      }
  });
  
  const mapStateToProps = (state: AppState) => {
    const { application, session } = state;
    const { user, quiz } = session;
    return {
      isInitialized: application.initialized,
      user: user,
      quizzes: quiz
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main);