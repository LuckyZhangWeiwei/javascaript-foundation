// https://zhuanlan.zhihu.com/p/127255755
{
  function useState(initialValue) {
    var _val = initialValue;
    function state() {
      return _val;
    }
    function setState(newValue) {
      _val = newValue;
    }
    return [state, setState];
  }

  /**************************** */
  var [foo, setFoo] = useState(0); // 数组解构
  console.log(foo()); // 打印 0 - initialValue（初始值）
  setFoo(1); // 在useState作用域内设置_val的值
  console.log(foo()); // 打印 1 - 虽然调用同一个方法，但返回新的 initialValue
  /**************************** */
  function Counter() {
    const [count, setCount] = useState(0);
    return {
      click: () => setCount(count() + 1),
      render: () => console.log("render:", { count: count() }),
    };
  }
  const c = Counter();
  c.render();
  c.click();
  c.render();
}
{
  function useState(initialValue) {
    var _val = initialValue;
    function setState(newValue) {
      _val = newValue;
    }
    return [_val, setState];
  }
  var [foo, setFoo] = useState(0);
  console.log(foo);
  setFoo(1);
  console.log(foo);
}
{
  const myReact = (function () {
    let _val;
    return {
      render(Component) {
        const Comp = Component();
        Comp._render();
        return Comp;
      },
      useState(initialValue) {
        _val = _val || initialValue;
        function setState(newVal) {
          _val = newVal;
        }
        return [_val, setState];
      },
    };
  })();

  function Counter() {
    const [count, setCount] = myReact.useState(0); // 闭包
    return {
      click: () => setCount(count + 1),
      _render: () => console.log("render:", { count }),
    };
  }

  let App;
  App = myReact.render(Counter); // render: { count: 0 }
  App.click();
  App = myReact.render(Counter); // render: { count: 1 }
  App.click();
  App = myReact.render(Counter); // render: { count: 2 }
}
