import React, {useState} from "react";
import styles from './App.module.css';
import {Incrementer} from "../Incrementer";
import {PropsTable} from "../PropsTable";
import {DocSection} from "../DocSection";
import {Link, Typography} from "@material-ui/core";

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <>
            <header className={styles.header}>
                <Typography component="h1" variant="h3">Incrementer Field</Typography>

                <Typography component="p" variant="subtitle2">An incrementable number input, with associated increment buttons, label, and helper text.</Typography>
            </header>

            <Typography gutterBottom>This is a portfolio example of how I might build an accessible input for a component library using React and <Link underline="always" href="https://mui.com/">Material-UI</Link>.</Typography>

            <Typography>The component builds upon the patterns of Material-UI, and comes with additional built-in features like <b>keyboard shortcuts</b>, <b>validation and error messages</b>, recommended <b>WAI-ARIA attributes</b> for <Link underline="always" href="https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton">spinbutton widgets</Link>, a <b>unique id</b> for associating the label/input/helper-text, and <b>fully customizable and themable styling</b>.</Typography>

            <DocSection title="Demo">
                <div className={styles.demo}>
                    <div>
                        <form>
                            <Incrementer
                                helperText="Maximum: 10"
                                label="Tickets"
                                max="10"
                                onChange={handleChange}
                                value={value}
                            />
                        </form>
                        <Typography>Try these shortcuts:</Typography>
                        <ul style={{margin: 0, padding: 0, listStylePosition: "inside"}}>
                            <Typography component="li"><b>Arrow Up/Arrow Down</b>: Increment/decrement by one step</Typography>
                            <Typography component="li"><b>Page Up/Page Down</b>: Increment/decrement by five steps</Typography>
                            <Typography component="li"><b>Home</b>: Set value to minimum</Typography>
                            <Typography component="li"><b>End</b>: Set value to maximum</Typography>
                        </ul>
                    </div>
                    <pre className={styles.codeSample}><code>
{`<Incrementer
    helperText="Maximum: 10"
    label="Tickets"
    max="10"
    onChange={handleChange}
    value={value}
/>`}
                    </code></pre>
                </div>

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
