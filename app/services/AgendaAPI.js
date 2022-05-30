class AgendaAPI {
    constructor() {
        this.api = "http://localhost:3000/";
        this.option = {
            method: "GET",
            mode: 'cors',
            cache: 'default',
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
                'Authorization' : ''
            }
        }
    }
    Register(username, firstname, lastname, password, passwordConfirm) {
        this.option.headers.Authorization = ''
        this.option.method = 'POST'
        let payload = {
            username: username,
            firstName: firstname,
            lastName: lastname,
            password: password,
            passwordConfirm: passwordConfirm
        }
        payload = JSON.stringify(payload)
        this.option.body = payload;
        return this.myFetch('users', this.option)
    }
    Authenticate(username, password) {
        this.option.headers.Authorization = ''
        this.option.method = 'POST'
        let payload = {
            username: username,
            password: password
        }
        payload = JSON.stringify(payload)
        this.option.body = payload;

        return this.myFetch('auth/login', this.option)
    }
    myFetch(url, option) {
        return new Promise((resolve, reject) => {
            fetch(`${this.api}${url}`, option)
                .then(response => {
                    console.log(response)

                    if(response.status === 200) {
                        response.json()
                            .then(json => {
                                resolve({status: response.status, response: json})

                            })

                    } else if(response.status === 201 || response.status === 204) {
                        resolve({status: response.status, response: null})
                    } else if(response.status === 400) {
                        response.json()
                            .then(json => {
                                reject({status: response.status, response: json})

                            })
                    } else if(response.status === 401) {
                        reject({status: response.status, response: null})
                    }
                })
        })
    }

    async checkToken(token) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = "GET"
        this.option.body = undefined
        return this.myFetch('auth/token', this.option)
    }
}

