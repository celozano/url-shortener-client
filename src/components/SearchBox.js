import React from "react";
import WarningBanner from "./WarningBanner";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: false, longURL: "" };
  }

  handleOnChange = e => {
    this.setState({ longURL: e.target.value });
    if (this.state.showWarning && !e.target.value) {
      this.setState({ showWarning: false });
    }
  };

  // https://stackoverflow.com/a/49849482
  isValidURL = string => {
    var res = string.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
    return res == null ? false : true;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.longURL === "") {
      return;
    }

    if (!this.isValidURL(this.state.longURL)) {
      this.setState({ showWarning: true });
      return;
    }

    this.props.onSubmit(this.state.longURL);
    this.setState({ longURL: "" });
  };

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
      <div>
        <WarningBanner
          warn={this.state.showWarning}
          message="Unable to shorten that link. It is not a valid url."
        />
        <form onSubmit={this.handleSubmit}>
          <div className="row justify-content-md-center mt-4 mb-4">
            <div className="col-sm-10">
              <div className="input-group input-group-lg">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Paste a link to shorten it"
                  value={this.state.longURL}
                  onChange={this.handleOnChange}
                />
                <div className="input-group-append">{button}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBox;
