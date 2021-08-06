import { useEffect, useState } from "react";

const ClosureTrap = function () {
  const [count, setCount] = useState(0);
  // console.log("count:", count);
  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setCount(count + 1);
  //     console.log("count in useEffect:", count);
  //   }, 10000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [count]);
  // useEffect(() => {
  //   setInterval(() => {
  //     setCount((count) => count + 1);
  //     console.log("count in useEffect:", count);
  //   }, 10000);
  // }, []);
  const handleClick = () => {
    setCount(count + 1);
    // setCount(count + 1);
    console.log("count in handleClick:", count);
  };
  return (
    <div>
      <span>{count}</span>
      <button onClick={handleClick}>+</button>
    </div>
  );
};

export default ClosureTrap;
