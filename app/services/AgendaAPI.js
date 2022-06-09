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
    postUser(username, firstname, lastname, password, passwordConfirm) {
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
    getAllTasks(token) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = "GET"
        this.option.body = undefined
        return this.myFetch('tasks', this.option)

    }
    postTask(token, name, date, begginingDate, endDate, wholeDay, begginingTime, endTime, frequency, dayOfWeek, dayOfMonth) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = 'POST'
        let payload = {
            name: name,
            wholeDay: wholeDay,
            frequency: frequency
        }
        if(wholeDay) {
            payload.begginingDate = begginingDate
            payload.endDate = endDate
        } else {
            if(frequency === 0) {
                payload.date = date
            } else if(frequency > 0) {
                payload.begginingDate = begginingDate
                payload.endDate = endDate
            }
            if(frequency === 2) {
                payload.dayOfWeek = dayOfWeek
            }
            if(frequency === 3) {
                payload.dayOfMonth = dayOfMonth
            }
            payload.begginingTime = begginingTime
            payload.endTime = endTime
        }
        payload = JSON.stringify(payload)
        console.log(payload)

        this.option.body = payload
        return this.myFetch('tasks', this.option)
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
                .catch(error => {
                    baseController.toast("no-connection")
                    reject({status: 999, response: null})
                })


        })
    }
    putTask(token, task, applyToAll) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = 'PUT'
        let payload = {
            name: task.name,
            progression: task.progression,
            repeatingId: task.repeatingId,
            applyToAll: applyToAll
        }
        payload = JSON.stringify(payload)
        this.option.body = payload
        return this.myFetch(`tasks/${task.id}`, this.option)
    }
    deleteTask(token, task, applyToAll) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = 'DELETE'
        this.option.body = JSON.stringify({
            applyToAll: applyToAll,
            repeatingId: task.repeatingId
        })
        return this.myFetch(`tasks/${task.id}`, this.option)
    }
    async checkToken(token) {
        this.option.headers.Authorization = `Bearer ${token}`
        this.option.method = "GET"
        this.option.body = undefined
        return this.myFetch('auth/token', this.option)
    }
}

