import { gql, useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

type ID = number;

interface Player {
  id: number;
  name: string;
  position: Position;
  overall: number;
  club: Club;
  country: Country;
}

type Position =
  | "GK"
  | "RB"
  | "LB"
  | "CB"
  | "DM"
  | "CM"
  | "LM"
  | "RM"
  | "CF"
  | "ST";

interface Club {
  id: ID;
  name: string;
  league: string;
  stadium: string;
}

interface Country {
  id: ID;
  name: string;
  stadium: string;
}

export const ALL_PLAYERS_QUERY = gql`
  query allPlayers {
    queryPlayer {
      name
      position
      country {
        id
        name
        stadium
      }
      club {
        id
        name
        stadium
      }
      id
    }
  }
`;

export const ADD_CLUB = gql`
  mutation addClub {
    addClub(input: [{ name: "Arsenal" }]) {
      club {
        id
        name
      }
    }
  }
`;

export default function PlayersList() {
  const { loading, error, data } = useQuery(ALL_PLAYERS_QUERY);
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
      fontSize: 12,
    },
  });

  const classes = useStyles();

  if (error) return <div>Error loading players.</div>;
  if (loading) return <div>Loading</div>;

  const { queryPlayer: allPlayers } = data;

  return (
    <Grid style={{ marginTop: "20px" }} container spacing={2}>
      {allPlayers.map((player: Player) => (
        <Grid item xs={4} key={player.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {player.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {player.club.name}
              </Typography>
              <Typography variant="body2" component="p">
                Position - {player.position}
                <br />
                Country - {player.country.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
