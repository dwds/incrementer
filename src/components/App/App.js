import React, {useRef, useState} from "react";
// import styles from './App.module.css';
import {Incrementer} from "../Incrementer";
import {PropsTable} from "../PropsTable";
import {DocSection} from "../DocSection";
import {Typography} from "@material-ui/core";

function App() {
    const [value, setValue] = useState(0);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <>
            <Typography component="h1" variant="h3">Incrementer Field</Typography>

            <Typography component="p" variant="subtitle2">An incrementable number input, along with a label and helper text.</Typography>

            <Typography>Intro paragraph</Typography>

            <DocSection title="Demo">
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
            </DocSection>

            <DocSection title="Accessibility">
                <Typography>Accessibility section</Typography>
            </DocSection>

            <DocSection title="States and Variants">
                <Typography>States and variants section</Typography>
            </DocSection>

            <DocSection title="Custom Styling">
                <Typography>Custom Styling section</Typography>
            </DocSection>

            <DocSection>
                <PropsTable />
            </DocSection>
        </>
    )
}

export default App;
