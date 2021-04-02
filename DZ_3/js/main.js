const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров
        this.allProducts = []; //массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://picsum.photos/400/300?') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}random=${this.id}" alt="prod">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}
//Класс для корзины
class Cart {
    constructor(cart = '.cart-list') {
        this.cart = cart;
        this.cart_prod = [];
        this.all_cart_prod = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data.contents];
                this.addItem()
            });

    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }


    addItem() {
        const span = document.querySelector('.text');
        const buy_btn = document.querySelectorAll('.buy-btn');

        buy_btn.forEach(item => item.addEventListener("click", () => {
            this.cart_prod.push(item.parentNode.getAttribute('data-id'));
            span.innerHTML = 'В корзине: ' + this.cart_prod.length;
            const block = document.querySelector(this.cart);
            for (let i = 0; i < this.goods.length; i++) {
                const productObj = new CartItem(this.goods[i]);
                this.all_cart_prod.push(productObj);
                block.insertAdjacentHTML('afterbegin', productObj.render());
            }
        }));

    }

    deleteItem() {
        const block = document.querySelector('.text');
        const clean_btn = document.querySelector('.clean-cart');

        clean_btn.addEventListener('click', () => {
            block.innerHTML = 'В корзине: 0';
            console.log("до " + this.cart_prod.length);
            this.cart_prod.splice(0, this.cart_prod.length);
            console.log("после " + this.cart_prod.length);
        });

    }
}
class CartItem {
    constructor(product, img = 'https://picsum.photos/100/50?') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}">
                <img src="${this.img}random=${this.id}" alt="prod">
                    <p>${this.title}</p>
                <span>${this.price}$</span>
            </div>`
    }
}
let prod = new Cart();
let list = new ProductsList();

//Обработчк событий на кнопку "корзина"
let cart_wind = document.querySelector('.cart-list');
let btn_cart = document.querySelector('button.btn-cart');

function openCartList() {
    if (cart_wind.className == "cart-list active") {
        cart_wind.style.display = "none";
        cart_wind.className = "cart-list";
    } else {
        cart_wind.style.display = "flex";
        cart_wind.className = "cart-list active";
        prod.addItem();
        prod.deleteItem();

    }
}
btn_cart.addEventListener('click', openCartList);


let clean_btn = document.querySelector('.clean-cart');

function deleteCartItem(){
    let cart_item = document.querySelectorAll('.cart-item');
    //не смогла реализовать удаление из корзины
}
clean_btn.addEventListener('click', deleteCartItem);
