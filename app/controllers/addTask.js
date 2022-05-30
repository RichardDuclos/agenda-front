class IndexController extends BaseController {
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
                    this.arrayFormField = {
                        loginUsername: {
                            input : this.loginUsername,
                            label: document.getElementById("label-login-username")
                        },
                    }

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
    switchForm(formName) {
        if(this.currentForm === formName) {
            return;
        }
        this.currentForm = formName
        this.arrayForm.forEach(form => {

            if(form.name === formName) {
                form.form.classList.add("active")
                form.tab.classList.add("active")
            } else {
                form.form.classList.remove("active")
                form.tab.classList.remove("active")
            }
        });
        /*if(formName === "register") {
            if(this.currentForm === "register") {
                return;
            }

            this.currentForm = "register"
            this.registerForm.classList.add("active");
            this.loginForm.classList.remove("active");

            this.registerTab.classList.add("active")
            this.registerTab.classList.remove("inactive")
            this.loginTab.classList.add("inactive")
            this.loginTab.classList.remove("active")

        } else if(formName === "login") {
            if(this.currentForm === "login") {
                return;
            }
            this.currentForm = "login"
            this.registerForm.classList.remove("active");
            this.loginForm.classList.add("active");

            this.registerTab.classList.remove("active")
            this.registerTab.classList.add("inactive")
            this.loginTab.classList.remove("inactive")
            this.loginTab.classList.add("active")
        } else {
            console.log("unknown form")
        }*/
    }

    emptyFields() {

    }
}

window.indexController = new IndexController()
