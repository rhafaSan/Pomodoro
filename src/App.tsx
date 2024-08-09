import { PomodoroTimer } from "./components/pomodoroTimer";

export const App = () => {
  return (
    <div className="container">
      <PomodoroTimer
        pomodoroTime={10}
        shortRestTime={300}
        longRestTime={900}
        cycles={4}
      />
    </div>
  );
};
