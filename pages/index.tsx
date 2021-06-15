import { Link } from "@material-ui/core";
import React from "react";
import PlayersList, {
  ALL_CLUBS_QUERY,
  ALL_COUNTRIES_QUERY,
} from "../components/playerList";
import { initializeApollo } from "../lib/apolloClient";

const IndexPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        EPL Players Directory <Link href="/table">(EPL Table)</Link>
      </h1>
      <PlayersList />
    </div>
  );
};

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_COUNTRIES_QUERY,
  });

  await apolloClient.query({
    query: ALL_CLUBS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(), //apollo client의 instance를 받고 쿼리를 끄게 됨
    },
    revalidate: 1,
  };
}

export default IndexPage;
