import { draw } from "./graph.js"
import { createFoodItem, updateDelBtns } from "./listItems.js"
import { limit, sumCalories } from "./sidebar.js"

// local storage
export function setToLocaleStorage(items) {
    if (localStorage.getItem('food')) {
        const storageItems = JSON.parse(localStorage.getItem('food'))
        localStorage.setItem('food', JSON.stringify([...storageItems, items]))
    }
    else {
        localStorage.setItem('food', JSON.stringify([items]))
    }
}
// первичная загрузка из хранилища
export function getItemsFromStorage() {
    if (localStorage.getItem('food')) {
        const storageItems = JSON.parse(localStorage.getItem('food'))
        storageItems.forEach(item => createFoodItem(item.name, item.calories, item.id))


        draw(storageItems)
        updateDelBtns()
        sumCalories()
    } else return
}
export function getLimitFromStorage() {
    if (localStorage.getItem('limit')) {
        const storagedLimit = JSON.parse(localStorage.getItem('limit'))
        limit.innerText = `${storagedLimit} ккал`
    } else return
}