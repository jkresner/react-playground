import { makeStyles } from '@material-ui/core/styles';

const themeStyles = makeStyles( theme => ({
  
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
  tabs: {
    background: "#d3d3d3"
  },
  tabPanel: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(5),
  },
  root: {
    flexGrow: 1,
  },

}));


export default themeStyles
