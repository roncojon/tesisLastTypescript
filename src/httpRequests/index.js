/* import { useContext } from "react";
import LoginContext from "../context/LoginContext";
 */

export const urlBase = 'https://localhost:44381/api/';
export const endpoint = {
    caritas: 'pruebadecaritas',
    login: 'usuario/login',
    usuariosAll: 'usuario/getall/usuarios',
    usuarioRegister: 'Usuario/Register',
    userLogin: 'Usuario/Login',
    userDelete: 'Usuario/Delete'
};

export const Get = async (endP) => {
    //const {accessToken} = useContext(LoginContext);
    /*  fetch(urlBase+endP
     ).then(response => { return response.json() })
       .then(resp => {return resp}) */
    const pruebasResponse = await fetch(urlBase + endP/* ,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }

        } */);
    const pruebas = await pruebasResponse.json();

    //console.log(pruebas);
    return await pruebas
};

export const GetProtected = async (id, endP, accTok) => {
    //const {accessToken} = useContext(LoginContext);
    /*  fetch(urlBase+endP
     ).then(response => { return response.json() })
       .then(resp => {return resp}) */
    console.log(accTok)
    const pruebasResponse = await fetch(urlBase + endP + '/' + accTok,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accTok}`
            }

        });
    const pruebas = await pruebasResponse.json();
    console.log(pruebasResponse);
    return await pruebasResponse
};

export const GetSingle = (id, endP) => {
    fetch(urlBase + endP
    ).then(response => { return response.json() })
        .then(resp => { return resp })
};

export const Post = async (endP, data) => {
    //const {accessToken} = useContext(LoginContext);
    //let f2 = {};
    const response = await fetch(urlBase + endP,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }
        });

    const result = await response.json();
    console.log(result)

    //return await this.result;

    /* const dat = await f.json();
      console.log(dat); */
    //return await f2
};

export const PostProtected = async (id, endP, data, accessToken) => {
    //const {accessToken} = useContext(LoginContext);
    //let f2 = {};
    const response = await fetch(urlBase + endP,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });
    const result = await response.json();
    //console.log(f)

    return await result;

    /* const dat = await f.json();
      console.log(dat); */
    //return await f2
};

export const LoginPost = async (endP, data) => {
    //const {accessToken} = useContext(LoginContext);
    //let f2 = {};
    const response = await fetch(urlBase + endP,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }
        });
    const result = await response.json();
    //console.log(f)

    return result;

    /* const dat = await f.json();
      console.log(dat); */
    //return await f2
};

export const Put = async (id, endP, data, accessToken) => {
    const response = await fetch(urlBase + endP + id,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + accessToken

            }
        });
    const result = await response.json();
    //console.log(f)

    return result;
};

export const Delete = async (id, endP) => {
    await fetch(urlBase + endP + '/' + id, { method: 'DELETE' })
};



export const DeleteProtected = async (id, endP, accessToken) => {
    const response = await fetch(urlBase + endP + '/' + id,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
        const result = await response.json();
        return result
};