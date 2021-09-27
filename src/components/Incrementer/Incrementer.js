import React, {forwardRef, useEffect, useRef} from "react";
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {IconButton, InputAdornment, TextField, makeStyles} from "@material-ui/core";
import {AddCircleRounded as DefaultIncreaseIcon, RemoveCircleRounded as DefaultDecreaseIcon} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: props => props.fullWidth  ? null : `calc(${props.max.toString().length}ch + 125px)`,
        color: theme.palette.text.primary,
    },
    helperText: {
        color: "inherit"
    },
    inputElement: {
        textAlign: "center",
        "-moz-appearance": "textfield",
        "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0
        }
    },
    inputRoot: {
        color: "inherit"
    },
    label: {
        color: "inherit"
    },
    outline: {
        color: "inherit",
        borderColor: "currentColor"
    }
}));

function useForwardedRef(ref) {
    const innerRef = useRef(null);
    useEffect(() => {
        if(!ref) return;
        if(typeof ref === "function") {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });
    return innerRef;
}

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

const Incrementer = forwardRef(({
    label,
    error = false,
    decreaseIcon: DecreaseIcon = DefaultDecreaseIcon,
    disableBrowserErrorText = false,
    disabled = false,
    FormHelperTextProps = null,
    fullWidth = false,
    helperText = null,
    id = useRef(uuidv4()).current,
    increaseIcon: IncreaseIcon = DefaultIncreaseIcon,
    InputLabelProps = null,
    inputProps = null,
    InputProps = null,
    inputRef = null,
    max = null,
    min = 0,
    onChange = null,
    step = 1,
    stepLarge = 5,
    userFriendlyValue = null,
    value = "0",
    ...other
}, ref) => {
    const classes = useStyles({fullWidth, max});
    const innerInputRef = useForwardedRef(inputRef);
    const htmlInvalid = innerInputRef.current && !innerInputRef.current.validity.valid;

    const handleIncrement = (direction: "increase", stepMultiplier: 1) => () => {
        switch (direction) {
            case "increase":
                innerInputRef.current?.stepUp(stepMultiplier);
                break;
            case "decrease":
                innerInputRef.current?.stepDown(stepMultiplier);
                break;
            default:
                break;
        }
        simulateChange(innerInputRef.current, onChange);
    }

    const handleInvalid = event => {
        disableBrowserErrorText && event.preventDefault();
    }

    const handleKeyDown = event => {
        if(innerInputRef.current && Object.values(SHORTCUT_KEYS).includes(event.code)) {
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
                        innerInputRef.current.value = max;
                        simulateChange(innerInputRef.current, onChange);
                    }
                    break;
                case SHORTCUT_KEYS.GO_TO_MIN:
                    if(isNumbery(min)) {
                        innerInputRef.current.value = min;
                        simulateChange(innerInputRef.current, onChange);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <TextField
            classes={{
                root: classes.root
            }}
            disabled={disabled}
            error={error || htmlInvalid}
            id={id}
            FormHelperTextProps={{
                classes: {
                    root: classes.helperText
                },
                ...FormHelperTextProps
            }}
            fullWidth={fullWidth}
            helperText={(!disableBrowserErrorText && htmlInvalid && innerInputRef.current.validationMessage) || helperText}
            InputLabelProps={{
                classes: {
                    root: classes.label
                },
                ...InputLabelProps
            }}
            inputProps={{
                "aria-invalid": error || htmlInvalid,
                "aria-valuemin": min,
                "aria-valuemax": max,
                "aria-valuenow": value,
                "aria-valuetext": userFriendlyValue,
                max,
                min,
                onInvalid: handleInvalid,
                onKeyDown: handleKeyDown,
                step,
                ...inputProps
            }}
            InputProps={{
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputElement,
                    notchedOutline: classes.outline,
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
                ...InputProps
            }}
            inputRef={innerInputRef}
            label={label}
            onChange={onChange}
            ref={ref}
            type="number"
            value={value}
            variant="outlined"
            {...other}
        />
    )
});

Incrementer.propTypes = {
    label: PropTypes.string.isRequired,
    decreaseIcon: PropTypes.node,
    disableBrowserErrorText: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    FormHelperTextProps: PropTypes.object,
    fullWidth: PropTypes.bool,
    helperText: PropTypes.node,
    id: PropTypes.string,
    increaseIcon: PropTypes.node,
    InputLabelProps: PropTypes.object,
    inputProps: PropTypes.object,
    InputProps: PropTypes.object,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({current: PropTypes.any})]),
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stepLarge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    userFriendlyValue: PropTypes.string,
    value: PropTypes.any
};

export default Incrementer;
