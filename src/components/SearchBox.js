import React from "react";
import WarningBanner from "./WarningBanner";
import "../styles/search.css";

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: false, longURL: "" };
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
      this.setState({ showWarning: true });
      setTimeout(() => {
        this.setState({
          showWarning: false
        });
      }, 3000);
      return;
    }

    this.props.onSubmit(longURL);
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
        <form
          onSubmit={e => {
            e.preventDefault();
            this.handleSubmit(this.state.longURL);
          }}
        >
          <div className="row justify-content-md-center mt-5 mb-5">
            <div className="col-sm-10">
              <div className="input-group input-group-lg">
                <input
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
      </div>
    );
  }
}

export default SearchBox;
