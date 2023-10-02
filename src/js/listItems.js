import { draw } from "./graph.js"
import { setToLocaleStorage } from "./localStorage.js"
import { getRandomColor } from "./misc.js"
import { checkLimit, sumCalories } from "./sidebar.js"

export const list = document.querySelector('.list')
export const filter = document.querySelector('.filter-block')
const filterName = document.querySelector('.filter-name')
let delBtns = document.querySelectorAll('.del-btn')


// Создание нового элемента в списке
export function createFoodItem(name, calories, id) {
    // проверка на пустые поля
    if (!name || !calories) {
        return
    }
    const el = document.createElement('div')
    el.innerHTML = `<div class="item-info">
                            <h2 class="item-name">${name}</h2>
                            <h2 class="item-calories">${calories} ккал</h2>
                        </div>
                        <span class="del-btn"></span>`
    el.classList.add('list-item')
    el.setAttribute('data-id', parseInt(id))
    addFilter(el)
    list.append(el)
}


// Фильтрация по названию
function addFilter(element) {
    element.querySelector('.item-name').onclick = (e) => {
        const filterField = e.target.innerText
        const storageItems = JSON.parse(localStorage.getItem('food'))
        let result = storageItems.filter((food) => food.name === filterField)
        list.innerHTML = ``
        result.forEach(item => createFoodItem(item.name, item.calories, item.id))

        filter.classList.remove('none')
        filterName.innerText = filterField
    }
}


export function appendList() {
    const name = document.querySelector('.food-name')
    const calories = document.querySelector('.food-calories')

    let index

    if (JSON.parse(localStorage.getItem('food'))) {
        index = JSON.parse(localStorage.getItem('food')).length
    } else index = 0

    const foodItem = {
        name: name.value,
        calories: Math.abs(calories.value),
        id: index,
        color: getRandomColor()
    }

    if (name.value & calories.value) {

        createFoodItem(foodItem.name, foodItem.calories, foodItem.id)
        setToLocaleStorage(foodItem)
        sumCalories()
        updateDelBtns()
        checkLimit()
        draw(JSON.parse(localStorage.getItem('food')))
        name.value = ''
        calories.value = ''
    } else alert('Пустое поле')

}

// Функция для обновления кнопок
export function updateDelBtns() {
    delBtns = document.querySelectorAll('.del-btn')
    delBtns.forEach(item => item.onclick = (e) => {
        addDelBtn(e)
        sumCalories()
        checkLimit()
    })
}

export function addDelBtn(e) {
    const parent = e.target.parentNode
    let removeFromStorage = JSON.parse(localStorage.getItem('food'))

    for (let i = 0; i < removeFromStorage.length; i++) {
        if (parent.dataset.id == removeFromStorage[i].id) {
            removeFromStorage.splice(i, 1)
            localStorage.setItem('food', JSON.stringify([...removeFromStorage]))
            removeFromStorage

        }
    }
    draw(removeFromStorage)
    e.target.parentNode.remove()
}