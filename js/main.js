'use strict'
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
/*Для второго вариант в renderProduct нужно передвать item;
в переменные записваем: item.id,item.title,.item.price*/
const renderProduct = (id=5,title="PC Lenova",price=600) => {
    return `<div class="product-item">
                <img src = https://picsum.photos/200/300?random=${id}" alt="prod">
                <h3>${title}</h3>
                <p>${price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.id,item.title, item.price));
    //Второй вариант: сокращение записи функции
    //const productsList = list.map(item => renderProduct(item));
    document.querySelector('.products').innerHTML = productsList.join("");
};

renderPage(products);
//Добавление значения по умолчанию для аргументов функции
document.querySelector('.products').insertAdjacentHTML('beforeend',renderProduct());
