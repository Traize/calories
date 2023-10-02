import { draw } from "./graph.js"
import { filter, list } from "./listItems.js"
import { getItemsFromStorage } from "./localStorage.js"

export const limit = document.querySelector('.limit-num')
const current = document.querySelector('.current-num')


export function sumCalories() {
    if (JSON.parse(localStorage.getItem('food'))) {
        const storage = JSON.parse(localStorage.getItem('food'))
        let sum = 0
        storage.forEach(item => sum += item.calories)
        current.innerText = `${sum} ккал`
    }
    else return current.innerText = ''
}

export function checkLimit() {
    const warning = document.querySelector('.limit-warning')
    const limitNum = document.querySelector('.limit-num')
    const checkValue = limitNum.innerText.replace(/\D/g, '')
    const currentValue = document.querySelector('.current-num').innerText.replace(/\D/g, '')

    if (!checkValue || +checkValue === 0) {
        limitNum.innerText = `0 ккал`
        warning.classList.add('none')
    } else if (+checkValue < +currentValue) {
        warning.classList.remove('none')
    }
    else warning.classList.add('none')
}

export function setLimit() {
    const limitNum = document.querySelector('.limit-input')
    limit.innerText = `${limitNum.value} ккал`
    localStorage.setItem('limit', limitNum.value)
    checkLimit()
    limitNum.value = ``
}

export function clearAll() {
    localStorage.clear()
    filter.classList.add('none')
    getItemsFromStorage()
    sumCalories()
    checkLimit()
    draw()
    limit.innerText = ``
    list.innerHTML = ``
}