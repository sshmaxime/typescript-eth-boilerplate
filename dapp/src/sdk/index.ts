import { RelayLib } from "relay";

export class SDK {
  public relayLib: RelayLib;

  constructor() {
    this.relayLib = new RelayLib();
  }
}
