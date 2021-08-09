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
    console.log("count in Counter:", count);
    return {
      click: () => setCount(count + 1),
      _render: () => console.log("render:", { count }),
    };
  }

  let App;
  App = myReact.render(Counter); // render: { count: 0 }
  App.click();
  // App = myReact.render(Counter); // render: { count: 1 }
  // App.click();
  // App = myReact.render(Counter); // render: { count: 2 }
}
{
  const MyReact = (function () {
    let _val, _deps;
    return {
      render(Component) {
        const Comp = Component();
        Comp.render();
        return Comp;
      },
      useEffect(callback, depArray) {
        const hasNoDeps = !depArray;
        const hasChangedDeps = _deps
          ? !depArray.every((el, i) => el === _deps[i])
          : true;
        if (hasNoDeps || hasChangedDeps) {
          callback();
          _deps = depArray;
        }
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
    const [count, setCount] = MyReact.useState(0);

    // MyReact.useEffect(() => {
    //   console.log("effect", count);
    // }, [count]);

    MyReact.useEffect(() => {
      setInterval(() => {
        console.log("effect", count);
      }, 1000);
    }, [count]);

    return {
      click: () => setCount(count + 1),
      noop: () => setCount(count),
      render: () => console.log("render", { count }),
    };
  }
  let App;
  App = MyReact.render(Counter);
  // effect 0
  // render {count: 0}
  App.click();
  App = MyReact.render(Counter);
  // effect 1
  // render {count: 1}
  // App.noop();
  // App = MyReact.render(Counter);
  // // no effect run
  // render {count: 1}
  // App.click();
  // App = MyReact.render(Counter);
  // effect 2
  // render {count: 2}
}
