import { useEffect, useState } from "react";
const munfirmSlider = () => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      // 2 => total slider item
      setActive((prevState) => (active == 2 ? 1 : prevState + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [active]);
  return { active, setActive };
};
export default munfirmSlider;
