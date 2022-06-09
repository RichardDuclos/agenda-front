class listViewController extends BaseController {
    constructor() {
        super();
        this.isConnected()
            .then(result => {
                if (result.status !== 204) {
                    navigate("login")
                } else {
                    this.setTitle("Liste des tâches");
                    this.root = document.getElementById("root")
                    this.currentDate = new Date()

                    this.allTasksListWrapper = document.getElementById("all-tasks-wrapper")
                    this.allTasks = document.getElementById("all-tasks")
                    this.allTasksBody = document.getElementById("all-tasks-body")

                    this.lateTasksListWrapper = document.getElementById("late-tasks-wrapper")
                    this.lateTasks = document.getElementById("late-tasks")
                    this.lateTasksBody = document.getElementById("late-tasks-body")

                    this.currentTasksListWrapper = document.getElementById("current-tasks-wrapper")
                    this.currentTasks = document.getElementById("current-tasks")
                    this.currentTasksBody = document.getElementById("current-tasks-body")

                    this.futureTasksListWrapper = document.getElementById("future-tasks-wrapper")
                    this.futureTasks = document.getElementById("future-tasks")
                    this.futureTasksBody = document.getElementById("future-tasks-body")

                    this.completedTasksListWrapper = document.getElementById("completed-tasks-wrapper")
                    this.completedTasks = document.getElementById("completed-tasks")
                    this.completedTasksBody = document.getElementById("completed-tasks-body")


                    this.tables = [
                        {
                            name: "all",
                            wrapper: this.allTasksListWrapper
                        },
                        {
                            name: "late",
                            wrapper: this.lateTasksListWrapper
                        },
                        {
                            name: "current",
                            wrapper: this.currentTasksListWrapper
                        },
                        {
                            name: "future",
                            wrapper: this.futureTasksListWrapper
                        },
                        {
                            name: "completed",
                            wrapper: this.completedTasksListWrapper
                        }
                    ]
                    this.selectChangeHandler("all")

                    this.listChangeSelect = document.getElementById("listChangeSelect")
                    this.listChangeSelect.onclick = async e => await this.selectChangeHandler(e.currentTarget.value)

                    this.getAllTasksAjax = async function (data, callback, settings) {
                        callback(
                            await window.listViewController.getAllTasks()
                        );
                    }

                    this.initializeLists()
                        .then(result => {

                            this.root.classList.remove("hidden")

                        })
                }
            })

    }
    selectChangeHandler(value) {
        for(const table of this.tables) {
            if(table.name === value) {
                table.wrapper.classList.remove("hidden")
            } else {
                table.wrapper.classList.add("hidden")
            }
        }
    }
    async initializeLists() {
        this.allTasksTable = new DataTable(this.allTasks, {
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
            },
            "ajax": this.getAllTasksAjax,
        })
        this.lateTasksTable = new DataTable(this.lateTasks, {
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
            },
            "ajax": this.getLateTasksAjax,
        })
        this.currentTasksTable = new DataTable(this.currentTasks, {
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
            },
            "ajax": this.getCurrentTasksAjax,
        })
        this.futureTasksTable = new DataTable(this.futureTasks, {
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
            },
            "ajax": this.getFutureTasksAjax,
        })
        this.completedTasksTable = new DataTable(this.completedTasks, {
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.12.1/i18n/fr-FR.json'
            },
            "ajax": this.getCompletedTasksAjax,
        })
    }

    async getAllTasks() {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)
        let result = await window.listViewController.formatTask(tasks)
        return {
            "data" : result
        }
    }
    getLateTasksAjax = async function (data, callback, settings) {
        callback(
            await window.listViewController.getLateTasks()
        );
    }
    async getLateTasks() {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)
        let result = await window.listViewController.formatTask(tasks)
        result = result.filter(task => {
            const parts = task[3].match(/(\d+)/g);
            const date = new Date(parts[2], parts[1]-1, parts[0])
            const progress = parseInt(task[4])
            return (date < this.currentDate) && (progress === 0)
        })
        return {
            "data" : result
        }
    }
    getCurrentTasksAjax = async function (data, callback, settings) {
        callback(
            await window.listViewController.getCurrentTasks()
        );
    }
    async getCurrentTasks() {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)
        let result = await window.listViewController.formatTask(tasks)
        result = result.filter(task => {
            const parts = task[3].match(/(\d+)/g);
            const progress = parseInt(task[4])
            const date = new Date(parts[2], parts[1]-1, parts[0])
            return (date < this.currentDate) && ((progress > 0) && (progress < 100) )
        })
        return {
            "data" : result
        }
    }
    getFutureTasksAjax = async function (data, callback, settings) {
        callback(
            await window.listViewController.getFutureTasks()
        );
    }
    async getFutureTasks() {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)
        let result = await window.listViewController.formatTask(tasks)
        result = result.filter(task => {
            const parts = task[3].match(/(\d+)/g);
            const date = new Date(parts[2], parts[1]-1, parts[0])
            return (date > this.currentDate)
        })
        return {
            "data" : result
        }
    }
    getCompletedTasksAjax = async function (data, callback, settings) {
        callback(
            await window.listViewController.getCompletedTasks()
        );
    }
    async getCompletedTasks() {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)
        let result = await window.listViewController.formatTask(tasks)
        result = result.filter(task => {
            const parts = task[3].match(/(\d+)/g);
            const progress = parseInt(task[4])
            console.log(progress)
            const date = new Date(parts[2], parts[1]-1, parts[0])
            return (progress === 100)
        })
        return {
            "data" : result
        }
    }
    formatTask(tasks) {
        return tasks.map(task => {
            const begginingTime = (task.wholeDay ? '8:00' : `${parseInt(task.begginingTime.substring(0, 2))}:00`.padStart(5, '0') )
            const endTime = (task.wholeDay ? '18:00' : `${parseInt(task.endTime.substring(0, 2))}:00`)
            const date = task.wholeDay ? task.begginingDate : task.date
            return [task.name, begginingTime, endTime, date.toLocaleDateString("fr"), `${task.progression}%`]
        } )
    }


}
window.listViewController = new listViewController()
