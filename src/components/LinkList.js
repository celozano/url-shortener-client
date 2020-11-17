import React from "react";
import { Card, CardContent } from "@material-ui/core";
import LinkListItem from "./LinkListItem";

const LinkList = ({ history }) => {
  if (history.length < 1) {
    return null;
  }

  const list = history.slice(0, 5).map((link, i) => {
    const { hash, longURL, shortURL, pageTitle } = link;

    return (
      <LinkListItem
        id={hash + i}
        key={hash + i}
        longURL={longURL}
        shortURL={shortURL}
        pageTitle={pageTitle}
        hasDivider={history.length > 1 && i !== 0}
      />
    );
  });

  return (
    <Card variant="outlined">
      <CardContent>{list}</CardContent>
    </Card>
  );
};

export default LinkList;
