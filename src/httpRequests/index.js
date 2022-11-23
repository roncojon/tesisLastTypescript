/* import { useContext } from "react";
import LoginContext from "../context/LoginContext";
 */

export const urlBase = 'https://localhost:44381/api/';
export const endpoint = {
    pruebas: {
        caritas: 'pruebadecaritas',
        matriz:'pruebamatriz'
    },
    examenes: {
        general:'Examen',
        examenesActivos:'Examen/examenesActivos'
    },
    usuarios: {
        login: 'usuario/login',
        usuariosAll: 'Usuario/GetAllPlus/usuariosPlus',
        usuariosAllPruebasActivas: 'Usuario/GetAll/pruebasActivas',
        usuarioRegister: 'Usuario/Register',
        userLogin: 'Usuario/Login',
        userDelete: 'Usuario/Delete',
        usuariosDeleteSeveral: 'Usuario/DeleteSeveral',
        usuarioRol: 'UsuarioRol',
        usuariosByName: 'Usuario/GetAll/usuariosConNombre'
    }
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
export const GetWithParams = async (key, value, endP) => {
    //const {accessToken} = useContext(LoginContext);
    /*  fetch(urlBase+endP
     ).then(response => { return response.json() })
       .then(resp => {return resp}) */
    const pruebasResponse = await fetch(urlBase + endP+ "?" + key + "=" + value/* ,
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
export const GetProtected = async (endP, accTok) => {
    //const {accessToken} = useContext(LoginContext);
    /*  fetch(urlBase+endP
     ).then(response => { return response.json() })
       .then(resp => {return resp}) */
    // console.log(accTok)
    const pruebasResponse = await fetch(urlBase + endP,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accTok}`
            }

        });
    const pruebas = await pruebasResponse.json();
    // console.log(pruebasResponse);
    return await pruebas
};

export const GetSingle = (id, endP) => {
    fetch(urlBase + endP + id
    ).then(response => { return response.json() })
        .then(resp => { return resp })
};
export const GetSingleWithComposedKey = (key1, id1, key2, id2, endP) => {
    fetch(urlBase + endP + "?" + key1 + "=" + id1 + "&" + key2 + "=" + id2
    ).then(response => { return response.json() })
        .then(resp => { return resp })
};

export const Post = async (key1, value1, key2, value2, endP, data) => {
    //const {accessToken} = useContext(LoginContext);
    //let f2 = {};
    const response = await fetch(urlBase + endP + "?" + key1 + "=" + value1 + "&" + key2 + "=" + value2,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }
        });

    const result = await response.json();


    //return await this.result;

    /* const dat = await f.json();
      console.log(dat); */
    //return await f2
};
export const PostDisableExam = async (key1, value1, endP) => {
    //const {accessToken} = useContext(LoginContext);
    //let f2 = {};
    const response = await fetch(urlBase + endP + "?" + key1 + "=" + value1 ,
        {
            method: "POST",
            // body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }
        });
    const result = await response.json();
};

export const PostGeneric = async (key1, value1, key2, value2, endP, data) => {
    //const {accessToken} = useContext(LoginContext);
    console.log(data)
    //let f2 = {};
    const symbol1 = key1 && value1  ? "?" : "";
    const symbol2 = key1 && value1 && key2 && value2 ? "&" : "";
    const key1Value1 = key1 && value1 ? key1 + "=" + value1 : "";
    const key2Value2 = key2 && value2 ? key2 + "=" + value2 : "";

    const response = await fetch(urlBase + endP + symbol1 + key1Value1 + symbol2 + key2Value2,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': `Bearer ${accessToken}`
            }
        });

    const result = await response.json();
return result
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
    if (!response.ok) {
        const message = 'Error: ' + Math.random() + response.status;
        throw new Error(message);
    }
    const result = await response.json();
    //console.log(f)

    return result;

    /* const dat = await f.json();
      console.log(dat); */
    //return await f2
};

export const Put = async (id, endP, data, accessToken) => {
    const response = await fetch(urlBase + endP + '/' + id,
        {
            method: "PUT",
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
    /* const response = */ await fetch(urlBase + endP + '/' + id,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
    /* const result = await response.json();
    return result */
};

export const DeleteSeveral = async (idsList, endP/* , accessToken */) => {
    /* const response =  */await fetch(urlBase + endP,
    {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify(idsList)
    })
    /* const result = await response.json();
    return result */
};