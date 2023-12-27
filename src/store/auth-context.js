import React,{useState} from "react";

const AuthContext = React.createContext({
    token :'',
    isLoggedIn: false,
    login: (token) =>{},
    logout: ()=>{}
})


export const AuthContextProvider  =(props)=>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    
    const userIsLoggedIn = !!token;

    const loginHandler = (token)=>{ 
        setToken(token)
        localStorage.setItem('token',token);
    }
    const logoutHandler =  ()=>{
        setToken(null);
        localStorage.removeItem('token');
        setTimeout(()=>{
            localStorage.clear('token');
            setToken(null);
        },5*60*1000);
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;