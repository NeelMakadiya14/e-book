import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import { useState } from 'react'
import axios from 'axios';
import queryString from 'query-string';
import { CookiesProvider, Cookies, useCookies } from 'react-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Email } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { genres } from '../../utils/Constant';


require('dotenv').config();


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Form() {
    const classes = useStyles();
    const [bookname, setBookName] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState({});

    const [err, setErr] = useState(false);



    const onClick = () => {

        if (!bookname.trim()) {
            setErr(true);
            return;
        }
        setErr(false);
        const cookies = new Cookies();
        const userCookie = cookies.get('userCookie');
        const email = userCookie.email;
        const API_URL = process.env.REACT_APP_BACKEND_URL;
        console.log(userCookie.GID);
        let id = window.location.pathname;
        id = id.substring(6);
        console.log(genre);
        const obj = {
            title: bookname,
            description: description,
            genres: genre,
            docID: id
        }
        axios.post(`${API_URL}/startwriting?` + queryString.stringify({ email }), obj)
            .then((res) => {
                window.location.reload();
            })
    }



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LibraryBooks />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create New Book
                </Typography>
                <form className={classes.form} noValidate>
                    {err && bookname.length === 0 ?
                        <TextField error
                            className="color"
                            variant="outlined"
                            margin="normal"
                            id="outlined-error"
                            required
                            fullWidth
                            label="Book Name"
                            id="standard-error-helper-text"
                            helperText="Enter book name"
                            onChange={event => setBookName(event.target.value)}
                        />
                        :
                        <TextField
                            className="color"
                            variant="outlined"
                            margin="normal"
                            id="outlined-error"
                            required
                            fullWidth
                            label="Book Name"
                            onChange={event => setBookName(event.target.value)}
                        />
                    }

                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Description"
                        onChange={event => setDescription(event.target.value)}
                    />


                    <div className={classes.root}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={genres}
                            getOptionLabel={(option) => option}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Genres of Book"
                                    placeholder="new genre"
                                />
                            )}
                            onChange={(event, value) => setGenre(value)}
                        />
                    </div>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onClick}
                    >
                        Create Book
                    </Button>

                </form>
            </div>

        </Container>
    );
}