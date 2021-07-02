import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
  },
  title: {
    fontSize: 14,
    margin: '10px'

  },
  content: {
    display: 'flex',
    justifyContent: "space-around"
  }
});

export default function TableCard({ className, tableHead, rows, link, onClick, partialFill }) {
  const classes = useStyles();
  console.log(tableHead);

  return (
    <Card>
      <Card className={classes.root}>
        <Divider component="h1" />
        {rows.map((trItem, trId) => (

          <CardContent key={`tr-${trId}`} >
            {tableHead.map((tdItem, tdId) => (
              <Typography component="div" className={classes.content}>
               
               <Box fontWeight="fontWeightLight" m={1}>
                table headings                                            
              </Box>

                <Box key={`td-${tdId}`} fontWeight="fontWeightLight" m={1} className="typography">
                  {trItem[tdItem.key]}
                </Box>
              </Typography>
            ))}
          </CardContent>
        ))}
      </Card>
    </Card>
  );
}
