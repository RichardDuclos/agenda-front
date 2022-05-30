class User {

    constructor(id, firstName, lastName, email, birthday, role) {
        this.datingAPI = new AgendaAPI();
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
        this.role = role
    }
    static async register(username, firstname, lastname, password, passwordConfirm) {
        let agendaAPI= new AgendaAPI();
        return  await agendaAPI.Register(username, firstname, lastname, password, passwordConfirm);
    }
    static async login(email, password) {
        let agendaAPI = new AgendaAPI();
        return await agendaAPI.Authenticate(email, password);
    }
    static async getUser(id, token) {
        let datingAPI = new AgendaAPI();
        const res = await datingAPI.getUser(id, token);
        if(res.email !== undefined) {
            return new User(res.id, res.firstName,
                res.lastName, res.email,
                res.birthday, res.role)
        }
        return null;

    }

}


class Token {
    static async checkToken() {
        let token = LocalStorage.getToken();
        if(token === null) {
            return false;
        }
        let agendaAPI = new AgendaAPI();
        console.log(JSON.stringify(token))
        return await agendaAPI.checkToken(token)
    }

}

class Meeting {
    constructor(id, date, place, rank, comment) {
        this.id = id;
        this.date = date;
        this.place = place;
        this.rank = rank;
        this.comment = comment;
    }
}