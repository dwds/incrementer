import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {IconButton, InputAdornment, Input, InputLabel, FormControl, FormHelperText, makeStyles} from "@material-ui/core";
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

function Incrementer({
    label,
    className: classNameProp = null,
    DecreaseIconButtonProps = null,
    error = false,
    FormHelperTextProps = null,
    id = useRef(uuidv4()).current,
    IncreaseIconButtonProps = null,
    InputLabelProps = null,
    InputProps = null,
    helperText = null,
    max = null,
    min = 0,
    onChange = null,
    step = 1,
    stepLarge = 5,
    value = 0,
    ...other
}) {
    const inputRef = useRef(null);
    const classes = useStyles();
    const helperTextId = helperText && id ? `${id}-helper-text` : null;
    const {inputProps: inputElementProps, ...InputComponentProps} = InputProps || {};

    const handleDecreaseClick = () => {
        inputRef.current?.stepDown();
        simulateChange(inputRef.current, onChange);
    }

    const handleIncreaseClick = () => {
        inputRef.current?.stepUp();
        simulateChange(inputRef.current, onChange);
    }

    const handleKeyDown = (event) => {
        if(inputRef.current) {
            let preventDefault = false;
            let simulateChange = false;
            switch (event.code) {
                case "PageDown":
                    inputRef.current.stepDown(stepLarge);
                    simulateChange = true;
                    preventDefault = true;
                    break;
                case "PageUp":
                    inputRef.current.stepUp(stepLarge);
                    simulateChange = true;
                    preventDefault = true;
                    break;
                case "Home":
                    if(min) {
                        inputRef.current.value = min;
                        simulateChange = true;
                    }
                    preventDefault = true;
                    break;
                case "End":
                    if(max) {
                        inputRef.current.value = max;
                        simulateChange = true;
                    }
                    preventDefault = true;
                    break;
                default:
                    break;
            }
            if (preventDefault) {
                event.preventDefault();
                event.stopPropagation();
            }
            if (simulateChange) {
                simulateChange(inputRef.current, onChange);
            }
        }
    }

    return (
        <FormControl
            error={error}
            className={[classes.root, classNameProp].join(" ")}
            {...other}>
            <InputLabel
                className={classes.label}
                disableAnimation
                htmlFor={id}
                {...InputLabelProps}>
                {label}
            </InputLabel>
            <div className={classes.spinbuttonContainer}>
                <Input
                    aria-describedby={helperTextId}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-valuenow={value}
                    classes={{
                        root: classes.input,
                        input: classes.inputElement
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={`Increase ${label}`}
                                className={[classes.incrementButton, classes.increaseButton].join(" ")}
                                color="primary"
                                disabled={max && value >= max}
                                disableRipple
                                edge="end"
                                onClick={handleIncreaseClick}
                                tabIndex={-1}
                                {...IncreaseIconButtonProps}>
                                <IncreaseIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    id={id}
                    inputProps={{
                        max,
                        min,
                        step,
                        ...inputElementProps
                    }}
                    inputRef={inputRef}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                aria-label={`Decrease ${label}`}
                                className={[classes.incrementButton, classes.decreaseButton].join(" ")}
                                color="primary"
                                disabled={value <= min}
                                disableRipple
                                edge="start"
                                onClick={handleDecreaseClick}
                                tabIndex={-1}
                                {...DecreaseIconButtonProps}>
                                <DecreaseIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    type="number"
                    value={value}
                    {...InputComponentProps}
                />
            </div>
            {helperText &&
                <FormHelperText
                    className={classes.helperText}
                    id={helperTextId}
                    {...FormHelperTextProps}>
                    {helperText}
                </FormHelperText>
            }
        </FormControl>
    )
}

Incrementer.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    DecreaseIconButtonProps: PropTypes.object,
    error: PropTypes.bool,
    FormHelperTextProps: PropTypes.object,
    id: PropTypes.string,
    IncreaseIconButtonProps: PropTypes.object,
    InputLabelProps: PropTypes.object,
    InputProps: PropTypes.object,
    helperText: PropTypes.string,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onDecreaseClick: PropTypes.func,
    onIncreaseClick: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stepLarge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.any
};

export default Incrementer;
