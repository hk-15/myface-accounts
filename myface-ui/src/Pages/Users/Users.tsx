﻿import React, {useContext, useState} from "react";
import {Page} from "../Page/Page";
import {SearchInput} from "../../Components/SearchInput/SearchInput";
import {fetchUsers} from "../../Api/apiClient";
import {UserCard} from "../../Components/UserCard/UserCard";
import {InfiniteList} from "../../Components/InfititeList/InfiniteList";
import "./Users.scss";
import { LoginContext } from "../../Components/LoginManager/LoginManager";
import { Context } from "node:vm";

export function Users(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");
    const loginContext = useContext(LoginContext);
    function getUsers(page: number, pageSize: number, context: Context) {
        return fetchUsers(searchTerm, page, pageSize, loginContext);
        // const response = fetchUsers(searchTerm, page, pageSize, loginContext.header);
        // if (!response) {
        //     loginContext.isLoggedIn=false;
        //     <Redirect to='/login'/>
        //  }

        //  return response;
    }
    
    return (
        <Page containerClassName="users">
            <h1 className="title">Users</h1>
            <SearchInput searchTerm={searchTerm} updateSearchTerm={setSearchTerm}/>
            <InfiniteList fetchItems={getUsers} renderItem={user => <UserCard key={user.id} user={user}/>}/>
        </Page>
    );
}