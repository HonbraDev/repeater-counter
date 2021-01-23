import React, { useState } from "react";
import "./App.css";
import {
  Typography,
  Button,
  ButtonGroup,
  Card,
  Divider,
  Grid,
  ThemeProvider,
  CssBaseline,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  makeStyles,
  createStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import {
  ArrowUpward,
  ArrowDownward,
  ImportExport,
  Share,
} from "@material-ui/icons";

// JSS styles
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
    planksNote: { textAlign: "center" },
    downloadOverflow: {
      float: "right",
      marginRight: 10,
    },
  })
);

export default function App() {
  /* repeater count hook */
  const [repeaterCount, setRepeaterCount] = useState(1);
  /* JSS import */
  const classes = useStyles();
  /* dark mode */
  const [darkState] = useState(true);
  const palletType = darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  /* component structure */
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        {/* main card */}
        <Card className={classes.card}>
          {/* header */}
          <Grid container spacing={2}>
            {/* logo / title */}
            <Grid item sm={6} xs={12} className={classes.flexCenter}>
              <Typography variant="h5">The Repeater Calculator</Typography>
            </Grid>
            {/* repeater counter */}
            <Grid item sm={3} xs={6} className={classes.flexCenter}>
              <Typography variant="body1">
                {repeaterCount * 1} repeater{repeaterCount > 1 ? "s" : ""}
              </Typography>
            </Grid>
            {/* repeater count control buttons */}
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
          {/* divider */}
          <Divider className={classes.divider} />
          {/* ingredients */}
          <Grid container spacing={2}>
            {/* final ingredients */}
            <Grid item className={classes.bottomSection}>
              <TextOverflow side="final" />
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
            {/* raw ingredients */}
            <Grid item className={classes.bottomSection}>
              <TextOverflow side="raw" />
              <Typography variant="body1">Raw ingredients</Typography>
              <Typography variant="body1">
                {prettyStacks(repeaterCount * 3)} stone
              </Typography>
              <Typography variant="body1">
                {prettyStacks(Math.ceil(repeaterCount / 2) * 2)} wooden planks*
              </Typography>
              <Typography variant="body1">
                {prettyStacks(repeaterCount * 3)} redstone dust
              </Typography>
            </Grid>
          </Grid>
          {/* divider */}
          <Divider className={classes.divider} />
          {/* note about planks */}
          <Typography variant="body1" className={classes.planksNote}>
            *wooden planks are rounded up
          </Typography>
        </Card>
        {/* credit */}
        <Typography variant="body1" className={classes.madeBy}>
          Made by Honbra <br /> Special thanks to the{" "}
          <Link
            href="https://github.com/HonbraDev/repeater-counter/graphs/contributors/"
            color="inherit"
          >
            contributors
          </Link>
          .
        </Typography>
      </div>
    </ThemeProvider>
  );

  /* overflow menu component for downloading / copying the results */
  function TextOverflow(props: { side: "final" | "raw" }) {
    const [anchorEl, setAnchorEl]: [
      EventTarget | null,
      Function
    ] = React.useState(null);

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton
          size="small"
          className={classes.downloadOverflow}
          onClick={handleClick}
        >
          <Share fontSize="small" />
        </IconButton>
        <Menu
          id={`save-menu-${props.side}`}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              copyText(generateText(props.side));
              handleClose();
            }}
          >
            Copy
          </MenuItem>
          <MenuItem
            onClick={() => {
              saveText(generateText(props.side));
              handleClose();
            }}
          >
            Download
          </MenuItem>
        </Menu>
      </>
    );
  }

  /* add to repeater count; used by the buttons and made to prevent negative numbers */
  function addCount(i: number) {
    if (repeaterCount + i > 0) setRepeaterCount(repeaterCount + i);
  }

  /* better formatting */
  function prettyStacks(i: number) {
    return `${Math.floor(i / 64)} x64 + ${i % 64}`;
  }

  /* generate text to save / copy */
  function generateText(side: "final" | "raw") {
    let textToSave = "";
    switch (side) {
      case "final":
        textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
        textToSave += `${prettyStacks(repeaterCount * 2)} redstone torches\n`;
        textToSave += `${prettyStacks(repeaterCount * 1)} redstone dust\n`;
        break;
      case "raw":
        textToSave += `${prettyStacks(repeaterCount * 3)} stone\n`;
        textToSave += `${prettyStacks(
          Math.ceil(repeaterCount / 2) * 2
        )} wooden planks\n`;
        textToSave += `${prettyStacks(repeaterCount * 3)} redstone dust\n`;
        break;
    }
    return textToSave;
  }

  /* saves text generated by generateText */
  function saveText(content: string) {
    const hidden = document.createElement("a");
    hidden.href = "data:attachment/text," + encodeURI(content);
    hidden.target = "_blank";
    hidden.download = `${repeaterCount}_repeater${
      repeaterCount > 1 ? "s" : ""
    }.txt`;
    hidden.click();
  }

  /* copies text generated by generateText */
  function copyText(content: string) {
    navigator.clipboard.writeText(content);
  }

  /* displays an alert box to set the repeater count manually */
  function textBoxInput() {
    /* ok boomer V0W4N */
    const count = prompt("Repeaters", repeaterCount.toString());
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
