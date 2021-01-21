import React, { useState } from "react";
import "./App.css";
import {
  Typography,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  Switch,
  ThemeProvider,
  Container,
  CssBaseline,
} from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { ArrowUpward, ArrowDownward, ImportExport } from "@material-ui/icons";

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
    madeBy: {
      margin: 10,
    },
    darkMode: {
      marginLeft: 10,
      marginTop: 10,
    },
  })
);

function App() {
  const [repeaterCount, setRepeaterCount] = useState(1);
  const classes = useStyles();
  const [darkState, setDarkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container>
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
                  <Button onClick={() => addCount(1)}>
                    <ArrowUpward />
                  </Button>
                  <Button onClick={() => addCount(-1)}>
                    <ArrowDownward />
                  </Button>
                  <Button onClick={textBoxInput}>
                    <ImportExport />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
            <Grid container spacing={2}>
              <Grid item className={classes.bottomSection}>
                <Typography variant="body1">Final ingredients</Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} stone
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 2)} redstone torches
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 1)} redstone dust
                </Typography>
              </Grid>
              <Grid item className={classes.bottomSection}>
                <Typography variant="body1">Raw ingredients</Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} stone
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 1)} wooden plank
                  {repeaterCount > 1 ? "s" : ""}
                </Typography>
                <Typography variant="body1">
                  {prettyStacks(repeaterCount * 3)} redstone dust
                </Typography>
              </Grid>
            </Grid>
          </Card>
          <div className={classes.darkMode}>
            <Typography variant="body1">
              <label htmlFor="darkmode">Dark mode</label>
              <Switch
                checked={darkState}
                onChange={handleThemeChange}
                id="darkmode"
              />
            </Typography>
          </div>
          <Typography variant="body1" className={classes.madeBy}>
            Made by Honbra <br /> Special thanks to Tokfrans03 for the item
            displays
          </Typography>
        </div>
      </Container>
    </ThemeProvider>
  );

  function addCount(i: number) {
    if (repeaterCount + i > 0) setRepeaterCount(repeaterCount + i);
  }

  function prettyStacks(i: number) {
    // thanks Tokfrans03
    return `${Math.floor(i / 64)} x64 + ${i % 64}`;
  }

  function textBoxInput() {
    // ok boomer w0w4n
    var count = prompt("Repeaters", repeaterCount.toString());

    if (
      count == null ||
      count === "" ||
      isNaN(parseInt(count)) ||
      parseInt(count) < 1
    ) {
    } else {
      setRepeaterCount(parseInt(count));
    }
  }
}

export default App;
