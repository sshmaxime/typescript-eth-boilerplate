import React, { FC } from "react";
import { Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IAppState } from "./../store/reducers";
import "./../_general.scss";

import { useParams } from "react-router-dom";

const Chain: FC = () => {
  const store = useSelector((state: IAppState) => state);
  let { chainid } = useParams<{ chainid: string }>();

  const chainId = parseInt(chainid);

  if (store.appState.chains.chains.length === 0) {
    return <div>loading</div>;
  }

  if (chainId >= store.appState.chains.chains.length || chainId < 0) {
    return <div>error</div>;
  }

  const blocks = store.appState.chains.chains[chainId].blocks;
  return (
    <Container>
      <Table responsive>
        <thead>
          <tr>
            <th>Height</th>
            <th>Block hash</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((blockHash: string, id) => {
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{blockHash}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Chain;
