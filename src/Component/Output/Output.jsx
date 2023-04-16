import { useEffect, useState } from "react";
import "./Output.scss";

const Output = (props) => {
  const { time, text } = props;
  const [timeState, setTimeState] = useState(0);

  useEffect(() => {
    for (let i = 0; i <= time; i++) {
      setTimeout(() => {
        setTimeState(i);
      }, 10 * i);
    }

  }, [time]);

  return (
    <div className="output">
      <p className="output__text">
        <span className="time">
          {timeState < 10 ? `0${timeState}` : timeState}
        </span>
        {text}
      </p>
    </div>
  );
};

Output.defaultProps = {
  text: "Output",
  time: "0",
};

export default Output;
