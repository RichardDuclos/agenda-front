
class BaseController {

    constructor() {
        this.setBackButtonView('index');
        this.title = document.getElementsByTagName("title")[0];
        this.body = document.getElementsByTagName("body")[0];
        this.navbarLinksWrapper = document.getElementsByClassName("navbar-nav")[0];
        //this.themeSwitch = document.getElementById("themeSwitch");
        if(LocalStorage.getTheme() === "dark") {
            this.themeSwitch.checked = true;
        }
        this.setTheme();
        //this.themeSwitch.onclick = e => this.toggleTheme(e.currentTarget.checked);
        this.mainSpinner = document.getElementById("main-spinner");
    }
    toggleTheme(checked) {
        if(checked) {
            LocalStorage.setTheme("dark")
        } else {
            LocalStorage.setTheme("light")
        }
        this.setTheme()
    }
    setTheme() {
        let theme = LocalStorage.getTheme()
        if(!theme) {
            theme = "light"
            LocalStorage.setTheme(theme)
        }
        if(theme === "light") {
            this.body.classList.add("light")
            this.body.classList.remove("dark")
        }
        if(theme === "dark") {
            this.body.classList.remove("light")
            this.body.classList.add("dark")
        }
    }
    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }
    setNavbarLinks(displayLinks, view) {
        if(!displayLinks) {
            const links = document.getElementsByClassName("nav-item");
            for(let link of links) {
                link.style.display = "none"
            }
        } else {
            const link = document.querySelector(`[data-view=${view}]`)
            console.log(link)
            if(link) {
                link.classList.add("active")
            }
        }

    }
    setTitle(title) {
        this.title.innerText = title;
    }
    toast(elemId) {
        const toast = new bootstrap.Toast(document.getElementById(elemId))
        toast.show()
    }
    disconnect() {
        LocalStorage.removeToken();
        navigate("index")
    }
    async isConnected() {
        return await Token.checkToken();
    }
    parseJwt (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    showMainSpinner() {
        this.mainSpinner.classList.remove("hidden");
    }
    hideMainSpinner() {
        this.mainSpinner.classList.add("hidden");
    }
}
window.baseController = new BaseController()
