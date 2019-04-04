import React from "react";
import LinkListItem from "./LinkListItem";

const LinkList = props => {
  if (props.history.length < 1) {
    return null;
  }

  let fixedHistory = props.history.slice();

  const links = fixedHistory
    .reverse()
    .slice(0, 5)
    .map(link => {
      return (
        <LinkListItem
          key={link.hash}
          longURL={link.longURL}
          shortURL={link.shortURL}
          pageTitle={link.pageTitle}
        />
      );
    });

  return <div className="list-group mt-n5">{links}</div>;
};

export default LinkList;
