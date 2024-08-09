import { secondsToMinutes } from "../utils/secondsToMinutes";

interface Props {
  mainTime: number;
}

export const Timer = ({ mainTime }: Props) => {
  return <div className="timer">{secondsToMinutes(mainTime)}</div>;
};
