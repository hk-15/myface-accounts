import { Context } from "node:vm";
import { Redirect } from "react-router-dom";

export interface ListResponse<T> {
    items: T[];
    totalNumberOfItems: number;
    page: number;
    nextPage: string;
    previousPage: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    displayName: string;
    username: string;
    email: string;
    profileImageUrl: string;
    coverImageUrl: string;
}

export interface Interaction {
    id: number;
    user: User;
    type: string;
    date: string;
}

export interface Post {
    id: number;
    message: string;
    imageUrl: string;
    postedAt: string;
    postedBy: User;
    likes: Interaction[];
    dislikes: Interaction[];
}

export interface NewPost {
    message: string;
    imageUrl: string;
    userId: number;
}

export async function fetchUsers(searchTerm: string, page: number, pageSize: number, context: Context): Promise<ListResponse<User>> {
    const response = await fetch(`https://localhost:5001/users?search=${searchTerm}&page=${page}&pageSize=${pageSize}`, {
    headers: {
        'Authorization': context.header
    }});
    return await response.json();
}

export async function fetchUser(userId: string | number, context: Context): Promise<User> {
    const response = await fetch(`https://localhost:5001/users/${userId}`, {
    headers: {
        'Authorization': context.header
    }});
    return await response.json();
}

export async function fetchPosts(page: number, pageSize: number, context: Context): Promise<ListResponse<Post>> {
    const response = await fetch(`https://localhost:5001/feed?page=${page}&pageSize=${pageSize}`, {
    headers: {
        'Authorization': context.header,
    }}
    );
    if (response.status == 401) {
        context.isLoggedIn = false;
        throw new Error(await response.json())
    }
    return await response.json();
}

export async function fetchPostsForUser(page: number, pageSize: number, userId: string | number, context: Context) {
    const response = await fetch(`https://localhost:5001/feed?page=${page}&pageSize=${pageSize}&postedBy=${userId}`, {
    headers: {
        'Authorization': context.header,
    }});
    return await response.json();
}

export async function fetchPostsLikedBy(page: number, pageSize: number, userId: string | number, context: Context) {
    const response = await fetch(`https://localhost:5001/feed?page=${page}&pageSize=${pageSize}&likedBy=${userId}`, {
    headers: {
        'Authorization': context.header,
    }});
    return await response.json();
}

export async function fetchPostsDislikedBy(page: number, pageSize: number, userId: string | number, context: Context) {
    const response = await fetch(`https://localhost:5001/feed?page=${page}&pageSize=${pageSize}&dislikedBy=${userId}`, {
    headers: {
        'Authorization': context.header,
    }});
    return await response.json();
}

export async function createPost(newPost: NewPost, context: Context) {
    const response = await fetch(`https://localhost:5001/posts/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": context.header
        },
        body: JSON.stringify(newPost),
    });
    
    if (!response.ok) {
        throw new Error(await response.json())
    }
}

// export async function login(credentials: string) {
    
//     // const username = "kplacido0";
//     // const password = "password123";
//     //  credentials = btoa(username + ':' + password);
//     const response = await fetch('https://localhost:5001/', {
//     headers: {
//         'Authorization': 'Basic ' + credentials
    
//     }})
//     // .then(response => response.json())
//     // .then(data => console.log(data))
//     // .catch(error => console.error(error));

//     if (!response.ok) {
//         throw new Error(await response.json())
//     }
//     return response;
// }
