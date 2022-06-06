class LoginController extends BaseController {
    constructor() {
        super()

        this.isConnected()
            .then(result => {
                if(result.status === 204) {
                    navigate("calendarView")
                } else {
                    this.setTitle("Se connecter");
                    this.root = document.getElementById("root")
                    this.root.classList.remove("hidden")
                    this.registerTab = document.getElementById("register-tab")
                    this.loginTab = document.getElementById("login-tab")

                    this.registerForm = document.getElementById("form-register")
                    this.loginForm = document.getElementById("form-login")

                    this.registerTab.onclick = e => this.switchForm("register")
                    this.loginTab.onclick = e => this.switchForm("login")

                    this.loginUsername = document.getElementById("login-username")
                    this.loginPassword = document.getElementById("login-password")
                    this.loginSubmit = document.getElementById("login-submit")
                    this.loginSubmit.onclick = e => this.loginSubmitHandler()

                    this.registerUsername = document.getElementById("register-username")
                    this.registerFirstname = document.getElementById("register-firstname")
                    this.registerLastname = document.getElementById("register-lastname")
                    this.registerPassword = document.getElementById("register-password")
                    this.registerPasswordConfirm = document.getElementById("register-password-confirm")
                    this.registerSubmit = document.getElementById("register-submit")
                    this.registerSubmit.onclick = e => this.registerSubmitHandler()
                    this.arrayFormField = {
                        loginUsername: {
                            input : this.loginUsername,
                            label: document.getElementById("label-login-username")
                        },
                        loginPassword: {
                            input: this.loginPassword,
                            label: document.getElementById("label-login-password")
                        },
                        registerUsername: {
                            input: this.registerUsername,
                            label: document.getElementById("label-register-username")
                        },
                        registerFirstname: {
                            input: this.registerFirstname,
                            label: document.getElementById("label-register-firstname")
                        },
                        registerLastname: {
                            input: this.registerLastname,
                            label: document.getElementById("label-register-lastname")
                        },
                        registerPassword: {
                            input: this.registerPassword,
                            label: document.getElementById("label-register-password")
                        },
                        registerPasswordConfirm: {
                            input: this.registerPasswordConfirm,
                            label: document.getElementById("label-register-password-confirm")
                        }

                    }
                    this.loginWrongId = document.getElementById("login-wrong-id")
                    this.registerUsernameEmpty = document.getElementById("register-username-empty")
                    this.registerUsernameTooShort = document.getElementById("register-username-too-short")
                    this.registerUsernameTooLong = document.getElementById("register-username-too-long")
                    this.registerUsernameTaken = document.getElementById("register-username-already-taken")
                    this.registerFirstnameEmpty = document.getElementById("register-firstname-empty")
                    this.registerFirstnameTooLong = document.getElementById("register-firstname-too-long")
                    this.registerLastnameEmpty = document.getElementById("register-lastname-empty")
                    this.registerLastnameTooLong = document.getElementById("register-lastname-too-long")
                    this.registerPasswordEmpty = document.getElementById("register-password-empty")
                    this.registerPasswordTooShort = document.getElementById("register-password-too-short")
                    this.registerPasswordTooLong = document.getElementById("register-password-too-long")
                    this.registerPasswordConfirmEmpty = document.getElementById("register-password-confirm-empty")
                    this.registerPasswordNoNumber = document.getElementById("register-password-no-number")
                    this.registerPasswordNoLetter = document.getElementById("register-password-no-letter")
                    this.registerPasswordNoLowercase = document.getElementById("register-password-no-lowercase")
                    this.registerPasswordNoUppercase = document.getElementById("register-password-no-uppercase")
                    this.registerPasswordConfirmNoMatch = document.getElementById("register-password-confirm-no-match")
                    this.errors = [
                        this.loginWrongId,
                        this.registerUsernameEmpty,
                        this.registerUsernameTooShort,
                        this.registerUsernameTooLong,
                        this.registerUsernameTaken,
                        this.registerFirstnameEmpty,
                        this.registerLastnameEmpty,
                        this.registerPasswordEmpty,
                        this.registerPasswordTooShort,
                        this.registerPasswordTooLong,
                        this.registerPasswordConfirmEmpty,
                        this.registerPasswordNoNumber,
                        this.registerPasswordNoLetter,
                        this.registerPasswordNoLowercase,
                        this.registerPasswordNoUppercase,
                        this.registerPasswordConfirmNoMatch
                    ]
                    this.currentForm = "login"
                    this.setNavbarLinks(false, "index");
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
    loginSubmitHandler() {
        this.errors.forEach(error => this.hideError(error))
        for(let e in this.arrayFormField) {
            this.disableInputError(this.arrayFormField[e])
        }
        let error = false;
        if(this.loginUsername.value.trim() === "") {
            this.enableInputError(this.arrayFormField.loginUsername)
            error = true;
        } else {
            this.disableInputError(this.arrayFormField.loginUsername)
        }
        if(this.loginPassword.value === "") {
            this.enableInputError(this.arrayFormField.loginPassword)
            error = true;
        } else {
            this.disableInputError(this.arrayFormField.loginPassword)
        }
        if(error) {
            return;
        }
        const userRepository = new UserRepository()
        this.showMainSpinner()
        userRepository.login(this.loginUsername.value, this.loginPassword.value)
            .then(result => {
                /*Success*/
                this.hideMainSpinner();
                LocalStorage.saveToken(result.response.token);
                navigate("calendarView");
            })
            .catch(err => {
                this.hideMainSpinner();
                this.hideMainSpinner()
                if(err.status === 400) /* field validation failed */ {
                    err.response.errors.forEach(error => {
                        console.log(error.param, error.msg)
                        if(error.param === 'username') {
                            if(error.msg === "missing") {
                                this.showError(this.registerUsernameEmpty)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                            if(error.msg === "too-short") {
                                this.showError(this.registerUsernameTooShort)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                            if(error.msg === "too-long") {
                                this.showError(this.registerUsernameTooShort)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                            if(error.msg === "already-used") {
                                this.showError(this.registerUsernameTaken)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                        }

                    });
                }
                if(err.status === 401) /* wrong username or password */ {
                    this.showError(this.loginWrongId)
                }
            })


    }
    registerSubmitHandler() {

        let erreur = false;
        this.errors.forEach(error => this.hideError(error))
        for(let e in this.arrayFormField) {
            this.disableInputError(this.arrayFormField[e])
        }
        if(this.registerUsername.value.trim() === "") {
            this.showError(this.registerUsernameEmpty)
            this.enableInputError(this.arrayFormField.registerUsername)
            erreur = true;
        } else if(this.registerUsername.value.trim().length < 5) {
            this.showError(this.registerUsernameTooShort)
            this.enableInputError(this.arrayFormField.registerUsername)
            erreur = true;
        } else if(this.registerUsername.value.trim().length > 30) {
            this.showError(this.registerUsernameTooLong)
            this.enableInputError(this.arrayFormField.registerUsername)
            erreur = true;
        }
        if(this.registerPassword.value.trim() === "") {
            this.showError(this.registerPasswordEmpty)
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
        } else if(!hasLetter(this.registerPassword.value.trim())) {
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
            this.showError(this.registerPasswordNoLetter)
        } else if(!hasLowerCase(this.registerPassword.value.trim())) {
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
            this.showError(this.registerPasswordNoLowercase)
        } else if(!hasUpperCase(this.registerPassword.value.trim())) {
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
            this.showError(this.registerPasswordNoUppercase)
        } else if(!hasNumber(this.registerPassword.value.trim())) {
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
            this.showError(this.registerPasswordNoNumber)

        } else if(this.registerPassword.value.trim().length < 8) {
            this.showError(this.registerPasswordTooShort)
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
        } else if(this.registerPassword.value.trim().length > 256) {
            this.showError(this.registerPasswordTooLong)
            this.enableInputError(this.arrayFormField.registerPassword)
            erreur = true;
        }
        if(this.registerPasswordConfirm.value.trim() === "") {
            this.showError(this.registerPasswordConfirmEmpty)
            this.enableInputError(this.arrayFormField.registerPasswordConfirm)
            erreur = true;
        } else if(this.registerPassword.value !== this.registerPasswordConfirm.value) {
            this.showError(this.registerPasswordConfirmNoMatch)
            this.enableInputError(this.arrayFormField.registerPasswordConfirm)
            erreur = true;
        }
        if(this.registerFirstname.value.trim() === "") {
            this.showError(this.registerFirstnameEmpty)
            this.enableInputError(this.arrayFormField.registerFirstname)
            erreur = true;
        } else if(this.registerFirstname.value.trim().length > 60) {
            this.showError(this.registerFirstnameTooLong)
            this.enableInputError(this.arrayFormField.registerFirstname)
            erreur = true;
        }
        if(this.registerLastname.value.trim() === "") {
            this.showError(this.registerLastnameEmpty)
            this.enableInputError(this.arrayFormField.registerLastname)
            erreur = true;
        } else if (this.registerFirstname.value.trim().length > 60) {
            this.showError(this.registerLastnameTooLong)
            this.enableInputError(this.arrayFormField.registerLastname)
            erreur = true;
        }
        if(erreur) {
            return;
        }
        const userRepository = new UserRepository()
        this.showMainSpinner()
        userRepository.register(this.registerUsername.value, this.registerFirstname.value,
            this.registerLastname.value, this.registerPassword.value, this.registerPasswordConfirm.value)
            .then(result => {
                this.hideMainSpinner()
                this.emptyRegisterFields();
                this.switchForm("login")

                this.toast("registerConfirm");
            }).catch((err) => {

            this.hideMainSpinner()
            if(err.status === 400) /* field validation failed */ {
                err.response.errors.forEach(error => {
                        if(error.param === 'username') {
                            if(error.msg === "missing") {
                                this.showError(this.registerUsernameEmpty)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                            if(error.msg === "too-short") {
                                this.showError(this.registerUsernameTooShort)
                                this.enableInputError(this.arrayFormField.registerUsername)
                            }
                        if(error.msg === "too-long") {
                            this.showError(this.registerUsernameTooShort)
                            this.enableInputError(this.arrayFormField.registerUsername)
                        }
                        if(error.msg === "already-used") {
                            this.showError(this.registerUsernameTaken)
                            this.enableInputError(this.arrayFormField.registerUsername)
                        }
                    }
                    if(error.param === 'password') {
                        if(error.msg === "missing") {
                            this.showError(this.registerPasswordEmpty)
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "too-short") {
                            this.showError(this.registerPasswordTooShort);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "too-long") {
                            this.showError(this.registerPasswordTooLong);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "must-include-numbers") {
                            this.showError(this.registerPasswordNoNumber);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "must-include-letters") {
                            this.showError(this.registerPasswordNoLetter);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "must-include-lowercase") {
                            this.showError(this.registerPasswordNoLowercase);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                        if(error.msg === "must-include-uppercase") {
                            this.showError(this.registerPasswordNoUppercase);
                            this.enableInputError((this.arrayFormField.registerPassword))
                        }
                    }
                    if(error.param === 'firstName') {
                        if(error.msg === "missing") {
                            this.showError(this.registerFirstnameEmpty)
                            this.enableInputError(this.arrayFormField.registerFirstname)
                        }
                    }
                    if(error.param === 'lastName') {
                        if(error.msg === "missing") {
                            this.showError(this.registerLastnameEmpty)
                            this.enableInputError(this.arrayFormField.registerLastname)
                        }
                    }
                    if(error.param === 'passwordConfirm') {
                        if(error.msg === "missing") {
                            this.showError(this.registerPasswordConfirmEmpty)
                            this.enableInputError(this.arrayFormField.registerPasswordConfirm)
                        }
                        if(error.msg === "no-match") {
                            this.showError(this.registerPasswordConfirmNoMatch)
                            this.enableInputError(this.arrayFormField.registerPasswordConfirm)
                        }
                    }
                });
            }

        }) ;

    }
    emptyRegisterFields() {
        this.arrayFormField.registerUsername.input.value = "";
        this.arrayFormField.registerFirstname.input.value = "";
        this.arrayFormField.registerLastname.input.value = "";
        this.arrayFormField.registerPassword.input.value = "";
        this.arrayFormField.registerPasswordConfirm.input.value = "";
    }
}

window.loginController = new LoginController()
