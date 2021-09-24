import React, {useRef, useState} from "react";
// import styles from './App.module.css';
import {Incrementer} from "../Incrementer";
import {PropsTable} from "../PropsTable";
import {Typography} from "@material-ui/core";

function App() {
    const [value, setValue] = useState(0);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <>
            <Typography component="h1" variant="h3">Incrementer Component</Typography>
            <form>
                <Incrementer
                    inputRef={inputRef}
                    helperText="Maximum: 10"
                    label="Tickets"
                    max="1000"
                    step="2"
                    onChange={handleChange}
                    value={value}
                />
                <button type="submit">Submit</button>
            </form>

            <PropsTable />
        </>
    )
}

export default App;
