"use strict";

var React = require("react");
var cloneWithProps = require("react/lib/cloneWithProps");
var MQ = require("mediaquery");

var ResponsiveContainer = React.createClass({
  displayName: "ResponsiveContainer",

  getInitialState: function getInitialState() {
    this.mm = window.matchMedia;

    this.mq = MQ.asArray(this.props.mq);

    return {
      currentMedia: this.mq.reduce(function (prev, next, index, array) {
        if (index === array.length) {
          prev[next[0]] = true;
        } else {
          prev[next[0]] = false;
        }
        return prev;
      }, {})
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.updateMediaQueries();
    var mm = this.mm;
    var mq = this.mq;

    Object.keys(mq).forEach(function (q) {
      mm(mq[q]).addListener(function () {
        _this.updateMediaQueries();
      });
    });
  },

  updateMediaQueries: function updateMediaQueries() {
    var mm = this.mm;
    var mq = this.mq;

    this.setState({
      currentMedia: this.mq.reduce(function (prev, next) {
        prev[next[0]] = mm(next[1]).matches;
        return prev;
      }, {})
    });
  },

  render: function render() {
    return cloneWithProps(React.Children.only(this.props.children), {
      currentMedia: this.state.currentMedia
    });
  }
});

module.exports = ResponsiveContainer;