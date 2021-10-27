import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Translate from "react-translate-component";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function Explorercards(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.current_block"} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.head_block_number}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.supply"} with={{ currency: props.coreAsset.symbol }} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.current_supply}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.active_witnesses"} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.active_witnesses.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.confirmation_time"} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.avgTime.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.last_irreversible"} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.last_irreversible_block_num}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Card className="explorer__cards">
            <CardContent className={classes.paper}>
              <Typography component="h5" variant="h4">
                <Translate content={"blockchain.blockchain.stealth_supply"} with={{ currency: props.coreAsset.symbol }} component="div" />
              </Typography>
              <Typography variant="h5" color="textSecondary">
                {props.confidential_supply}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
