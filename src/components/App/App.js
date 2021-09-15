import React, {useState} from "react";
// import styles from './App.module.css';
import {Incrementer} from "../Incrementer";

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <Incrementer
            error
            helperText="Maximum: 10"
            label="Tickets"
            max={10}
            onChange={handleChange}
            value={value}
        />
    )
}

export default App;
