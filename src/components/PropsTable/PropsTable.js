import React from "react";
// import styles from './App.module.css';
import {Link, Typography, Table, TableHead, TableBody, TableRow, TableCell} from "@material-ui/core";

const INCREMENTER_PROPS = [
    {
        name: "decreaseIcon",
        type: "node",
        default: "<RemoveCircleRounded>",
        description: "The icon component to use for the decrease button."
    },
    {
        name: "disableBrowserErrorText",
        type: "boolean",
        default: "false",
        description: "By default, the helperText will display the native browser error message when the input is in an invalid state. If true, this feature will be disabled."
    },
    {
        name: "increaseIcon",
        type: "node",
        default: "<AddCircleRounded>",
        description: "The icon component to use for the increase button."
    },
    {
        name: "label",
        type: "string",
        description: "The input's label. This is required for accessibility."
    },
    {
        name: "max",
        type: "number or string",
        default: "null",
        description: "The maximum valid value."
    },
    {
        name: "min",
        type: "number or string",
        default: "0",
        description: "The minimum valid value."
    },
    {
        name: "step",
        type: "number or string",
        default: "1",
        description: "The amount to increase or decrease the value with each increment. Also determines (along with min), what values are valid."
    },
    {
        name: "stepLarge",
        type: "number or string",
        default: "5",
        description: "The amount to increase or decrease the value (as a multiple of step) when the value is incremented with the PgUp and PgDn keys."
    },
    {
        name: "userFriendlyValue",
        type: "string",
        default: "null",
        description: "Used to provide aria-valuetext to the input element. This is only necessary if the numeric value represents another, more readable, value, like the name of a month."
    },
    {
        name: "value",
        type: "any",
        default: '"0"',
        description: "The value of the input."
    }

];

function PropsTable() {
    return (
        <>
            <Typography component="h2" variant="h4" id="props-table-label">Props</Typography>

            <Table aria-labeledby="props-table-label">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Default</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {INCREMENTER_PROPS.map(prop => (
                        <TableRow key={prop.name}>
                            <TableCell>
                                <code>{prop.name}</code>
                            </TableCell>
                            <TableCell>
                                <code>{prop.type}</code>
                            </TableCell>
                            <TableCell>
                                {prop.default ? <code>{prop.default}</code> : ""}
                            </TableCell>
                            <TableCell>
                                {prop.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Typography>Any other props supplied will be provided to the root element (<Link underline="always" href="https://v4.mui.com/api/text-field/">TextField</Link>).</Typography>
        </>
    )
}

export default PropsTable;
