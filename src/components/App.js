import React from "react";
import axios from "axios";

import Background from "./Background";
import SearchBox from "./SearchBox";
import LinkList from "./LinkList";
import WarningBanner from "./WarningBanner";

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
        history: [...this.state.history, link],
        isLoading: false
      });
    } catch (err) {
      this.setState({ showWarning: true, message: err.message });
      setTimeout(() => {
        this.setState({
          showWarning: false,
          message: "",
          isLoading: false
        });
      }, 3000);
    }
  };

  render() {
    return (
      <div>
        <Background />
        <WarningBanner
          warn={this.state.showWarning}
          message={this.state.message}
        />
        <div
          className="jumbotron jumbotron-fluid"
          style={{ backgroundColor: "rgb(255, 255, 255, .2)" }}
        >
          <div className="container">
            <SearchBox
              onSubmit={this.handleSearchSubmit}
              loading={this.state.isLoading}
            />
          </div>
        </div>
        <div className="container">
          <LinkList history={this.state.history} />
        </div>
      </div>
    );
  }
}

export default App;
