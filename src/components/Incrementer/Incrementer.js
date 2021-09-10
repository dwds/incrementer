import React from "react";
import PropTypes from 'prop-types';
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

function Incrementer({
    label,
    // id = uuidv4(),
    max = null,
    min = 0,
    onChange = null,
    onDecreaseClick = null,
    onIncreaseClick = null,
    value = 0
}) {
    const classes = useStyles();
    return (
        <FormControl>
            <InputLabel
                className={classes.label}
                shrink={false}>
                {label}
            </InputLabel>
            <div>
                <IconButton
                    color="primary"
                    disabled={value <= min}
                    onClick={onDecreaseClick}>
                    <DecreaseIcon />
                </IconButton>
                <Input
                    classes={{
                        root: classes.input,
                        input: classes.inputElement
                    }}
                    max={max}
                    min={min}
                    onChange={onChange}
                    type="number"
                    value={value}
                />
                <IconButton
                    color="primary"
                    disabled={max && value >= max}
                    onClick={onIncreaseClick}>
                    <IncreaseIcon />
                </IconButton>
            </div>
            <FormHelperText>helper text</FormHelperText>
        </FormControl>
    )
}

Incrementer.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onDecreaseClick: PropTypes.func,
    onIncreaseClick: PropTypes.func,
    value: PropTypes.any
};

export default Incrementer;
