"use strict";

var React = require("react");
var cloneWithProps = require("react/lib/cloneWithProps");
var breakPoints = require("./lib/breakpoints");

var ResponsiveContainer = React.createClass({
  displayName: "ResponsiveContainer",

  getInitialState: function getInitialState() {
    this.mm = window.matchMedia;

    this.bp = breakPoints(this.props.bp);

    return {
      isOn: Object.keys(this.bp).reduce(function (prev, next, index, array) {
        if (index === array.length) {
          prev[next] = true;
        } else {
          prev[next] = false;
        }
        return prev;
      }, {})
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.updateMediaQueries();
    var mm = this.mm;
    var bp = this.bp;

    Object.keys(bp).forEach(function (mq) {
      mm(bp[mq]).addListener(function () {
        _this.updateMediaQueries();
      });
    });
  },

  updateMediaQueries: function updateMediaQueries() {
    var mm = this.mm;
    var bp = this.bp;

    this.setState({
      isOn: Object.keys(this.bp).reduce(function (prev, next) {
        prev[next] = mm(bp[next]).matches;
        return prev;
      }, {})
    });
    console.log(this.state);
  },

  render: function render() {
    return cloneWithProps(React.Children.only(this.props.children), {
      isOn: this.state.isOn
    });
  }
});

module.exports = ResponsiveContainer;