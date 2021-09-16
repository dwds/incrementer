import React, {useRef, useState} from "react";
// import styles from './App.module.css';
import {Incrementer} from "../Incrementer";

function App() {
    const [value, setValue] = useState(0);
    const inputRef = useRef(null);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleClick = () => {
        inputRef.current.focus();
    }

    return (
        <>
        <Incrementer
            inputRef={inputRef}
            helperText="Maximum: 10"
            label="Tickets"
            max="10"
            onChange={handleChange}
            value={value}
        />

        <button onClick={handleClick}>Focus</button>
        </>
    )
}

export default App;
