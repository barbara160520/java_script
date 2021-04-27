// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          /*imgCart: '../img/cart_img1.jpg',*/
          showCart: false
      }
    },
    mounted(){
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                   item.imgPath = `img/product_${item.id_product}.jpg`; this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }

            // this.$parent.getJson(`${API}/addToBasket.json`)
            //     .then(data => {
            //         if(data.result === 1){
            //             let find = this.cartItems.find(el => el.id_product === item.id_product);
            //             if(find){
            //                 find.quantity++;
            //             } else {
            //                 const prod = Object.assign({quantity: 1}, item);
            //                 this.cartItems.push(prod)
            //             }
            //         }
            //     })
        },
        remove(item){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })       
        },
        calculateCart() {
            let cartPrice = 0;
            let cart = this.cartItems;
            cart.forEach(el => cartPrice += el.quantity * el.price)
            return cartPrice;
        }
    },

    template: `
    <div>
        <button class="bnt3" type="button" @click="showCart = !showCart">
        <img src="img/корзина.png" alt="cart">
        </button>
        <div class="cart-menu" v-show="showCart">
            <div class="mega-item-cart">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img = "item.imgPath" :cart-item="item" @remove="remove">
                </cart-item>
            </div>
            <div class="checkout">
                <p><span>TOTAL</span><span>$ {{calculateCart()}} </span></p>
                <a href="checkout.html" class="chek-link">CHECKOUT</a>
                <a href="shopping_cart.html" class="gocart">GO TO CART</a>
            </div>
        </div>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
        <div class="mega-cart">
            <a href="#" class="cart-prod"><img :src="img" alt="product"></a>
            <div class="cart-hading">{{ cartItem.product_name }}
            <div class="review_stars_wrap">
                    <div id="review_stars">
                        <input id="star-4" type="radio" name="stars" />
                        <label class="star" title="Отлично" for="star-4">
                            <i class="fas fa-star"></i>
                        </label>
                        <input id="star-3" type="radio" name="stars" />
                        <label class="star" title="Хорошо" for="star-3">
                            <i class="fas fa-star"></i>
                        </label>
                        <input id="star-2" type="radio" name="stars" checked="checked" />
                        <label class="star" title="Нормально" for="star-2">
                            <i class="fas fa-star"></i>
                        </label>
                        <input id="star-1" type="radio" name="stars" />
                        <label class="star" title="Плохо" for="star-1">
                            <i class="fas fa-star"></i>
                        </label>
                        <input id="star-0" type="radio" name="stars" />
                        <label class="star" title="Ужасно" for="star-0">
                            <i class="fas fa-star"></i>
                        </label>
                    </div>
                    <a href="#" class="del" @click="$emit('remove', cartItem)"><i class="fas fa-times-circle"></i></a>
                </div>
                <p class="red_words">{{ cartItem.quantity }} x $ {{cartItem.quantity*cartItem.price}}</p>
            </div>
        </div>
    </div>
    `
})