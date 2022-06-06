class UserRepository {
    constructor() {

    }
    async register(username, firstname, lastname, password, passwordConfirm) {
        let agendaAPI= new AgendaAPI();
        return  await agendaAPI.postUser(username, firstname, lastname, password, passwordConfirm);
    }
    async login(email, password) {
        let agendaAPI = new AgendaAPI();
        return await agendaAPI.Authenticate(email, password);
    }


}
class TaskRepository {
    constructor() {

    }
    async create (token, name, date, begginingDate, endDate, wholeDay, begginingTime, endTime, frequency) {
        let agendaAPI = new AgendaAPI()
        return await agendaAPI.postTask(token, name, date, begginingDate, endDate, wholeDay, begginingTime, endTime, frequency)
    }
    async getAll(token) {
        let agendaAPI = new AgendaAPI()
        const result = await agendaAPI.getAllTasks(token)
        if(result.status === 200) {
            const returnData = []
            result.response.forEach(data => {

                returnData.push(new Task(
                    data.id,
                    data.name,
                    data.date ? new Date(data.date) : null,
                    data.begginingDate ? new Date(data.begginingDate): null,
                    data.endDate ? new Date(data.endDate): null,
                    data.wholeDay,
                    data.begginingTime,
                    data.endTime,
                    data.progression,
                    data.repeatingId
                ))
            })
            return returnData;
        }
        return null;
    }
    async update(token, task, applyToAll) {

        const agendaAPI = new AgendaAPI()
        return await agendaAPI.putTask(token, task.id, task.name, task.progress, task.repeatingId, applyToAll)
    }

}