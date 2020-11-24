// https://stackoverflow.com/a/49849482
export const isValidURL = (string) => {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res == null ? false : true;
};

export const copyToClipboard = (shortURL) => {
  const el = document.createElement('textarea');
  el.value = shortURL;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const handleLinkProtocol = (longURL) => {
  let redirectLink =
    longURL.includes('http://') || longURL.includes('https://')
      ? longURL
      : `http://${longURL}`;

  return redirectLink;
};
