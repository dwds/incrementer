import React from "react";
import {IconButton, Input, InputLabel, FormControl, FormHelperText, makeStyles} from "@material-ui/core";
import {AddCircleRounded as IncreaseIcon, RemoveCircleRounded as DecreaseIcon} from "@material-ui/icons";

const useStyles = makeStyles({
  label: {
    position: "static",
    transform: "none"
  },
  input: {
  },
  inputElement: {
      width: "3ch",
      textAlign: "center",
      "-moz-appearance": "textfield",
      "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
      }
  }
});

function App() {
    const classes = useStyles();
    return (
        <FormControl>
            <InputLabel
                className={classes.label}
                shrink={false}>
                Label
            </InputLabel>
            <div>
                <IconButton
                    color="primary">
                    <DecreaseIcon />
                </IconButton>
                <Input
                    classes={{
                        root: classes.input,
                        input: classes.inputElement
                    }}
                    defaultValue={0}
                    type="number"
                />
                <IconButton
                    color="primary">
                    <IncreaseIcon />
                </IconButton>
            </div>
            <FormHelperText>helper text</FormHelperText>
        </FormControl>
    )
}

export default App;
