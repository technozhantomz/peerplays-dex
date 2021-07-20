import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    backgroundColor: '#eff0f3'
  },
}));

export default function Faucet({value}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        <Grid item xs={12} sm={12}>
          <Paper className={classes.paper}>Faucet URL : {value}</Paper>
          <Paper className={classes.paper}>The faucet address is used to pay the registration fee for new users.</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
