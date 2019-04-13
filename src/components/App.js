import React from "react";
import axios from "axios";

import SearchBox from "./SearchBox";
import LinkList from "./LinkList";
import WarningBanner from "./WarningBanner";

import "../styles/custom.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      showWarning: false,
      message: "",
      isLoading: false
    };
  }

  showWarning = message => {
    this.setState({ showWarning: true, message });
    setTimeout(() => {
      this.setState({
        showWarning: false,
        message: "",
        isLoading: false
      });
    }, 3000);
  };

  handleSearchSubmit = async longURL => {
    try {
      this.setState({ isLoading: true });
      const result = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/shorten`,
        { longURL }
      );

      let link = {
        longURL: result.data.longURL,
        shortURL: result.data.shortURL,
        hash: result.data.hash,
        pageTitle: result.data.pageTitle
      };

      this.setState({
        history: [link, ...this.state.history],
        isLoading: false
      });
    } catch (err) {
      this.showWarning(err.message);
    }
  };

  render() {
    return (
      <div>
        <WarningBanner
          warn={this.state.showWarning}
          message={this.state.message}
        />
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <SearchBox
              onSubmit={this.handleSearchSubmit}
              loading={this.state.isLoading}
              onError={this.showWarning}
            />
          </div>
        </div>
        <div className="container">
          <div className="list-group mt-n5 pb-3">
            <LinkList history={this.state.history} />
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">
              <small>Desarrollado por Carlos Lozano</small>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
