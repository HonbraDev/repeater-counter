import React, { useState } from "react";
import "./App.css";
import {
  Typography,
  Button,
  ButtonGroup,
  TextField,
  Card,
  Divider,
  Grid,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      padding: 20,
    },
    divider: {
      marginLeft: -20,
      marginRight: -20,
      marginTop: 20,
      marginBottom: 20,
    },
    bottomSection: { width: "50%" },
    flexCenter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

function App() {
  const [repeaterCount, setRepeaterCount] = useState(1);
  const classes = useStyles();

  return (
    <div className="App">
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12} className={classes.flexCenter}>
            <Typography variant="body1">
              <Typography variant="h5">The Repeater Calculator</Typography>
            </Typography>
          </Grid>
          <Grid item sm={3} xs={6} className={classes.flexCenter}>
            <Typography variant="body1">
              {repeaterCount * 1} repeater{repeaterCount > 1 ? "s" : ""}
            </Typography>
          </Grid>
          <Grid item sm={3} xs={6} className={classes.flexCenter}>
            <ButtonGroup variant="contained">
              <Button onClick={() => setCount(1)}>△</Button>
              <Button onClick={() => setCount(-1)}>▽</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={2}>
          <Grid item className={classes.bottomSection}>
            <Typography variant="body1">Final ingredients</Typography>
            <Typography variant="body1">{repeaterCount * 3} stone</Typography>
            <Typography variant="body1">
              {repeaterCount * 2} redstone torches
            </Typography>
            <Typography variant="body1">
              {repeaterCount} redstone dust
            </Typography>
          </Grid>
          <Grid item className={classes.bottomSection}>
            <Typography variant="body1">Raw ingredients</Typography>
            <Typography variant="body1">{repeaterCount * 3} stone</Typography>
            <Typography variant="body1">
              {repeaterCount * 1} wooden plank{repeaterCount > 1 ? "s" : ""}
            </Typography>
            <Typography variant="body1">
              {repeaterCount * 3} redstone dust
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <Typography variant="body1">Made by Honbra</Typography>
    </div>
  );

  function setCount(i: number) {
    if (repeaterCount + i > 0) setRepeaterCount(repeaterCount + i);
  }
}

export default App;
