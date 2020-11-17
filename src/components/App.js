import "fontsource-roboto";
import React from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";

import SearchBox from "./SearchBox";
import LinkList from "./LinkList";
import WarningBanner from "./WarningBanner";

const App = () => {
  const [history, setHistory] = React.useState([]);
  const [message, setMessage] = React.useState([]);
  const [showWarning, setShowWarning] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSearchSubmit = async (longURL) => {
    try {
      setIsLoading(true);

      const result = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/shorten`,
        { longURL }
      );

      let link = {
        longURL: result.data.longURL,
        shortURL: result.data.shortURL,
        hash: result.data.hash,
        pageTitle: result.data.pageTitle,
      };

      setHistory([link, ...history]);
      setIsLoading(false);
    } catch (err) {
      handleWarning(err.message);
    }
  };

  const handleWarning = (message) => {
    setShowWarning(true);
    setMessage(message);

    setTimeout(() => {
      setShowWarning(false);
      setMessage("");
      setIsLoading();
    }, 3000);
  };

  return (
    <>
      <WarningBanner warn={showWarning} message={message} />
      <Grid container>
        <Grid container justify="center">
          <Grid
            item
            xs={8}
            style={{
              marginTop: "100px",
            }}
          >
            <SearchBox
              onSubmit={handleSearchSubmit}
              onError={handleWarning}
              history={history}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid
            item
            xs={8}
            style={{
              marginTop: "50px",
            }}
          >
            <LinkList history={history} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
