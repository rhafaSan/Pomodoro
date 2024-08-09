import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";

import { Button } from "./Button";
import { Timer } from "./timer";
import { secondsToTime } from "../utils/secondsToTime";

interface PomodorProps {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export const PomodoroTimer = ({
  pomodoroTime,
  longRestTime,
  shortRestTime,
  cycles,
}: PomodorProps): JSX.Element => {
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [quantityCycles, setQuantityCycles] = useState(
    new Array(cycles - 1).fill(true)
  );

  const [completedCycles, setCompletedCycles] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  const timerTitle = working ? `You're working` : `You're not working`;

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCounting ? 1000 : null
  );

  const handleClick = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(pomodoroTime);
  }, [pomodoroTime]);

  const handleRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      if (long) {
        setMainTime(longRestTime);
      } else setMainTime(shortRestTime);
    },
    [longRestTime, shortRestTime]
  );

  useEffect(() => {
    if (working) document.body.classList.add("working");
    if (resting) document.body.classList.remove("working");
    if (mainTime > 0) return;
    if (working && quantityCycles.length > 0) {
      handleRest(false);
      quantityCycles.pop();
    } else if (working && quantityCycles.length <= 0) {
      handleRest(true);
      setQuantityCycles(new Array(cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }
    if (working) {
      setNumberOfPomodoros(numberOfPomodoros + 1);
    }
    if (resting) handleClick();
  }, [
    working,
    resting,
    mainTime,
    quantityCycles,
    handleClick,
    handleRest,
    cycles,
    completedCycles,
    numberOfPomodoros,
  ]);

  return (
    <div className="pomodoro">
      <h2>{timerTitle}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={handleClick} />
        <Button text="Rest" onClick={() => handleRest(false)} />
        <Button
          className={!working && !resting ? "hidden" : ""}
          text={timeCounting ? "Pause" : "Play"}
          onClick={() => setTimeCounting(!timeCounting)}
        />
      </div>
      <div className="details">
        <p>Ciclos concluídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Número de Pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
};
