import React from "react"
import Toc from "./blog-toc"
import { throttle } from "lodash"

class ScrollSyncToc extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
        activeItemIds = [],
        itemTopOffsets: [],
    }

    this.calculateItemTopOffsets = this.calculateItemTopOffsets.bind(this);
  }

  componentDidMount() {
    this.calculateItemTopOffsets();

    window.addEventListener(`resize`, this.handleResize);
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`resize`, this.handleResize);
    window.removeEventListener(`scroll`, this.handleScroll);
  }

  calculateItemTopOffsets() {
  }
}
