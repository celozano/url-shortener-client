import React from 'react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { copyToClipboard, handleLinkProtocol } from '../uitls';

const LinkListItem = ({ pageTitle, longURL, shortURL, hasDivider }) => {
  return (
    <>
      {hasDivider && <Divider />}
      <Box pt={2} pb={2}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography>{pageTitle}</Typography>
          </Grid>
        </Grid>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={5}>
            <Tooltip title={longURL} placement="bottom-start">
              <Typography noWrap={true}>{longURL}</Typography>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sm={5}>
            <a
              href={handleLinkProtocol(shortURL)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Typography noWrap={true}>{shortURL}</Typography>
            </a>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => {
                copyToClipboard(shortURL);
              }}
              style={{ width: '100%' }}
            >
              COPY
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LinkListItem;
