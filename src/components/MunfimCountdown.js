import { useCountdown } from "../useCountdown";

const MunfimCountdown = () => {
  // const [days, hours, minutes, seconds] = useCountdown(
  //   `${new Date().getMonth() + 1} ${
  //     new Date().getDate() + 20
  //   } , ${new Date().getFullYear()} 00:00:00`
  // );
  const days = 5;
  const hours = 13;
  const minutes = 12;
  const seconds = 54;
  return (
    <ul className="count-down mt-35">
      <li>
        <span id="days">{days > 9 ? days : `0${days}`}</span>days
      </li>
      <li>
        <span id="hours">{hours > 9 ? hours : `0${hours}`}</span>Hours
      </li>
      <li>
        <span id="minutes">{minutes > 9 ? minutes : `0${minutes}`}</span>Minutes
      </li>
      <li>
        <span id="seconds">{seconds > 9 ? seconds : `0${seconds}`}</span>Seconds
      </li>
    </ul>
  );
};
export default MunfimCountdown;
