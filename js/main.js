class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    }
    _fetchProducts() {
        this.goods = [
            {
                id: 1
                , title: 'Notebook'
                , price: 2000
            }
            , {
                id: 2
                , title: 'Mouse'
                , price: 20
            }
            , {
                id: 3
                , title: 'Keyboard'
                , price: 200
            }
            , {
                id: 4
                , title: 'Gamepad'
                , price: 50
            }
        , ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObj.render())
                //            block.innerHTML += productObj.render();
        }
    }
    //Метод выводит сумму всех товаров
    sumProducts() {
        let money = 0;
        const block = document.querySelector('.info');
        for (let i = 0; i < this.goods.length; i++) {
            money = money + this.goods[i].price;
        }
        block.insertAdjacentHTML('afterbegin', "Сумма всех товаров: " + money + " $");
    }
}
class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
//Класс для корзины товаров
class Cart {
    constructor(buy_btn = '.buy-btn') {
        this.buy_btn = buy_btn;
        this.cart_prod = [];
    }
    //Возможные методы
    addItem() {
        const block = document.querySelector('span');
        let buy_btn = document.querySelectorAll('.buy-btn');
        buy_btn.forEach(item => item.addEventListener("click", () => {
            this.cart_prod.push(item.parentNode.getAttribute('data-id'));
            block.innerHTML = 'В корзине: ' + this.cart_prod.length;
        }));
    }
    deleteItem() {
        const block = document.querySelector('span');
        block.innerHTML = 'В корзине: 0';
        for (let i = 0; i < this.cart_prod.length; i++) {
            delete this.cart_prod[i];
        }
    }
}
//Класс для элемента корзины товаров
class ItemCart {}

let list = new ProductsList();
list.render();
list.sumProducts();
let prod = new Cart();
prod.addItem();