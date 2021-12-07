import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import GithubReducer from "./GithubReducer"

import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from "../types";

let gitubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
    gitubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
    gitubClientId = process.env.GITHUB_CLIENT_ID
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const GithubState = props => {
    const intitalState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }



    const [state, dispath] = useReducer(GithubReducer, intitalState)



    //SEARCH USERS 
    const searchUsers = async text => {
        setLoading()

        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${gitubClientId}&client_secrets=${githubClientSecret}`);

        dispath({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }


    //GET USER 

    const getUser = async (username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${gitubClientId}&client_secrets=${githubClientSecret}`);

        dispath({
            type: GET_USER,
            payload: res.data
        })
    }

    //GET REPOS

    const getUserRepos = async (username) => {
        setLoading()

        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${gitubClientId}&client_secrets=${githubClientSecret}`);

        dispath({
            type: GET_REPOS,
            payload: res.data
        })
    }

    // CLEAR USERS 
    const clearUsers = () => dispath({ type: CLEAR_USERS })

    //SET LOADING 

    const setLoading = () => dispath({ type: SET_LOADING })


    return <githubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
    >


        {props.children}

    </githubContext.Provider>

}

export default GithubState