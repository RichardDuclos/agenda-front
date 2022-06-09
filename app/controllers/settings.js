class SettingsController extends BaseController {
    constructor() {
        super()
        console.log("tyo")
        this.isConnected()
            .then(result => {
                if(result.status !== 204) {
                    navigate("index")
                } else {
                    this.setTitle("Paramètres");
                    this.root = document.getElementById("root")

                    this.themeSwitch = document.getElementById("themeSwitch");
                    this.themeSwitch.onclick = e => this.toggleTheme(e.currentTarget.checked);
                    if(LocalStorage.getTheme() === "dark") {
                        this.themeSwitch.checked = true;
                    }
                    this.monthCalendarRadio = document.getElementById("monthCalendarRadio")
                    this.weekCalendarRadio = document.getElementById("weekCalendarRadio")
                    this.dayCalendarRadio = document.getElementById("dayCalendarRadio")
                    const favoriteCalendar = LocalStorage.getFavoriteCalendar()
                    this.monthCalendarRadio.onclick = e => LocalStorage.setFavoriteCalendar("month")
                    this.weekCalendarRadio.onclick = e => LocalStorage.setFavoriteCalendar("week")
                    this.dayCalendarRadio.onclick = e => LocalStorage.setFavoriteCalendar("day")
                    if(favoriteCalendar !== null && (favoriteCalendar === "month" || favoriteCalendar === "week" || favoriteCalendar === "day"))
                    {
                        if(favoriteCalendar === "month") {
                            this.monthCalendarRadio.checked = true
                        } else if(favoriteCalendar === "week") {
                            this.weekCalendarRadio.checked = true
                        } else if(favoriteCalendar === "day") {
                            this.dayCalendarRadio.checked = true
                        }
                    } else {
                        this.monthCalendarRadio.click()
                    }
                    this.setNavbarLinks(true, "settings");

                    this.root.classList.remove("hidden")


                }
            })

    }
    toggleTheme(checked) {
        if(checked) {
            LocalStorage.setTheme("dark")
        } else {
            LocalStorage.setTheme("light")
        }
        this.setTheme()
    }
}

window.settingsController = new SettingsController()
