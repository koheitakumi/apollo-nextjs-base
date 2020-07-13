import { SubscriptionClient, ClientOptions } from "subscriptions-transport-ws";
import { WebSocketLink } from "apollo-link-ws";

const clientOption: ClientOptions = {
  reconnect: true,
  connectionParams: {
    //TODO need authentication
    //authToken: user.authToken,
  },
};

const subscriptionClient: SubscriptionClient = new SubscriptionClient(
  "ws://localhost:4000/graphql",
  clientOption
);

export const websocketLink: WebSocketLink = new WebSocketLink(
  subscriptionClient
);
