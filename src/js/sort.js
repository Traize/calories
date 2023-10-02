import { createFoodItem, list, updateDelBtns } from "./listItems.js"

// Ф-ция сортировки
export function sortList(type) {
    let storage = JSON.parse(localStorage.getItem('food'))
    let headerName = document.querySelector('.header-name')
    let headerCalories = document.querySelector('.header-calories')

    switch (type) {
        case 'name-inc':
            storage.sort((a, b) => (a.name).localeCompare(b.name))
            headerName.dataset.type = 'name-dec'
            headerCalories.dataset.type = 'calories-inc'
            break;
        case 'calories-inc':
            storage.sort((a, b) => a.calories - b.calories)
            headerName.dataset.type = 'name-inc'
            headerCalories.dataset.type = 'calories-dec'
            break;
        case 'name-dec':
            storage.sort((a, b) => (b.name).localeCompare(a.name))
            headerName.dataset.type = 'name-inc'
            headerCalories.dataset.type = 'calories-inc'
            break;
        case 'calories-dec':
            storage.sort((a, b) => b.calories - a.calories)
            headerName.dataset.type = 'name-inc'
            headerCalories.dataset.type = 'calories-inc'
            break;
    }
    list.innerHTML = ``
    storage.forEach(item => createFoodItem(item.name, item.calories, item.id))
    updateDelBtns()
}