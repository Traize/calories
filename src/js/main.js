import { getItemsFromStorage, getLimitFromStorage } from "./localStorage.js"
import { checkLimit, clearAll, setLimit } from "./sidebar.js"
import { sortList } from "./sort.js"
import { appendList, filter, list } from "./listItems.js"

const addForm = document.querySelector('.add-food')
const sidebarForm = document.querySelector('.set-limit')
const listHeader = document.querySelector('.list-header')

const clearAllBtn = document.querySelector('.clear-btn')





window.onload = [getItemsFromStorage(), getLimitFromStorage(), checkLimit()]


// Получение данных с формы
addForm.onsubmit = (e) => {
    e.preventDefault()
    appendList()
}



// очистка фильтра
filter.onclick = () => {
    filter.classList.add('none')
    list.innerHTML = ``
    getItemsFromStorage()
}


listHeader.onclick = (e) => {
    if (e.target.dataset.type) {
        sortList(e.target.dataset.type)
    }
}


// Код сайдбара
// 
// Форма для установки лимита
sidebarForm.onsubmit = (e) => {
    e.preventDefault()
    setLimit()
}

clearAllBtn.onclick = () => {
    clearAll()
}