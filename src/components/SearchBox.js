import React from "react";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { longURL: "" };
    this.urlInput = React.createRef();
  }

  // https://stackoverflow.com/a/49849482
  isValidURL = string => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res == null ? false : true;
  };

  handleSubmit = longURL => {
    if (longURL === "") {
      return;
    }

    if (!this.isValidURL(longURL)) {
      this.props.onError("Unable to shorten that link. It is not a valid url.");

      return;
    }

    this.props.onSubmit(longURL);
    this.setState({ longURL: "" });
  };

  componentDidUpdate(prevProps, prevState) {
    this.urlInput.current.focus();
  }

  render() {
    let button;
    if (this.props.loading) {
      button = (
        <button className="btn btn-primary" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Loading...</span>
        </button>
      );
    } else {
      button = (
        <button type="submit" className="btn btn-info">
          SHORTEN
        </button>
      );
    }

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(this.state.longURL);
        }}
      >
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-sm-10">
            <div className="input-group">
              <input
                autoFocus={true}
                ref={this.urlInput}
                className="form-control"
                type="text"
                placeholder="Paste a link to shorten it"
                value={this.state.longURL}
                onChange={e => this.setState({ longURL: e.target.value })}
              />
              <div className="input-group-append">{button}</div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBox;
