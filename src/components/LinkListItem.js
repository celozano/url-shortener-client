import React from "react";

const LinkListItem = props => {
  function handleLinkProtocol(longURL) {
    let redirectLink =
      longURL.includes("http://") || longURL.includes("https://")
        ? longURL
        : `http://${longURL}`;

    return redirectLink;
  }

  function copyToClipboard(shortURL) {
    const el = document.createElement("textarea");
    el.value = shortURL;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
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
        <li className="text-info">
          {props.shortURL}
          <button
            className="btn btn-sm btn-outline-info"
            style={{ marginLeft: "15px" }}
            onClick={e => {
              copyToClipboard(props.shortURL);
            }}
          >
            COPY
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LinkListItem;
