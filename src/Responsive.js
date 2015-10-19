import React, { Component } from 'react';
import MQ from 'mediaquery';

function Responsive(Element) {
  return class ResponsiveComponent extends Component {
    constructor(props) {
      super();
      const mq = MQ.asArray(props.mq);

      this.state = {
        mm: window.matchMedia,
        mq: mq,
        currentMedia: mq
          .reduce((prev, next, index, array) => {
            if (index === array.length) {
              prev[next[0]] = true;
            } else {
              prev[next[0]] = false;
            }
            return prev;
          }, {})
      };
    }

    componentDidMount() {
      this.updateMediaQueries();
      const { mm, mq } = this.state;

      Object.keys(mq).forEach(q => {
        mm(mq[q]).addListener(() => {
          this.updateMediaQueries();
        });
      });
    }

    updateMediaQueries() {
      const { mm, mq } = this.state;

      this.setState({
        currentMedia: mq
          .reduce((prev, next) => {
            prev[next[0]] = mm(next[1]).matches;
            return prev;
          }, {})
      });
    }

    render() {
      return <Element {...this.props} currentMedia={this.state.currentMedia} />;
    }
  };
}

export default Responsive;
