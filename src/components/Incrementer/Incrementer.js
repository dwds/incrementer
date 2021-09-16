import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {IconButton, InputAdornment, TextField, makeStyles} from "@material-ui/core";
import {AddCircleRounded as IncreaseIcon, RemoveCircleRounded as DecreaseIcon} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary
    },
    helperText: {
        color: "inherit"
    },
    inputElement: {
        width: "2ch",
        textAlign: "center",
        "-moz-appearance": "textfield",
        "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
    label: {
        position: "static",
        transform: "none",
        color: "inherit"
    }
}));

function simulateChange(input, onChange) {
    if(input) {
        const forcedChangeEvent = new Event("change"); // eslint-disable-line no-undef
        input.dispatchEvent(forcedChangeEvent);
        onChange?.(forcedChangeEvent);
    }
}

function isNumbery(value) {
    return (typeof value === "number" || typeof value === "string") && !isNaN(value);
}


const SHORTCUT_KEYS = {
    LARGE_STEP_INCREASE: "PageUp",
    LARGE_STEP_DECREASE: "PageDown",
    GO_TO_MAX: "End",
    GO_TO_MIN: "Home"
};

function Incrementer({
    label,
    disabled = false,
    id = useRef(uuidv4()).current,
    inputProps = null,
    InputProps = null,
    max = null,
    min = 0,
    onChange = null,
    onKeyDown = null,
    step = 1,
    stepLarge = 5,
    value = "0",
    ...other
}) {
    const inputRef = useRef(null);
    const classes = useStyles();

    const handleIncrement = (direction: "increase", stepMultiplier: 1) => () => {
        switch (direction) {
            case "increase":
                inputRef.current?.stepUp(stepMultiplier);
                break;
            case "decrease":
                inputRef.current?.stepDown(stepMultiplier);
                break;
            default:
                break;
        }
        simulateChange(inputRef.current, onChange);
    }

    const handleKeyDown = (event) => {
        if(inputRef.current && Object.values(SHORTCUT_KEYS).includes(event.code)) {
            event.preventDefault();
            event.stopPropagation();
            switch (event.code) {
                case SHORTCUT_KEYS.LARGE_STEP_INCREASE:
                    handleIncrement("increase", stepLarge)();
                    break;
                case SHORTCUT_KEYS.LARGE_STEP_DECREASE:
                    handleIncrement("decrease", stepLarge)();
                    break;
                case SHORTCUT_KEYS.GO_TO_MAX:
                    if(isNumbery(max)) {
                        inputRef.current.value = max;
                        simulateChange(inputRef.current, onChange);
                    }
                    break;
                case SHORTCUT_KEYS.GO_TO_MIN:
                    if(isNumbery(min)) {
                        inputRef.current.value = min;
                        simulateChange(inputRef.current, onChange);
                    }
                    break;
                default:
                    break;
            }
        }
        onKeyDown?.();
    }

    const {classes: InputClasses, ...otherInputProps} = InputProps || {};

    return (
        <TextField
            disabled={disabled}
            id={id}
            onKeyDown={handleKeyDown}
            label={label}
            inputProps={{
                "aria-valuemin": min,
                "aria-valuemax": max,
                "aria-valuenow": value,
                max,
                min,
                step,
                ...inputProps
            }}
            InputProps={{
                classes: {
                    input: classes.inputElement,
                    ...InputClasses
                },
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={`Increase ${label}`}
                            className={[classes.incrementButton, classes.increaseButton].join(" ")}
                            color="primary"
                            disabled={disabled || isNumbery(max) && Number(value) >= Number(max)}
                            disableRipple
                            edge="end"
                            onClick={handleIncrement("increase")}
                            tabIndex={-1}>
                            <IncreaseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                startAdornment: (
                    <InputAdornment position="start">
                        <IconButton
                            aria-label={`Decrease ${label}`}
                            className={[classes.incrementButton, classes.decreaseButton].join(" ")}
                            color="primary"
                            disabled={disabled || isNumbery(min) && Number(value) <= Number(min)}
                            disableRipple
                            edge="start"
                            onClick={handleIncrement("decrease")}
                            tabIndex={-1}>
                            <DecreaseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
                ...otherInputProps
            }}
            inputRef={inputRef}
            onChange={onChange}
            type="number"
            value={value}
            variant="outlined"
            {...other}
        />
    )
}

Incrementer.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    inputProps: PropTypes.object,
    InputProps: PropTypes.object,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stepLarge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.any
};

export default Incrementer;
