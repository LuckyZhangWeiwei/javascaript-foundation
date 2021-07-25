import { useState } from "react";

const ClosureTrap2 = function () {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }

  return (
    <div>
      <span>{count}</span>
      <button onClick={handleClickAsync}>+</button>
    </div>
  );
};

export default ClosureTrap2;
