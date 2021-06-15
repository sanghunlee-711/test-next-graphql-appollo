import PlayersList from "../components/playerList";

// export async function getStaticProps() {
//   const apolloClient = initializeApollo();

//   await apolloClient.query({
//     query: ALL_PLAYERS_QUERY,
//   });
// }

const IndexPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>EPL Players Directory</h1>
      <PlayersList />
    </div>
  );
};

export default IndexPage;
