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
                    navigate("login")
                } else {
                    this.setTitle("Calendrier des tâches");
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
                    this.currentDate.setHours(2)
                    this.currentDate.setMinutes(0)
                    this.currentDate.setSeconds(0)
                    this.currentDate.setMilliseconds(0)
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
                    this.modalDeleteConfirm = document.getElementById("deleteConfirm")
                    this.showModal = document.getElementById("showModal")
                    this.updateFormName = document.getElementById("update-form-name")
                    this.updateFormProgress = document.getElementById("update-form-progress")
                    this.updateFormProgressValue = document.getElementById("update-form-progress-value")
                    this.updateFormProgress.oninput = e => this.updateFormProgressValue.innerText = e.currentTarget.value
                    this.deleteTask = document.getElementById("delete-task")
                    this.deleteAllTasks = document.getElementById("delete-all-tasks")
                    this.applyToAll = document.getElementById("applyToAll")
                    this.applyToAllWrapper = document.getElementById("applyToAllWrapper")
                    this.closeModal = document.getElementById("closeModal")
                    this.closeConfirmDelete = document.getElementById("closeConfirmDelete")
                    this.closeConfirmDeleteAll = document.getElementById("closeConfirmDeleteAll")
                    this.deleteConfirmationCloseButtons = document.getElementsByClassName("delete-confirmation-close")

                    this.confirmDeleteTask = document.getElementById("confirm-delete-task")
                    this.confirmDeleteTaskAll = document.getElementById("confirm-delete-task-all")

                    this.updateSave = document.getElementById("updateSave")
                    this.disabledField = false;
                    this.editLabel = document.getElementById("editLabel")
                    this.editUpdate = document.getElementById("editUpdate")
                    this.saveName = ""
                    this.saveProgress = 0
                    this.editWhenStarted = document.getElementById("edit-when-started")
                    this.saveApply = false
                    this.editUpdate.onclick = e => this.toggleDisabledField()

                    this.toggleDisabledField()

                    this.fillCalendars().then(result => {
                        this.root.classList.remove("hidden")
                    })

                }
            })

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
    async fillCalendars() {
        // get the data
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        const tasks = await taskRepository.getAll(jwt)

        this.fillMonthlyCalendar(tasks)
        this.fillWeeklyCalendar(tasks)
        this.fillDailyCalendar(tasks)
    }
    fillDailyCalendar(tasks) {

        let day = new Date(this.dayCalendarSelectedDate)
        this.calendarDayBody.innerHTML = this.getDayCalendarDay();
        this.dayName.innerText = `${monthName[day.getMonth()]} ${day.getFullYear()}`
        this.dayCalendarDay = document.getElementsByClassName("calendar_day_day_wrapper")[0]
        this.dayCalendarDayCellSetContent(this.dayCalendarDay, day)

        tasks.forEach(task => {

            if(task.wholeDay &&
                (task.begginingDate.getDate() !== task.endDate.getDate() ||
                    task.begginingDate.getMonth() !== task.endDate.getMonth() ||
                    task.begginingDate.getFullYear() !== task.endDate.getFullYear())
            ) {

                if(task.begginingDate <= this.dayCalendarSelectedDate && this.dayCalendarSelectedDate <= task.endDate)
                {
                    const difference = ((task.endDate - task.begginingDate) / (1000 * 3600 * 24)) + 1
                    let cpt = 1
                    const loopDay = new Date(task.begginingDate)
                    while(loopDay.getFullYear() !== task.endDate.getFullYear() ||
                        loopDay.getMonth() !== task.endDate.getMonth() ||
                        loopDay.getDate() !== task.endDate.getDate() + 1) {
                        if(loopDay.getDay() === 6 || loopDay.getDay() === 0) {
                            while(loopDay.getDay() !== 1) {
                                loopDay.setDate(loopDay.getDate() + 1)
                            }
                        }
                        if(loopDay.getFullYear() === this.dayCalendarSelectedDate.getFullYear() &&
                            loopDay.getMonth() === this.dayCalendarSelectedDate.getMonth() &&
                            loopDay.getDate() === this.dayCalendarSelectedDate.getDate()) {
                            task.displayName = `${cpt} - ${task.name}`

                            this.displayTask(task, this.dayCalendarDay, true, "day")
                        }
                        loopDay.setDate(loopDay.getDate() + 1);
                        cpt++
                    }
                }
            } else {
                if(this.currentDate.getFullYear() === this.dayCalendarSelectedDate.getFullYear() &&
                    this.currentDate.getMonth() === this.dayCalendarSelectedDate.getMonth() &&
                    this.currentDate.getDate() === this.dayCalendarSelectedDate.getDate()) {
                    this.displayTask(task, this.dayCalendarDay, true, "day")
                }

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
    fillWeeklyCalendar(tasks) {
        const weekDay = new Date(this.getDateOfISOWeek( this.weekCalendarSelectedWeek, this.weekCalendarSelectedYear))
        let loopDay = new Date(weekDay)
        this.calendarWeekBody.innerHTML = this.getWeeklyCalendarWeek();
        this.weekName.innerText = `${monthName[weekDay.getMonth()]} ${weekDay.getFullYear()} - Semaine ${this.weekCalendarSelectedWeek}`
        this.weekCalendarDays = document.getElementsByClassName("calendar_week_day_wrapper")
        for(const day of this.weekCalendarDays) {
            this.weekCalendarDayCellSetContent(day, loopDay)

            loopDay.setDate(loopDay.getDate() + 1);
        }
        tasks.forEach(task => {
            if(task.wholeDay &&
                (task.begginingDate.getDate() !== task.endDate.getDate() ||
                    task.begginingDate.getMonth() !== task.endDate.getMonth() ||
                    task.begginingDate.getFullYear() !== task.endDate.getFullYear())
            ) {
                const monday = this.getMonday(weekDay)
                monday.setHours(2)
                const friday = this.getFriday(weekDay)
                friday.setHours(2)
                if(
                    (task.begginingDate <= monday && task.endDate >= monday) ||
                    (task.begginingDate <= friday && task.endDate >= friday) ||
                    (task.begginingDate > monday && task.endDate < friday) ||
                    (task.begginingDate <= monday && task.endDate <= friday)
                ) {
                    loopDay = new Date(task.begginingDate)
                    let cpt = 1;
                    while(loopDay.getFullYear() !== task.endDate.getFullYear() ||
                        loopDay.getMonth() !== task.endDate.getMonth() ||
                        loopDay.getDate() !== task.endDate.getDate() + 1) {
                        if(loopDay.getDay() === 6 || loopDay.getDay() === 0) {
                            while(loopDay.getDay() !== 1) {
                                loopDay.setDate(loopDay.getDate() + 1)
                            }
                        }
                        const day = this.calendarWeekBody.querySelector(`[data-date="${loopDay.toLocaleDateString("fr")}"]`)
                        if(day) {
                            task.displayName = `${cpt} - ${task.name}`
                            this.displayTask(task, day, true, "week")
                        }
                        cpt++
                        loopDay.setDate(loopDay.getDate() + 1);
                    }

                }
            } else {
                //the task is not a wholeday task, or is a wholeday task but is on a single day
                const day = task.wholeDay ?
                    this.calendarWeekBody.querySelector(`[data-date="${task.begginingDate.toLocaleDateString("fr")}"]`) :
                    this.calendarWeekBody.querySelector(`[data-date="${task.date.toLocaleDateString("fr")}"]`)
                if(day) {
                    this.displayTask(task, day, true, "week")
                }
            }
        })
    }
    fillMonthlyCalendar(tasks) {
        // build the calendar
        const weekCount = this.weekCount(this.monthCalendarSelectedYear, this.monthCalendarSelectedMonth + 1)
        this.calendarMonthBody.innerHTML = ""
        for(let i = 0; i < weekCount; i++) {
            //create the cells
            this.calendarMonthBody.innerHTML += this.getMonthCalendarWeek();
        }
        this.monthName.innerText = `${monthName[this.monthCalendarSelectedMonth]} ${this.monthCalendarSelectedYear}`
        let loopDay = this.getMonday(new Date(this.monthCalendarSelectedYear, this.monthCalendarSelectedMonth, 1));
        const firstDayOfDisplayedMonth = new Date(loopDay.setHours(2))
        this.monthCalendarDays = document.getElementsByClassName("calendar_month_day_wrapper")
        for(const day of this.monthCalendarDays) /* fill the cell with numbers */ {
            if(loopDay.getDay() === 6 || loopDay.getDay() === 0) {
                while(loopDay.getDay() !== 1) {
                    loopDay.setDate(loopDay.getDate() + 1)
                }
            }
            const numberWrapper = day.getElementsByClassName("day_number_wrapper")[0]
            const taskWrapper = day.getElementsByClassName("task-content")[0]
            taskWrapper.innerHTML = ""
            numberWrapper.innerText = loopDay.getDate()
            day.setAttribute('data-date', loopDay.toLocaleDateString("fr"))
            day.setAttribute('data-day-of-month', loopDay.getDate())
            day.setAttribute('data-day-of-week', loopDay.getDay())
            if(loopDay.getMonth() !== this.monthCalendarSelectedMonth) {
                day.classList.add("inactive")
            } else {
                day.classList.remove("inactive")
            }
            if(loopDay.getDate() === this.currentDate.getDate() &&
                loopDay.getMonth() === this.currentDate.getMonth() &&
                loopDay.getFullYear() === this.currentDate.getFullYear()) {
                day.classList.add("current")
            } else {
                day.classList.remove("current")
            }
            loopDay.setDate(loopDay.getDate() + 1);

        }
        const lastDayOfDisplayedMonth = new Date(loopDay.setHours(2))

        tasks.forEach(task => {
                if(task.wholeDay &&
                        (task.begginingDate.getDate() !== task.endDate.getDate() ||
                        task.begginingDate.getMonth() !== task.endDate.getMonth() ||
                        task.begginingDate.getFullYear() !== task.endDate.getFullYear())
                ) {
                        if(
                            (task.begginingDate <= firstDayOfDisplayedMonth && task.endDate >= firstDayOfDisplayedMonth) ||
                            (task.begginingDate <= lastDayOfDisplayedMonth && task.endDate >= lastDayOfDisplayedMonth) ||
                            (task.begginingDate > firstDayOfDisplayedMonth && task.endDate < lastDayOfDisplayedMonth) ||
                            (task.begginingDate <= firstDayOfDisplayedMonth && task.endDate <= lastDayOfDisplayedMonth)

                        ) {
                            loopDay = new Date(task.begginingDate)
                            let cpt = 1
                            while(loopDay.getFullYear() !== task.endDate.getFullYear() ||
                            loopDay.getMonth() !== task.endDate.getMonth() ||
                            loopDay.getDate() !== task.endDate.getDate() + 1) {
                                if(loopDay.getDay() === 6 || loopDay.getDay() === 0) {
                                    while(loopDay.getDay() !== 1) {
                                        loopDay.setDate(loopDay.getDate() + 1)
                                    }
                                }
                                const day = this.calendarMonthBody.querySelector(`[data-date="${loopDay.toLocaleDateString("fr")}"]`)

                                if(day) {
                                    task.displayName = `${cpt} - ${task.name}`
                                    this.displayTask(task, day, true, "month")
                                }
                                cpt++
                                loopDay.setDate(loopDay.getDate() + 1);
                            }

                        }

                } else {
                    const day = task.wholeDay ?
                        this.calendarMonthBody.querySelector(`[data-date="${task.begginingDate.toLocaleDateString("fr")}"]`) :
                        this.calendarMonthBody.querySelector(`[data-date="${task.date.toLocaleDateString("fr")}"]`)
                    if(day) {
                        this.displayTask(task, day, true, "month")
                    }
                }

        })
    }
    dayCalendarDayCellSetContent(day, loopDay) {
        const numberWrapper = day.getElementsByClassName("day_number_wrapper")[0]
        const taskWrapper = day.getElementsByClassName("task-content")[0]
        this.dayCalendarDayNameHeader.innerText = dayName[loopDay.getDay()]
        taskWrapper.innerHTML = ""
        numberWrapper.innerText = loopDay.getDate()
        day.setAttribute('data-date', loopDay.toLocaleDateString("fr"))
        day.setAttribute('data-day-of-month', loopDay.getDate())
        day.setAttribute('data-day-of-week', loopDay.getDay())
        if(loopDay.getDate() === this.currentDate.getDate() &&
            loopDay.getMonth() === this.currentDate.getMonth() &&
            loopDay.getFullYear() === this.currentDate.getFullYear()) {
            day.classList.add("current")
        } else {
            day.classList.remove("current")
        }
    }

    weekCalendarDayCellSetContent(day, loopDay) {
        const numberWrapper = day.getElementsByClassName("day_number_wrapper")[0]
        const taskWrapper = day.getElementsByClassName("task-content")[0]
        taskWrapper.innerHTML = ""
        numberWrapper.innerText = loopDay.getDate()
        day.setAttribute('data-date', loopDay.toLocaleDateString("fr"))
        day.setAttribute('data-day-of-month', loopDay.getDate())
        day.setAttribute('data-day-of-week', loopDay.getDay())
        if(loopDay.getDate() === this.currentDate.getDate() &&
            loopDay.getMonth() === this.currentDate.getMonth() &&
            loopDay.getFullYear() === this.currentDate.getFullYear()) {
            day.classList.add("current")
        } else {
            day.classList.remove("current")
        }
    }
    displayTask(task, day, displayData, calendar) {
        const taskWrapper = day.getElementsByClassName("task-content")[0]
        if(task.displayName === undefined) {
            task.displayName = task.name
        }
        taskWrapper.innerHTML += this.getTaskBody(task, calendar, displayData)
    }
    taskClickHandler(textTask) {
        let task = textTask.replace(/%27/, "'")
        task = decodeURI(textTask)
        task = JSON.parse(task)
        if(task.date) {
            task.date = new Date(task.date)
        }
        if(task.begginingDate) {
            task.begginingDate = new Date(task.begginingDate)
        }
        if(task.endDate) {
            task.endDate = new Date(task.endDate)
        }
        this.updateFormName.value = task.name
        this.updateFormProgress.value = task.progression
        this.updateFormProgressValue.innerText = task.progression
        if(task.repeatingId === null) {
            this.applyToAllWrapper.classList.add("hidden")
        } else {
                this.applyToAllWrapper.classList.remove("hidden")
        }
        if((task.date && (task.date > this.currentDate) ||
            (task.begginingDate && (task.begginingDate > this.currentDate)))
            ) {
            this.editUpdate.classList.add("hidden")
            this.updateSave.classList.add("hidden")
            this.editWhenStarted.classList.remove("hidden")
        } else {
            this.editUpdate.classList.remove("hidden")
            this.updateSave.classList.remove("hidden")
            this.editWhenStarted.classList.add("hidden")

        }
        this.updateSave.onclick = e => this.updateTaskHandler(task)
        this.confirmDeleteTask.onclick = e => this.deleteTaskHandler(task, false)
        this.confirmDeleteTaskAll.onclick = e => this.deleteTaskHandler(task, true)
        if(task.repeatingId === null) {
            this.deleteAllTasks.classList.add("disabled")
        } else {
            this.deleteAllTasks.classList.remove("disabled")
        }
        this.showModal.click()
    }
    deleteTaskHandler(task, applyToAll) {
        const taskRepository = new TaskRepository()
        const jwt = LocalStorage.getToken()
        taskRepository.delete(jwt, task, applyToAll)
            .then(result => {
                this.fillCalendars()
                for(const button of this.deleteConfirmationCloseButtons) {
                    button.click()
                }
            })
            .catch(error => {
                console.log(error)
            })
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
    previousMonthHandler() {
        if(this.monthCalendarSelectedMonth > 0) {
            this.monthCalendarSelectedMonth--
        } else {
            this.monthCalendarSelectedMonth = 11
            this.monthCalendarSelectedYear--
        }
        if(this.currentDate.getMonth() === this.monthCalendarSelectedMonth && this.currentDate.getFullYear() === this.monthCalendarSelectedYear) {
            this.monthCalendarReset.disabled = true;
        } else {
            this.monthCalendarReset.disabled = false;
        }
        this.fillCalendars()
    }
    nextMonthHandler() {
        if(this.monthCalendarSelectedMonth < 11) {
            this.monthCalendarSelectedMonth++
        } else {
            this.monthCalendarSelectedMonth = 0
            this.monthCalendarSelectedYear++
        }
        if(this.currentDate.getMonth() === this.monthCalendarSelectedMonth && this.currentDate.getFullYear() === this.monthCalendarSelectedYear) {
            this.monthCalendarReset.disabled = true;
        } else {
            this.monthCalendarReset.disabled = false;
        }
        this.fillCalendars()
    }
    resetMonthHandler() {
        this.monthCalendarSelectedMonth = this.currentDate.getMonth()
        this.monthCalendarSelectedYear = this.currentDate.getFullYear()
        this.monthCalendarReset.disabled = true;
        this.fillCalendars()
    }

    previousDayHandler() {
        this.dayCalendarSelectedDate.setDate(this.dayCalendarSelectedDate.getDate() - 1);
        if(this.dayCalendarSelectedDate.getDay() === 6 ||
            this.dayCalendarSelectedDate.getDay() === 0) {
            while(this.dayCalendarSelectedDate.getDay() === 6 ||
            this.dayCalendarSelectedDate.getDay() === 0) {
                this.dayCalendarSelectedDate.setDate(this.dayCalendarSelectedDate.getDate() - 1);

            }
        }
        if(this.dayCalendarSelectedDate.getFullYear() === this.currentDate.getFullYear() &&
            this.dayCalendarSelectedDate.getMonth() === this.currentDate.getMonth() &&
            this.dayCalendarSelectedDate.getDate() === this.currentDate.getDate()) {
            this.dayCalendarReset.disabled = true
        } else {
            this.dayCalendarReset.disabled = false
        }
        this.fillCalendars()
    }
    nextDayHandler() {
        this.dayCalendarSelectedDate.setDate(this.dayCalendarSelectedDate.getDate() + 1);
        if(this.dayCalendarSelectedDate.getDay() === 6 ||
            this.dayCalendarSelectedDate.getDay() === 0) {
                while(this.dayCalendarSelectedDate.getDay() === 6 ||
                    this.dayCalendarSelectedDate.getDay() === 0) {
                    this.dayCalendarSelectedDate.setDate(this.dayCalendarSelectedDate.getDate() + 1);

                }
        }
        if(this.dayCalendarSelectedDate.getFullYear() === this.currentDate.getFullYear() &&
            this.dayCalendarSelectedDate.getMonth() === this.currentDate.getMonth() &&
            this.dayCalendarSelectedDate.getDate() === this.currentDate.getDate()) {
            this.dayCalendarReset.disabled = true
        } else {
            this.dayCalendarReset.disabled = false
        }
        this.fillCalendars()
    }
    resetDayHandler() {
        this.dayCalendarSelectedDate = new Date(this.currentDate);
        this.monthCalendarReset.disabled = true;
        this.fillCalendars()
    }
    previousWeekHandler() {
        if(this.weekCalendarSelectedWeek > 1) {
            this.weekCalendarSelectedWeek--
        } else {
            this.monthCalendarSelectedYear--

            this.weekCalendarSelectedWeek = this.weeksInYear(this.monthCalendarSelectedYear)
        }
        if( this.getWeekNumber(this.currentDate)[1] === this.weekCalendarSelectedWeek) {
            this.weekCalendarReset.disabled = true;
        } else {
            this.weekCalendarReset.disabled = false;
        }
        this.fillCalendars()
    }
    nextWeekHandler() {
        if(this.weekCalendarSelectedWeek < this.weeksInYear(this.monthCalendarSelectedYear)) {
            this.weekCalendarSelectedWeek++
        } else {
            this.weekCalendarSelectedWeek = 1
            this.monthCalendarSelectedYear++
        }
        if( this.getWeekNumber(this.currentDate)[1] === this.weekCalendarSelectedWeek) {
            this.weekCalendarReset.disabled = true;
        } else {
            this.weekCalendarReset.disabled = false;
        }
        this.fillCalendars()
    }
    resetWeekHandler() {
        this.weekCalendarSelectedYear = this.currentDate.getFullYear()
        this.weekCalendarSelectedWeek = this.getWeekNumber(this.currentDate)[1]
        this.monthCalendarReset.disabled = true;
        this.fillCalendars()
    }

    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    getFriday(d) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 5 ? -2:5); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
    getWeeklyCalendarWeek() {
        return `
        
                    <div class="row calendar_week_week-wrapper">
                <div class="col calendar_week_day_wrapper">
                    <div class="day_number_wrapper">
                    1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div class="col calendar_week_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>

                </div>
                <div class="col calendar_week_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div  class="col calendar_week_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div  class="col calendar_week_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>

            </div>

        `
    }

    getMonthCalendarWeek() {
        return `
        
                    <div class="row calendar_month_week-wrapper">
                <div class="col calendar_month_day_wrapper">
                    <div class="day_number_wrapper">
                        
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <!--<div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>-->

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div class="col calendar_month_day_wrapper">
                    <div class="day_number_wrapper">
                        
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <!--<div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>-->

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div class="col calendar_month_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <!--<div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>-->

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div  class="col calendar_month_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <!--<div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>-->

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>
                <div  class="col calendar_month_day_wrapper">
                    <div class="day_number_wrapper">
                        1
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <!--<div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>-->

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>

            </div>

        `
    }
    getDayCalendarDay() {
        return `
        
            <div class="row calendar_month_week-wrapper">
                <div class="col calendar_day_day_wrapper">
                    <div class="day_number_wrapper">
                        E
                    </div>
                    <div class="task-wrapper" >
                         <div class="task-background">
                            <div class="task-background-row"><div class="task-background-col">8h</div></div>
                            <div class="task-background-row"><div class="task-background-col">9h</div></div>
                            <div class="task-background-row"><div class="task-background-col">10h</div></div>
                            <div class="task-background-row"><div class="task-background-col">11h</div></div>
                            <div class="task-background-row"><div class="task-background-col">12h</div></div>
                            <div class="task-background-row"><div class="task-background-col">13h</div></div>
                            <div class="task-background-row"><div class="task-background-col">14h</div></div>
                            <div class="task-background-row"><div class="task-background-col">15h</div></div>
                            <div class="task-background-row"><div class="task-background-col">16h</div></div>
                            <div class="task-background-row"><div class="task-background-col">17h</div></div>

                        </div>
                        <div class="task-content">
    
                        </div>
   
                    </div>
                </div>

            </div>

        `
    }

    weekCount(year, month_number) {

        // month_number is in the range 1..12

        const firstOfMonth = new Date(year, month_number-1, 1);
        const lastOfMonth = new Date(year, month_number, 0);
        const [year1, firstWeek] = this.getWeekNumber(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), firstOfMonth.getDate()))
        const [year2, lastWeek] = this.getWeekNumber(new Date(lastOfMonth.getFullYear(), lastOfMonth.getMonth(), lastOfMonth.getDate()))

        return (lastWeek-firstWeek) + 1
    }
    getWeekNumber(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
    }

    getTaskBody(task, calendar, displayText) {
        const begginingTime = (task.wholeDay ? 8 : parseInt(task.begginingTime.substring(0, 2))) - 8
        const endTime = (task.wholeDay ? 18 : parseInt(task.endTime.substring(0, 2))) - 8
        let height;
        if(calendar === "month") {
            height = "2em"
        } else if(calendar === "week") {
            height = "60px"
        } else if(calendar === "day") {
            height = "60px"
        }

        const duration = endTime - begginingTime
        const stringTask = encodeURI((JSON.stringify(task)).replace(/'/g, "%27"))
        let result = `
        <div class="task-body"
            style="height: calc(${height}*${duration}); position: absolute; top: calc(${height}*${begginingTime})" 
                        onclick="window.calendarViewController.taskClickHandler('${stringTask}')"

            >`
        if(displayText) {
            result += `
            <div class="task-name">${task.displayName}</div>
            <div class="task-progress">
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${task.progression}%;" aria-valuenow="${task.progression}" aria-valuemin="0" aria-valuemax="100">${task.progression=== 100 ? 'Terminée': `${task.progression}%`}</div>
`
        }

        result += `
        </div>`
        return result
    }
    getDaysInMonth(month, year, day) {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            if(date.getDay() === day) {
                days.push(new Date(date));
            }
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    getDateOfISOWeek(w, y) {
        var simple = new Date(y, 0, 1 + (w - 1) * 7);

        var dow = simple.getDay();

        var ISOweekStart = simple;
        if (dow <= 4) {

            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);

        }
        else {
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());


        }
        return ISOweekStart;
    }

    weeksInYear(year) {
        var month = 11,
            day = 31,
            week;

        // Find week that 31 Dec is in. If is first week, reduce date until
        // get previous week.
        do {
            const d = new Date(year, month, day--);
            week = this.getWeekNumber(d)[1];
        } while (week == 1);

        return week;
    }


}

window.calendarViewController = new calendarViewController()
