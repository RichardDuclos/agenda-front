const monthName = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre"
]
const dayName = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
]
class calendarViewController extends BaseController {

    constructor() {
        super()
        this.isConnected()
            .then(result =>  {
                if(result.status !== 204) {
                } else {
                    this.setTitle("Affichage des tâches");
                    this.root = document.getElementById("root")
                    this.setNavbarLinks(true, "displayTask");
                    //this.initializeCalendar()
                    this.calendarMonthBody = document.getElementById("calendar-month-body")

                    this.monthCalendarDays = document.getElementsByClassName("calendar_month_day_wrapper")
                    this.weekCalendarDays = document.getElementsByClassName("calendar_week_day_wrapper")
                    this.dayCalendarDay = document.getElementsByClassName("calendar_day_day_wrapper")


                    this.monthName = document.getElementById("month-name")
                    this.weekName = document.getElementById("week-name")
                    this.dayName = document.getElementById("day-name")

                    this.monthCalendarPrevious = document.getElementById("month-calendar-previous")
                    this.monthCalendarNext = document.getElementById("month-calendar-next")
                    this.monthCalendarReset = document.getElementById("month-calendar-reset")
                    this.monthCalendarReset.disabled = true
                    this.monthCalendarPrevious.onclick = e => this.previousMonthHandler()
                    this.monthCalendarNext.onclick = e => this.nextMonthHandler()
                    this.monthCalendarReset.onclick = e => this.resetMonthHandler()

                    this.weekCalendarPrevious = document.getElementById("week-calendar-previous")
                    this.weekCalendarNext = document.getElementById("week-calendar-next")
                    this.weekCalendarReset = document.getElementById("week-calendar-reset")
                    this.weekCalendarReset.disabled = true
                    this.weekCalendarPrevious.onclick = e => this.previousWeekHandler()
                    this.weekCalendarNext.onclick = e => this.nextWeekHandler()
                    this.weekCalendarReset.onclick = e => this.resetWeekHandler()

                    this.dayCalendarPrevious = document.getElementById("day-calendar-previous")
                    this.dayCalendarNext = document.getElementById("day-calendar-next")
                    this.dayCalendarReset = document.getElementById("day-calendar-reset")
                    this.dayCalendarReset.disabled = true
                    this.dayCalendarPrevious.onclick = e => this.previousDayHandler()
                    this.dayCalendarNext.onclick = e => this.nextDayHandler()
                    this.dayCalendarReset.onclick = e => this.resetDayHandler()
                    this.dayCalendarDayNameHeader = document.getElementById("calendar-day-day-name-header")

                    this.currentDate = new Date()
                    this.monthCalendarSelectedYear = this.currentDate.getFullYear()
                    this.monthCalendarSelectedMonth = this.currentDate.getMonth()
                    this.weekCalendarSelectedWeek = this.getWeekNumber(this.currentDate)[1]
                    this.weekCalendarSelectedYear = this.currentDate.getFullYear()
                    this.dayCalendarSelectedDate = new Date(this.currentDate)
                    if(this.dayCalendarSelectedDate.getDay() === 6 ||
                        this.dayCalendarSelectedDate.getDay() === 0) {
                        while(this.dayCalendarSelectedDate.getDay() === 6 ||
                        this.dayCalendarSelectedDate.getDay() === 0) {
                            this.dayCalendarSelectedDate.setDate(this.dayCalendarSelectedDate.getDate() + 1);

                        }
                    }

                    this.calendarMonth = document.getElementById("calendar-month")
                    this.calendarWeek = document.getElementById("calendar-week")
                    this.calendarDay = document.getElementById("calendar-day")
                    this.calendarWeekBody = document.getElementById("calendar-week-body")
                    this.calendarDayBody = document.getElementById("calendar-day-body")
                    this.calendarBodies = [
                        this.calendarWeek,
                        this.calendarMonth,
                        this.calendarDay
                    ]
                    this.monthCalendarRadio = document.getElementById("radioCalendarMonth")
                    this.monthCalendarRadio.onclick = e => this.showCalendar("month")
                    this.weekCalendarRadio = document.getElementById("radioCalendarWeek")
                    this.weekCalendarRadio.onclick = e => this.showCalendar("week")
                    this.dayCalendarRadio = document.getElementById("radioCalendarDay")
                    this.dayCalendarRadio.onclick = e => this.showCalendar("day")
                    const favoriteCalendar = LocalStorage.getFavoriteCalendar()
                    if(favoriteCalendar === "week") {
                        this.weekCalendarRadio.click()
                    } else if(favoriteCalendar === "day") {
                        this.dayCalendarRadio.click()
                    } else {
                        this.monthCalendarRadio.click()
                    }

                    this.showModal = document.getElementById("showModal")
                    this.updateFormName = document.getElementById("update-form-name")
                    this.updateFormProgress = document.getElementById("update-form-progress")
                    this.updateFormProgressValue = document.getElementById("update-form-progress-value")
                    this.updateFormProgress.oninput = e => this.updateFormProgressValue.innerText = e.currentTarget.value
                    this.applyToAll = document.getElementById("applyToAll")
                    this.applyToAllWrapper = document.getElementById("applyToAllWrapper")
                    this.closeModal = document.getElementById("closeModal")
                    this.updateSave = document.getElementById("updateSave")
                    this.disabledField = false;
                    this.editLabel = document.getElementById("editLabel")
                    this.editUpdate = document.getElementById("editUpdate")
                    this.saveName = ""
                    this.saveProgress = 0
                    this.saveApply = false
                    this.editUpdate.onclick = e => this.toggleDisabledField()

                    this.toggleDisabledField()

                    this.fillCalendars().then(result => {
                        this.root.classList.remove("hidden")

                    })

                }
            });
    }
    showCalendar(calendarName) {
        this.calendarBodies.forEach(calendar => {
            if(calendar.getAttribute("data-name") !== calendarName) {
                calendar.classList.add("hidden")
            } else {
                calendar.classList.remove("hidden")
            }
        })


    }


    toggleDisabledField() {
        this.disabledField = !this.disabledField
        this.updateFormName.disabled = this.disabledField
        this.updateFormProgress.disabled = this.disabledField
        this.applyToAll.disabled = this.disabledField
        if(this.disabledField) {
            this.editLabel.innerText = "Modifier"
            this.updateFormName.value = this.saveName
            this.updateFormProgress.value = this.saveProgress
            this.updateFormProgressValue.innerText = this.saveProgress
            this.applyToAll.checked = this.saveApply

        } else {
            this.editLabel.innerText = "Annuler"
            this.saveName = this.updateFormName.value
            this.saveProgress = this.updateFormProgress.value
            this.saveApply = this.applyToAll.checked

        }
    }

    displayTask(task, day, displayData, calendar) {
        const taskWrapper = day.getElementsByClassName("task-content")[0]
        const begginingTime = task.wholeDay ? 8 : parseInt(task.begginingTime.substring(0, 2))

        const endTime = task.wholeDay ? 18 : parseInt(task.endTime.substring(0, 2))
        taskWrapper.innerHTML += this.getTaskBody(task.id, task.name, begginingTime, endTime, task.progression, displayData, calendar, task.repeatingId)
    }
    taskClickHandler(id, name, progress, repeatingId) {
        this.updateFormName.value = name
        this.updateFormProgress.value = progress
        this.updateFormProgressValue.innerText = progress
        const task = {
            id: id,
            name: name,
            progress: progress,
            repeatingId: repeatingId
        }
        if(repeatingId) {
            this.applyToAllWrapper.classList.remove("hidden")
        } else {
            this.applyToAllWrapper.classList.add("hidden")

        }
        this.updateSave.onclick = e => this.updateTaskHandler(task)
        this.showModal.click()
    }
    updateTaskHandler(task) {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        task.name = this.updateFormName.value
        task.progress = this.updateFormProgress.value
        const applyToAll = !!(task.repeatingId && this.applyToAll.checked);
        taskRepository.update(jwt, task, applyToAll)
            .then(result => {
                console.log(result)
                if(!this.disabledField) {
                    this.toggleDisabledField()
                }
                this.fillCalendars()
                this.closeModal.click()
            })
            .catch(error => {
                console.log(error)
            })
    }


}

window.calendarViewController = new calendarViewController()
