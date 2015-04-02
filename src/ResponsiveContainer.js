var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var breakPoints = require('./lib/breakpoints');

var ResponsiveContainer = React.createClass({
  getInitialState: function () {
    this.mm = window.matchMedia;

    this.bp = breakPoints(this.props.bp);

    return {
      isOn: Object.keys(this.bp)
        .reduce(function(prev, next, index, array) {
          if (index === array.length) {
            prev[next] = true;
          } else {
            prev[next] = false;
          }
          return prev;
        }, {})
    };
 },

 componentDidMount: function () {
    this.updateMediaQueries();
    var mm = this.mm;
    var bp = this.bp;

    Object.keys(bp).forEach(mq => {
      mm(bp[mq]).addListener(() => {
        this.updateMediaQueries();
      });
    });
 },

 updateMediaQueries: function () {
    var mm = this.mm;
    var bp = this.bp;

    this.setState({
      isOn: Object.keys(this.bp)
        .reduce((prev, next) => {
          prev[next] = mm(bp[next]).matches;
          return prev;
        }, {})
    });
 },

 render: function () {
    return cloneWithProps(React.Children.only(this.props.children), {
      isOn: this.state.isOn
    });
 }
});

module.exports = ResponsiveContainer;
