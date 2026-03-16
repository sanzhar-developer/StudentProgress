import { useEffect, useState } from "react";
import Counter from "../Counter/Counter";

function StateExample() {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("bam");
        }, 1000)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <>
            <h1>TIMER</h1>
            <Counter mansur={counter}></Counter>
            <button onClick={() => setCounter(counter + 1)}>Кнопка</button>
        </>
    )
}

export default StateExample;