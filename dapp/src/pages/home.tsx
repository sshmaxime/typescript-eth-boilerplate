import React, { FC } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { chain } from "relay";
import { IAppState } from "./../store/reducers";
import "./../_general.scss";

import { Link } from "react-router-dom";

const Home: FC = () => {
  const store = useSelector((state: IAppState) => state);

  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>Chain</th>
            <th>Current height</th>
            <th>Start height</th>
            <th>Best block hash</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {store.appState.chains.sortedChains.map((chain: chain, id) => {
            return (
              <tr key={id}>
                <td>{chain.chainId === 0 ? "Main" : "Fork"}</td>
                <td>{chain.currentHeight}</td>
                <td>{chain.startHeight}</td>
                <td>{chain.bestBlockHash}</td>
                <td>
                  <Link to={`/chain/` + chain.chainId}>
                    <Button variant="primary">Explore</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
