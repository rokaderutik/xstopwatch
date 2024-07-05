import styles from './/Stopwatch.module.css';
import { useState, useEffect } from 'react';

const Stopwatch = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let intervalId;
        if(isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning((prevValue) => !prevValue);
    };

    function handleReset() {
        setIsRunning(false);
        setElapsedTime(0);
    }

    function formatTime(elapsedTime) {
        const min = Math.floor(elapsedTime / 60);
        const sec = elapsedTime % 60;
        return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    }

    return (
        <div className={styles.stopwatch_wrapper}>
            <h1>Stopwatch</h1>
            <p>Time: {formatTime(elapsedTime)}</p>
            <button onClick={handleStartStop}>
                {isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>
                Reset
            </button>
        </div>
    );
};

export default Stopwatch;