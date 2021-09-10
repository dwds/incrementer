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

function simulateChange(input, onChange) {
    const forcedChangeEvent = new Event("change");
    input.dispatchEvent(forcedChangeEvent);
    onChange?.(forcedChangeEvent);
}

function Incrementer({
    label,
    id = useRef(uuidv4()).current,
    helperText = null,
    max = null,
    min = 0,
    onChange = null,
    step = 1,
    value = 0
}) {
    const inputRef = useRef(null);
    const classes = useStyles();
    const helperTextId = helperText && id ? `${id}-helper-text` : null;

    const handleDecreaseClick = () => {
        inputRef.current?.stepDown();
        simulateChange(inputRef.current, onChange)
    }

    const handleIncreaseClick = () => {
        inputRef.current?.stepUp();
        simulateChange(inputRef.current, onChange)
    }

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
                    onClick={handleDecreaseClick}>
                    <DecreaseIcon />
                </IconButton>
                <Input
                    aria-describedby={helperTextId}
                    classes={{
                        root: classes.input,
                        input: classes.inputElement
                    }}
                    id={id}
                    inputProps={{
                        max,
                        min,
                        step
                    }}
                    onChange={onChange}
                    inputRef={inputRef}
                    type="number"
                    value={value}
                />
                <IconButton
                    color="primary"
                    disabled={max && value >= max}
                    onClick={handleIncreaseClick}>
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
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.any
};

export default Incrementer;
