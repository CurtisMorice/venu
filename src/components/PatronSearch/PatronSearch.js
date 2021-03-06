import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {PATRON_ACTIONS} from '../../redux/actions/patronActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const mapStateToProps = state => ({
    patrons: state.patron.searchResults,
});

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    searchButton: {
        color: 'white',
    },
    list: {
        margin: "auto",
        textAlign: "center",
    },
});

class PatronSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
        };
    }

    openSearch = () => {
        this.setState(state => ({ open: !state.open }));
    }

    runSearch = (event) => {
        event.persist();
        if(event.target.value !== ""){
            this.props.dispatch({ type: PATRON_ACTIONS.SEARCH, payload: event.target.value })
        } else {
            this.props.dispatch({type: PATRON_ACTIONS.STORE_SEARCH_RESULTS, payload: []})
        }
    }

    addFriend = (id) => {
        let action = { type: PATRON_ACTIONS.ADD_FRIEND, payload: id };
        console.log(action);
        this.props.dispatch( action );
    }
    
    checkIfPatron = (patron) => {
        if(patron.type === 'patron'){
            return true;
        } else {
            return false;
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <IconButton onClick={this.openSearch} id="searchButton" className={classes.searchButton}>
                    <SearchIcon />
                </IconButton>                
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Search Patrons</DialogTitle>
                    <DialogContent>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        type="text"
                        fullWidth
                        onChange={this.runSearch}
                        />
                    </DialogContent>
                    <List className={classes.list}>
                        {this.props.patrons.filter(patron => patron.type === 'patron').map((patron, i) => <ListItem key={i}><Button onClick={() => this.addFriend(patron.id)}><ListItemIcon><PersonAddIcon/></ListItemIcon></Button><ListItemText>{patron.username}</ListItemText></ListItem>)}
                    </List>   
                </Dialog>
            </div>
        );
    }
}

PatronSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles),connect(mapStateToProps))(PatronSearch);