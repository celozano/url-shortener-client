import React from 'react';
import axios from 'axios';
import 'fontsource-roboto';
import { Grid } from '@material-ui/core';

import NavBar from './NavBar';
import SearchBox from './SearchBox';
import LinkList from './LinkList';
import ErrorMessage from './ErrorMessage';

const Dashboard = () => {
  const [history, setHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSearchSubmit = async (longURL) => {
    try {
      setIsLoading(true);

      const result = await axios.post(
        `${process.env.REACT_APP_API_HOST}/api/shorten`,
        { longURL }
      );

      const link = {
        longURL: result.data.longURL,
        shortURL: result.data.shortURL,
        hash: result.data.hash,
        pageTitle: result.data.pageTitle,
      };

      setHistory([link, ...history]);
    } catch (err) {
      handleWarning(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWarning = (message) => {
    setError(message);

    setTimeout(() => {
      setError('');
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <NavBar />
      <Grid container>
        <Grid container justify="center">
          <Grid
            item
            xs={8}
            style={{
              marginTop: '100px',
            }}
          >
            <SearchBox
              onSubmit={handleSearchSubmit}
              onError={handleWarning}
              history={history}
              isLoading={isLoading}
            />
            {error && <ErrorMessage error={error} />}
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid
            item
            xs={8}
            style={{
              marginTop: '50px',
            }}
          >
            {!!history.length && <LinkList history={history} />}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
