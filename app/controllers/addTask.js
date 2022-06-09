class addTaskController extends BaseController {

    constructor() {
        super()
        this.isConnected()
            .then(result => {
                if(result.status !== 204) {
                    navigate("index")
                } else {
                    this.setTitle("Ajouter une tâche");
                    this.root = document.getElementById("root")
                    this.root.classList.remove("hidden")

                    this.divShowWholeDay = document.getElementById("show-wholeday")
                    this.divDontShowWholeDay = document.getElementById("dont-show-wholeday")
                    this.checkWholeDay = document.getElementById("wholeDay")
                    this.checkWholeDay.onclick = e => this.toggleWholeDay(e.currentTarget.checked)
                    this.taskName = document.getElementById("name")
                    this.labelName = document.getElementById("label-name")
                    this.ponctualDatePicker = document.getElementById("ponctualDatePicker")
                    this.dailyBegginingDatePicker = document.getElementById("dailyBegginingDatePicker")
                    this.dailyEndDatePicker = document.getElementById("dailyEndDatePicker")
                    this.weeklyBegginingDatePicker = document.getElementById("weeklyBegginingDatePicker")
                    this.weeklyEndDatePicker = document.getElementById("weeklyEndDatePicker")
                    this.dayOfWeekPicker = document.getElementById("dayOfWeekPicker")
                    this.monthlyBegginingDatePicker = document.getElementById("monthlyBegginingDatePicker")
                    this.monthlyEndDatePicker = document.getElementById("monthlyEndDatePicker")
                    this.dayOfMonthPicker = document.getElementById("dayOfMonthPicker")
                    this.begginingTimePicker = document.getElementById("begginingTimePicker")
                    this.endTimePicker = document.getElementById("endTimePicker")
                    const today = new Date().toISOString().split('T')[0]
                    this.ponctualDatePicker.setAttribute('min', today)
                    this.begginingDatePicker = document.getElementById("begginingDatePicker")
                    this.begginingDatePicker.setAttribute('min', today)
                    this.endDatePicker = document.getElementById("endDatePicker")
                    this.endDatePicker.setAttribute('min', today)
                    this.addTaskSubmit = document.getElementById("add-task-submit")
                    this.frequencyRadios = document.getElementsByName("frequencyRadio")

                    this.taskSuccess = document.getElementById("taskSuccess")
                    this.tasksSuccess = document.getElementById("tasksSuccess")
                    this.unknownError = document.getElementById("unknownError")
                    this.conflictError = document.getElementById("conflictError")
                    this.conflictErrors = document.getElementById("conflictErrors")
                    this.missingName = document.getElementById("missingName")
                    this.missingPonctualDate = document.getElementById("missingPonctualDate")
                    this.missingDailyBegginingDate = document.getElementById("missingDailyBegginingDate")
                    this.missingDailyEndDate = document.getElementById("missingDailyEndDate")
                    this.missingWeeklyBegginingDate = document.getElementById("missingWeeklyBegginingDate")
                    this.missingWeeklyEndDate = document.getElementById("missingWeeklyEndDate")
                    this.missingMonthlyBegginingDate = document.getElementById("missingMonthlyBegginingDate")
                    this.missingMonthlyEndDate = document.getElementById("missingMonthlyEndDate")
                    this.missingWholedayBegginingDate = document.getElementById("missingWholedayBegginingDate")
                    this.missingWholedayEndDate = document.getElementById("missingWholedayEndDate")
                    this.mustBeSuperiorThanBegginingTime = document.getElementById("mustBeSuperiorThanBegginingTime")
                    this.errors = [
                        {
                            name: "unknown",
                            element: this.unknownError
                        },
                        {
                            name: "conflict",
                            element: this.conflictError
                        },
                        {
                            name: "conflicts",
                            element: this.conflictErrors
                        },
                        {
                            name: "missing-name",
                            element: this.missingName
                        },
                        {
                            name: "missing-ponctual-date",
                            element: this.missingPonctualDate
                        },
                        {
                            name: "missing-daily-beggining-date",
                            element: this.missingDailyBegginingDate
                        },
                        {
                            name: "missing-daily-end-date",
                            element: this.missingDailyEndDate
                        },
                        {
                            name: "missing-weekly-beggining-date",
                            element: this.missingWeeklyBegginingDate
                        },
                        {
                            name: "missing-weekly-end-date",
                            element: this.missingWeeklyEndDate
                        },
                        {
                            name: "missing-monthly-beggining-date",
                            element: this.missingMonthlyBegginingDate
                        },
                        {
                            name: "missing-monthly-end-date",
                            element: this.missingMonthlyEndDate
                        },
                        {
                            name: "missing-wholeday-beggining-date",
                            element: this.missingWholedayBegginingDate
                        },
                        {
                            name: "missing-wholeday-end-date",
                            element: this.missingWholedayEndDate
                        },
                        {
                            name: "must-be-superior-than-beggining-time",
                            element: this.mustBeSuperiorThanBegginingTime
                        }

                    ]
                    //must-be-superior-than-beggining-time
                    this.ponctualFields = document.getElementById("ponctual-fields")
                    this.dailyFields = document.getElementById("daily-fields")
                    this.weeklyFields = document.getElementById("weekly-fields")
                    this.monthlyFields = document.getElementById("monthly-fields")
                    this.frequencyFields = [
                        {
                            value: 0,
                            field: this.ponctualFields
                        },
                        {
                            value: 1,
                            field: this.dailyFields
                        },
                        {
                            value: 2,
                            field: this.weeklyFields
                        },
                        {
                            value: 3,
                            field: this.monthlyFields
                        }

                    ]
                    for(const radio of this.frequencyRadios) {
                        radio.onclick = e => {
                            this.toggleFrequency(e.currentTarget.value)
                        }
                    }
                    this.toggleFrequency(0)
                   this.addTaskSubmit.onclick = e => this.addTaskSubmitHandler()
                    this.arrayFormField = {
                        loginUsername: {
                            input : this.loginUsername,
                            label: document.getElementById("label-login-username")
                        },
                    }
                    const datePickerTest = document.getElementById("datepicker-test")
                    /*const datepicker = new Datepicker(datePickerTest, {
                    });*/

                    this.currentForm = "login"
                    this.setNavbarLinks(true, "addTask");
                    this.arrayForm = [
                        {
                            name: "login",
                            form : this.loginForm,
                            tab: this.loginTab
                        },
                        {
                            name: "register",
                            form: this.registerForm,
                            tab: this.registerTab
                        }
                    ]
                }
            });
    }
    toggleFrequency(value) {
        for(const field of this.frequencyFields) {
            if(field.value == value) {
                field.field.classList.remove("hidden")
            } else {
                field.field.classList.add("hidden")
            }
        }
    }
    toggleWholeDay(checked) {
        if(checked) {
            this.divShowWholeDay.classList.remove("hidden")
            this.divDontShowWholeDay.classList.add("hidden")
        } else {
            this.divShowWholeDay.classList.add("hidden")
            this.divDontShowWholeDay.classList.remove("hidden")
        }
    }
    enableInputError(fieldGroup) {
        fieldGroup.input.classList.add("error")
        fieldGroup.label.classList.add("error")
    }
    disableInputError(fieldGroup) {
        fieldGroup.input.classList.remove("error")
        fieldGroup.label.classList.remove("error")
    }
    showError(errorName) {
        for(const error of this.errors) {
            if(error.name === errorName) {
                error.element.classList.remove("hidden");
            }
        }
    }
    hideErrors() {
        for(const error of this.errors) {
            error.element.classList.add("hidden")
        }
    }
    hideError(errorName) {
        for(const error of this.errors) {
            if(error.name === errorName) {
                error.classList.add("hidden");
            }
        }
    }
    addTaskSubmitHandler() {
        this.taskSuccess.classList.add("hidden")
        this.tasksSuccess.classList.add("hidden")
        this.hideErrors()
        this.labelName.classList.remove("error")
        this.taskName.classList.remove("error")
        this.ponctualDatePicker.classList.remove("is-invalid")
        this.dailyBegginingDatePicker.classList.remove("is-invalid")
        this.dailyEndDatePicker.classList.remove("is-invalid")
        this.weeklyBegginingDatePicker.classList.remove("is-invalid")
        this.weeklyEndDatePicker.classList.remove("is-invalid")
        this.monthlyBegginingDatePicker.classList.remove("is-invalid")
        this.monthlyEndDatePicker.classList.remove("is-invalid")
        this.endTimePicker.classList.remove("is-invalid")

        const name = this.taskName.value;
        const wholeDay = this.checkWholeDay.checked
        let frequency = null
        for (const radio of this.frequencyRadios) {
            if(radio.checked) {
                frequency = parseInt(radio.value)
            }
        }
        let date = null
        let begginingTime = null
        let endTime = null
        let begginingDate = null
        let endDate = null
        let dailyBegginingDate = null
        let dailyEndDate = null
        let weeklyBegginingDate = null
        let weeklyEndDate = null
        let dayOfWeek = null
        let monthlyBegginingDate = null
        let monthlyEndDate = null
        let dayOfMonth = null

        if(wholeDay) {
            frequency = 0
            begginingDate = this.begginingDatePicker.value
            endDate = this.endDatePicker.value
        } else {
            console.log( typeof frequency, frequency)
            if(frequency === 0) {
                console.log("tâche ponctuelle")
                date = this.ponctualDatePicker.value
            } else if(frequency === 1) {
                console.log("tâche quotidienne")
                begginingDate = this.dailyBegginingDatePicker.value
                endDate = this.dailyEndDatePicker.value
            } else if(frequency === 2) {
                console.log("tâche hebdomadaire")
                begginingDate = this.weeklyBegginingDatePicker.value
                endDate = this.weeklyEndDatePicker.value
                dayOfWeek = parseInt(this.dayOfWeekPicker.value)
            } else if(frequency === 3) {
                console.log("tâche mensuelle")
                begginingDate = this.monthlyBegginingDatePicker.value
                endDate = this.monthlyEndDatePicker.value
                dayOfMonth = parseInt(this.dayOfMonthPicker.value)
            }
            begginingTime = this.begginingTimePicker.value
            endTime = this.endTimePicker.value
        }
        const taskRepository = new TaskRepository()

        const jwt = LocalStorage.getToken()
        taskRepository.create(jwt, name, date, begginingDate, endDate, wholeDay, begginingTime, endTime, frequency, dayOfWeek, dayOfMonth)
            .then(result => {
                console.log(result)
                if(frequency>0) {
                    this.tasksSuccess.classList.remove("hidden")
                } else {
                    this.taskSuccess.classList.remove("hidden")
                }
                this.emptyFields()
            })
            .catch(err => {
                if(err.status === 400) {
                    console.log(err.response)
                    for(const error of err.response.errors) {
                        if(error.msg === 'task-conflict') {
                            if(frequency > 0) {
                                this.showError("conflicts")
                            } else {
                                this.showError("conflict")
                            }
                        }
                        if(error.msg === "missing") {
                            if(error.param === "name") {
                                console.log("ee")

                                this.showError("missing-name")
                                this.labelName.classList.add("error")
                                this.taskName.classList.add("error")
                            }
                            if(error.param === "date") {
                                if(frequency === 0) {
                                    this.ponctualDatePicker.classList.add("is-invalid")
                                    this.showError("missing-ponctual-date")
                                }
                            }
                            if(error.param === "begginingDate") {
                                if(wholeDay) {
                                    this.showError("missing-wholeday-beggining-date")
                                    this.begginingDatePicker.classList.add("is-invalid")
                                }
                                if(frequency === 1) {
                                    this.showError("missing-daily-beggining-date")
                                    this.dailyBegginingDatePicker.classList.add("is-invalid")

                                }
                                if(frequency === 2) {
                                    this.showError("missing-weekly-beggining-date")
                                    this.weeklyBegginingDatePicker.classList.add("is-invalid")

                                }
                                if(frequency === 3) {
                                    this.showError("missing-monthly-beggining-date")
                                    this.monthlyBegginingDatePicker.classList.add("is-invalid")

                                }
                            }
                            if(error.param === "endDate") {
                                if(wholeDay) {
                                    this.showError("missing-wholeday-end-date")
                                    this.endDatePicker.classList.add("is-invalid")

                                }
                                if(frequency === 1) {
                                    this.showError("missing-daily-end-date")
                                    this.dailyEndDatePicker.classList.add("is-invalid")

                                }
                                if(frequency === 2) {
                                    this.showError("missing-weekly-end-date")
                                    this.weeklyEndDatePicker.classList.add("is-invalid")
                                }
                                if(frequency === 3) {
                                    this.showError("missing-monthly-end-date")
                                    this.monthlyEndDatePicker.classList.add("is-invalid")
                                }
                            }
                        }
                        if(error.msg === "must-be-superior-than-beggining-time") {
                            this.showError("must-be-superior-than-beggining-time")
                            this.endTimePicker.classList.add("is-invalid")

                        }

                    }
                } else {
                    this.showError("unknown")
                }

            })
    }
    emptyFields() {
        this.taskName.value = ""
        this.toggleFrequency(0)
        this.toggleWholeDay(false)
        this.ponctualDatePicker.value = ""
        this.dailyBegginingDatePicker.value = ""
        this.dailyEndDatePicker.value = ""
        this.weeklyBegginingDatePicker.value = ""
        this.weeklyEndDatePicker.value = ""
        this.monthlyBegginingDatePicker.value = ""
        this.monthlyEndDatePicker.value = ""
        this.begginingDatePicker.value = ""
        this.endDatePicker.value = ""
        this.begginingTimePicker.value = "8"
        this.endTimePicker.value = "18"
        this.dayOfWeekPicker.value = "1"
        this.dayOfMonthPicker.value = "1"
    }
}

window.addTaskController = new addTaskController()
