import React, { Component } from "react";
import reactMixin from "react-mixin";
import { Text } from "react-native-elements";
import TimerMixin from "react-timer-mixin";

@reactMixin.decorate(TimerMixin)
export default class TimedUpdater extends Component {
  constructor(props, context) {
    super(props, context);

    this.timer = null;
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.action) {
      switch(nextProps.action) {
      case "START":
        this.start();
        break;

      case "STOP":
        this.stop();
        break;
      }
    }
  }

  render() {
    return null;
  }

  execute = async () => {
    await this.props.update();
    this.timer = this.setTimeout(this.execute, this.props.timeout);
  };

  stop = () => {
    this.clearTimeout(this.timer);
    this.timer = null;
  }

  start = () => {
    if (this.timer === null) {
      this.timer = this.setTimeout(this.execute, this.props.timeout);
    }
  }
}

