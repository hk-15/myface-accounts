import React, {createContext, ReactNode, useState} from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    isAdmin: false,
    logIn: () => {},
    logOut: () => {},
    encodeCredentials: (username:string, password:string) => {},
    header: "",
});

interface LoginManagerProps {
    children: ReactNode
}   

export function LoginManager(props: LoginManagerProps): JSX.Element {
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ header, setHeader ] = useState("");
    const [ credentials, setCredentials ] = useState("");
    async function logIn() {
        // try {

        //     console.log("Logging in with credentials: " + credentials);
            
        //     const response: Response = await login(credentials);
        //     if (response != null && response.ok) {
                setLoggedIn(true);
        //     }
        //     //Optionally handle response.json() ife needed
        // } catch (error) {
        //  //Handle error if dneeded
        // }
    }
    
    function logOut() {
        setLoggedIn(false);
    }
    
    function encodeCredentials(username:string, password:string)
    {
        const credentials = btoa(username + ':' + password);
        setCredentials(credentials);
        setHeader(`Basic ${credentials}`);
    }

    const context = {
        isLoggedIn: loggedIn,
        isAdmin: loggedIn,
        logIn: logIn,
        logOut: logOut,
        encodeCredentials: encodeCredentials,
        header: header,
    };
    
    return (
        <LoginContext.Provider value={context}>
            {props.children}
        </LoginContext.Provider>
    );
}