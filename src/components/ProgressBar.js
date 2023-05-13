import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProgressBar = ({ value, color, extraCls }) => {
  return (
    <div
      className={`progress-content ${extraCls ? extraCls : "one"}`}
      style={{ width: 140, height: 140 }}
    >
      <h2>{value}%</h2>
      <CircularProgressbar
        width={140}
        value={value}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: color,
        })}
      />
    </div>
  );
};
export default ProgressBar;
