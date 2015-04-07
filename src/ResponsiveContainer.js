var React = require('react');
var cloneWithProps = require('react/lib/cloneWithProps');
var MQ = require('mediaquery');

var ResponsiveContainer = React.createClass({
  getInitialState: function () {
    this.mm = window.matchMedia;

    this.mq = MQ.asArray(this.props.mq);

    return {
      currentMedia: this.mq
        .reduce((prev, next, index, array) => {
          if (index === array.length) {
            prev[next[0]] = true;
          } else {
            prev[next[0]] = false;
          }
          return prev;
        }, {})
    };
 },

 componentDidMount: function () {
    this.updateMediaQueries();
    var mm = this.mm;
    var mq = this.mq;

    Object.keys(mq).forEach(q => {
      mm(mq[q]).addListener(() => {
        this.updateMediaQueries();
      });
    });
 },

 updateMediaQueries: function () {
    var mm = this.mm;
    var mq = this.mq;

    this.setState({
      currentMedia: this.mq
        .reduce((prev, next) => {
          prev[next[0]] = mm(next[1]).matches;
          return prev;
        }, {})
    });
 },

 render: function () {
    return cloneWithProps(React.Children.only(this.props.children), {
      currentMedia: this.state.currentMedia
    });
 }
});

module.exports = ResponsiveContainer;
