import { makeStyles } from '@material-ui/core/styles';

const themeStyles = makeStyles( theme => ({
  
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    background: 'linear-gradient(orange 25%, yellow)',
    '& h6': { color: "black" },
  },
  avatar: {
    margin: theme.spacing(1),
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    borderWidth: 1,
    width: 60,
    height: 60,
  },
  footer: {
    position: "fixed",
    backgroundColor: "black",
    bottom: 0,
    left: 0,
    right: 0
  },
  inbox: {},
  tabs: {
    background: "#d3d3d3"
  },
  tabPanel: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
  },

  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    marginTop: theme.spacing(3),
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));


export default themeStyles
