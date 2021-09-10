import React from "react";
import {IconButton, OutlinedInput, InputLabel, FormControl, FormHelperText, makeStyles} from "@material-ui/core";
import {AddCircleRounded as IncreaseIcon, RemoveCircleRounded as DecreaseIcon} from "@material-ui/icons";

const useStyles = makeStyles({
  label: {
    position: "static",
    transform: "none"
  },
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
                <IconButton>
                    <DecreaseIcon />
                </IconButton>
                <OutlinedInput />
                <IconButton>
                    <IncreaseIcon />
                </IconButton>
            </div>
            <FormHelperText>helper text</FormHelperText>
        </FormControl>
    )
}

export default App;
