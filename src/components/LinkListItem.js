import React from "react";

const LinkListItem = props => {
  function handleLinkProtocol(longURL) {
    let redirectLink =
      longURL.includes("http://") || longURL.includes("https://")
        ? longURL
        : `http://${longURL}`;

    return redirectLink;
  }

  return (
    <div className="list-group-item">
      <ul className="list-unstyled mb-0">
        <li>{props.pageTitle}</li>
        <li className="pb-2">
          <a
            href={handleLinkProtocol(props.longURL)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <small className="text-muted">{props.longURL}</small>
          </a>
        </li>
        <li className="text-info">{props.shortURL}</li>
      </ul>
    </div>
  );
};

export default LinkListItem;
