import React from 'react';

import styles from './styles';
import { 
  withStyles, 
  Typography,
} from '@material-ui/core';

const linkItems = [
  {
    href: 'https://www.linkedin.com/in/payogaputra/',
    className: 'fab fa-linkedin',
  },
  {
    href: 'https://github.com/pputra/Seekneakers',
    className: 'fab fa-github',
  },
  {
    href: 'https://payogaputra.com',
    className: 'fas fa-globe',
  },
];

const Footer = props => {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography variant="subtitle2" gutterBottom>
        Built by Payoga Putra
      </Typography>
      <div className={classes.linkItems}>
        {linkItems.map(({href, className}) => (
            <a
              href={href}
              style={{color: 'black'}}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={className} />
            </a>
        ))}
      </div>
    </footer>
  );
};

export default withStyles(styles)(Footer);