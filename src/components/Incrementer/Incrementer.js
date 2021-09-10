import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
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
    id = useRef(uuidv4()).current,
    helperText = null,
    max = null,
    min = 0,
    onChange = null,
    onDecreaseClick = null,
    onIncreaseClick = null,
    value = 0
}) {
    const classes = useStyles();
    const helperTextId = helperText && id ? `${id}-helper-text` : null;
    return (
        <FormControl>
            <InputLabel
                className={classes.label}
                disableAnimation
                htmlFor={id}>
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
                    aria-describedby={helperTextId}
                    classes={{
                        root: classes.input,
                        input: classes.inputElement
                    }}
                    id={id}
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
            {helperText &&
                <FormHelperText
                    id={helperTextId}>
                    {helperText}
                </FormHelperText>
            }
        </FormControl>
    )
}

Incrementer.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string,
    helperText: PropTypes.string,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onDecreaseClick: PropTypes.func,
    onIncreaseClick: PropTypes.func,
    value: PropTypes.any
};

export default Incrementer;
