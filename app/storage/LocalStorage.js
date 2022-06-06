class LocalStorage {
    static saveToken(token) {
        return localStorage.setItem("jwt", token);
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
    static setFavoriteCalendar(calendar) {
        return localStorage.setItem("favorite-calendar", calendar)
    }
    static getFavoriteCalendar() {
        return localStorage.getItem("favorite-calendar")
    }
    static removeFavoriteCalendar() {
        return localStorage.removeItem("favorite-calendar²")
    }

}