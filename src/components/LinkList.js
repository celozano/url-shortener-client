import React from "react";
import LinkListItem from "./LinkListItem";

class LinkList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.history.length !== this.props.history.length) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.history.length < 1) {
      return null;
    }

    return this.props.history.slice(0, 5).map((link, i) => {
      return (
        <LinkListItem
          id={link.hash + i}
          key={link.hash + i}
          longURL={link.longURL}
          shortURL={link.shortURL}
          pageTitle={link.pageTitle}
        />
      );
    });
  }
}

export default LinkList;
