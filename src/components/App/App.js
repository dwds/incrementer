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

            <Typography>The component builds upon the patterns of Material-UI, and comes with additional built-in features like <b>keyboard shortcuts</b>, <b>validation and error messages</b>, recommended <b>WAI-ARIA practices</b> for <Link underline="always" href="https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton">spinbutton widgets</Link>, a <b>unique id</b> for associating the label/input/helper-text, and <b>fully customizable and themable styling</b>.</Typography>

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
                <Typography>The Incrementer component was developed in accordance with the <Link underline="always" href="https://www.w3.org/TR/wai-aria-practices-1.1/#spinbutton">WAI-ARIA Authoring Practices for spinbuttons</Link>.</Typography>
                <ul>
                    <Typography component="li" gutterBottom>
                        The <b>label and helperText are associated with the input</b> via the <code>for</code> and <code>aria-describedby</code> attributes, respectively. This is done with an automatically genrated unique <code>id</code> using <Link underline="always" href="https://github.com/uuidjs/uuid">uuid</Link>. You can pass in your own id instead, if needed.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The <code>&lt;input&gt;</code> element has the <b><code>spinbutton</code> role</b> (inherent to <code>{'<input type="number">'}</code>).
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The <b>aria attributes</b> <code>aria-valuemin</code>, <code>aria-valuemax</code>, and <code>aria-valuenow</code> are automatically applied to the <code>&lt;input&gt;</code> element. If needed, <code>aria-valuetext</code> can be set via the <code>userFriendlyValue</code> prop.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The <b><code>aria-invalid</code></b> attribute is automatically set to <code>true</code> if either the input is invalid due to validation contsraints or the <code>error</code> prop is explicitly set to <code>true</code>.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        <b>Keyboard shortcuts</b>:
                        <ul>
                            <Typography component="li" gutterBottom>Arrow Up: Increase the value by one step.</Typography>
                            <Typography component="li" gutterBottom>Arrow Down: Decrease the value by one step.</Typography>
                            <Typography component="li" gutterBottom>Page Up: Increase the value by five steps (customizable via the <code>stepLarge</code> prop).</Typography>
                            <Typography component="li" gutterBottom>Page Down: Decrease the value by five steps (customizable via the <code>stepLarge</code> prop).</Typography>
                            <Typography component="li" gutterBottom>Home: If the input has a minimum value, set the value to its minimum.</Typography>
                            <Typography component="li" gutterBottom>End: If the input has a maximum value, set the value to its maximum.</Typography>
                        </ul>
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The <b>value may be directly edited</b> via the keyboard.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The increase/decrease buttons excluded from the page <b>Tab sequence</b> because they are redundant with the arrow key support provided to keyboard users.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        <b>Validation constraints</b> (min, max, step, and required) are passed to the <code>&lt;input&gt;</code> element as HTML attributes, making them machine readable for browsers and screen readers.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The input is <b>prevented from being set to an invalid value</b> via the keyboard shortcuts or by activating the increment/decrement buttons. (This relies on the browser&apos;s implmentation of <code>{'<input type="number">'}</code>.) An invalid value may still be typed manually.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        When the value is invalid, a <b>descriptive error message</b> is displayed directly below the input. This relies on the browser&apos;s native HTML validation, which (in modern browsers) provides a dynamic and specific message based on the current value and the constraints. If you would like to customize the error message, you can turn off this feature via the <code>disableBrowserErrorText</code> prop and pass in your own message via <code>helperText</code>.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        The hover, focus, error, and disabled <b>states have distinct styling</b>.
                    </Typography>
                    <Typography component="li" gutterBottom>
                        <b>Conrast of text and border colors</b> has been adjusted, as the Material-UI defaults do not comply with WCAG criteria <Link underline="always" href="https://www.w3.org/TR/WCAG21/#non-text-contrast">1.4.11 Non-text Contrast</Link> or <Link underline="always" href="https://www.w3.org/TR/WCAG21/#contrast-enhanced">1.4.6 Contrast (Enhanced)</Link>
                    </Typography>
                </ul>
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
