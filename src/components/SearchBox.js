import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { isValidURL } from '../uitls';

const SearchBox = ({ onError, onSubmit, history, isLoading }) => {
  const [url, setUrl] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef.current.focus();
    setUrl('');
  }, [history]);

  const handleSubmit = (url) => {
    if (!isValidURL(url)) {
      onError('Unable to shorten that link. It is not a valid url.');

      return;
    }

    onSubmit(url);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={9}>
        <TextField
          inputRef={inputRef}
          label="Paste a link to shorten it"
          variant="outlined"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(url);
          }}
          fullWidth
          style={{
            padding: '15px',
          }}
          disabled={isLoading}
        >
          SHORTEN
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBox;
