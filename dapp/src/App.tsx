import React, { FC, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { init } from "./store/actions/app.actions";
import { IAppState } from "./store/reducers";
import "./_general.scss";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Chain from "./pages/chain";

const ErrorLoadingApp: FC<any> = () => {
  return <div>Error</div>;
};
const LoadingApp: FC<any> = () => {
  return <div>Loading</div>;
};

const App: FC = () => {
  // TODO: read the chain elements from the lib (smart contract)
  // TODO: display the different block headers/forks

  const dispatch = useDispatch();
  const store = useSelector((state: IAppState) => state);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  if (store.appState.ready === 0) {
    return <LoadingApp />;
  } else if (store.appState.ready === -1) {
    return <ErrorLoadingApp />;
  }

  return (
    <Router>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Link to={`/`}>
            <Col md="auto">
              <h1>Bitcoin Fork Explorer</h1>
            </Col>
          </Link>
        </Row>
      </Container>

      <Switch>
        <Route path="/chain/:chainid">
          <Chain />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
