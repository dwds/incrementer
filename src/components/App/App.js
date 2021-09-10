import React, {useState} from "react";
// import styles from './App.module.css';
import {Incrementer} from "../Incrementer";

const INCREMENT = 1;

function App() {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleDecreaseClick = () => {
        setValue(prevValue => prevValue - INCREMENT);
    }

    const handleIncreaseClick = () => {
        setValue(prevValue => prevValue + INCREMENT);
    }

    return (
        <Incrementer
            label="Incrementer"
            onChange={handleChange}
            onDecreaseClick={handleDecreaseClick}
            onIncreaseClick={handleIncreaseClick}
            value={value}
        />
    )
}

export default App;
