export const authentication='Basic c3VyZW46c3VyZW4xMjM='

export const options = {
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": authentication,
        "Access-Control-Allow-Origin" : '*'
    },

    credentials: 'same-origin',
};

export const serverurl='http://localhost:8081/'
export const statecode = '14'

