import React from "react";
class Counter extends React.Component {
  state = { number: 0 };

  handleClick = (event) => {
    this.setState(
      {
        number: this.state.number + 1,
      },
      () => {
        console.log("setState1 Callback:", this.state.number);
      }
    );
    console.log("setState1:", this.state.number);
    this.setState(
      {
        number: this.state.number + 1,
      },
      () => {
        console.log("setState2 Callback:", this.state.number);
      }
    );
    console.log("setState2:", this.state.number);
  };

  handleClick2 = (event) => {
    this.setState(
      (prevState) => ({ number: prevState.number + 1 }),
      () => {
        console.log("setState1 Callback:", this.state.number);
      }
    );
    console.log("setState1:", this.state.number);
    this.setState(
      (prevState) => ({ number: prevState.number + 1 }),
      () => {
        console.log("setState2 Callback:", this.state.number);
      }
    );
    console.log("setState2:", this.state.number);
  };

  handleClick3 = (event) => {
    setTimeout(() => {
      this.setState(
        (prevState) => ({ number: prevState.number + 1 }),
        () => {
          console.log("setState1 Callback:", this.state.number);
        }
      );
      console.log("setState1:", this.state.number);
      this.setState(
        (prevState) => ({ number: prevState.number + 1 }),
        () => {
          console.log("setState2 Callback:", this.state.number);
        }
      );
      console.log("setState2:", this.state.number);
    }, 0);
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <p>
          <button onClick={this.handleClick}>+</button>
        </p>
        <p>
          <button onClick={this.handleClick2}>+</button>
        </p>
        <p>
          <button onClick={this.handleClick3}>+</button>
        </p>
      </div>
    );
  }
}

export default Counter;
