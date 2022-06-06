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
                    this.checkWholeDay.onclick = e => this.toggleFrequency(e.currentTarget.checked)
                    this.taskName = document.getElementById("name")
                    this.datePicker = document.getElementById("datePicker")
                    const today = new Date().toISOString().split('T')[0]
                    this.datePicker.setAttribute('min', today)
                    this.begginingDatePicker = document.getElementById("begginingDatePicker")
                    this.begginingDatePicker.setAttribute('min', today)
                    this.endDatePicker = document.getElementById("endDatePicker")
                    this.endDatePicker.setAttribute('min', today)
                    this.addTaskSubmit = document.getElementById("add-task-submit")
                    this.frequencyRadios = document.getElementsByName("frequencyRadio")
                    this.begginingTimePicker = document.getElementById("begginingTimePicker")
                    this.endTimePicker = document.getElementById("endTimePicker")
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
                    this.errors = [

                    ]
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
    toggleFrequency(checked) {
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
    showError(error) {
        error.classList.remove("hidden");
    }
    hideError(error) {
        error.classList.add("hidden");
    }
    addTaskSubmitHandler() {
        const name = this.taskName.value;
        const wholeDay = this.checkWholeDay.checked
        let frequency = null
        for (const radio of this.frequencyRadios) {
            if(radio.checked) {
                frequency = radio.value
            }
        }
        let date = null
        let begginingTime = null
        let endTime = null
        let begginingDate = null
        let endDate = null
        if(wholeDay) {
            frequency = 0
            begginingDate = this.begginingDatePicker.value
            endDate = this.endDatePicker.value
        } else {
            date = this.datePicker.value
            begginingTime = this.begginingTimePicker.value
            endTime = this.endTimePicker.value
        }
        const taskRepository = new TaskRepository()
        console.log(name, wholeDay, frequency, date, begginingTime,
            endTime, begginingDate, endDate)
        const jwt = LocalStorage.getToken()
        taskRepository.create(jwt, name, date, begginingDate, endDate, wholeDay, begginingTime, endTime, frequency)
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.log(err)

            })
    }
    emptyFields() {

    }
}

window.addTaskController = new addTaskController()
