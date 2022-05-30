class LocalStorage {
    static saveToken(token) {
        localStorage.setItem("jwt", token);
    }
    static getToken() {
        return localStorage.getItem("jwt")
    }
    static removeToken() {
        return localStorage.removeItem("jwt");
    }
    static getTheme() {
        return localStorage.getItem("theme")
    }
    static setTheme(theme) {
        return localStorage.setItem("theme", theme)
    }

}