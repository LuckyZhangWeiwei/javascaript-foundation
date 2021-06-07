import { useState, memo } from "react";

const Child = memo((props) => {
  console.log("child");
  return <div>child</div>;
});

const Parent = (props) => {
  const [num, setNum] = useState(0);
  return (
    <div>
      <div>
        <button onClick={() => setNum(num + 1)}>+</button>
        <p>{num}</p>
      </div>
	  <Child />
    </div>
  );
};

export default Parent;
