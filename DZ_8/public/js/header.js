Vue.component('header-comp',{
    props:['cartitems','addproduct'],
    template: ` 
    <div class="haeder container-box">
        <div class="header-left">
            <a href="index.html" class="logo">
                <img src="img/logo.png" alt="logo">BRAN<span class="red_words" style="font-weight: 400">D</span>
            </a>
        </div>
        <div class="d1">  
            <search></search>
        </div>
        <div class="header-right">
            <cart :cartitems = 'cartitems' :addproduct='addproduct'></cart>
            <a href="checkout.html" class="bnt4">My Account </a><button class="drop-bnt4" type="submit"><i class="fas fa-sort-down"></i></button>
        </div>
    </div>
`
})

Vue.component('search',{
    data(){
        return {
            searchLine:'',
        }
    },
    template: `
    <div class="form1">
    <form action="#" class="search-form" @submit.prevent='$parent.$emit("filtergoods",searchLine)'>
        <button class="bnt1" type="submit"><a href="product.html" class="link-bnt1">Browes</a><i class="fas fa-sort-down"></i>
        <div class="browse-menu">
            <div class="mega-item-box">
                <h3 class="mega-hading">Women</h3>
                <div class="mega-item">
                    <ul>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Dresses</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Tops</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Sweaters/Knits</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Jackets/Coats</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Blazers</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Denim</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Leggings/Pants</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Skirts/Shorts</a></li>
                        <li class="mega-menu-list"><a href="single_page.html" class="mega-link">Accessories</a></li>
                    </ul>
                </div>
                <h3 class="mega-hading">Men</h3>
                <div class="mega-item">
                    <ul>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Tees/Tank tops</a></li>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Shirts/Polos</a></li>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Sweaters</a></li>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Sweatshirts/Hoodies</a></li>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Blazers</a></li>
                        <li class="mega-menu-list"><a href="product.html" class="mega-link">Jackets/vests</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </button>
    <input type="text" placeholder="Search for Item..." class="search-field" v-model="searchLine">
    <button class="bnt2" type="submit"><a href="#"><img src="img/search.png" alt="поиск"></a></button>
    </form>
</div>`
})

Vue.component('cart',{
    props:['cartitems','addproduct'],
    data(){
        return {
            isVisibleCart: false,
        }
    },
    methods: {
        calculateCart() {
            let cartPrice = 0;
            let cart = this.$parent.$parent.cartGoods[1];
            cart.forEach(el => cartPrice += el.quantity * el.price)
            return cartPrice;
        },
        deleteItem(id) {
            let remove = this.$parent.$parent.remove;
            let cart = this.$parent.$parent.cartGoods[1];
            let find = cart.find(el => el.id_product === id);

            remove(`/api/cart/${id}`,find);
        //    const curElement = this.cartitems.find(el => el.id_product == id);
        //    if (curElement.count == 1) {
        //        this.cartitems.splice(this.cartitems.indexOf(curElement), 1);
        //    } else {
        //         --curElement.count;
        //    }
        //<cart-item v-for="item of cartitems[1]" :key="item.id_product" :img = "item.imgPath" :cart-item="item" @input='$parent.$emit("addproduct",item)' @remove="deleteItem"></cart-item>
        }
    },
    template: `
    <div>
        <button class="bnt3" type="button" @click='isVisibleCart = !isVisibleCart'>
            <img src="img/корзина.png" alt="cart">
        </button>
        <div class="cart-menu" v-if='isVisibleCart'>
            <p v-if='!cartitems[1].length'>Empty</p>
            <div class="mega-item-cart">
                <div class='mega-cart' v-for="item of cartitems[1]" :key='item.id_product'>
                    <a href="#" class="cart-prod"><img :src="item.imgPath" alt="Some img" class='cart_img'></a>
                    <div class="cart-hading">{{item.product_name}}
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
                            <a href="#" class="del" @click='deleteItem(item.id_product)'><i class="fas fa-times-circle"></i></a>
                        </div>
                       <!-- <p type='number' class='cart_item_count' @input='$parent.$emit("addproduct",item)'>Количество: {{ item.quantity }}</p>-->
                        <p class="red_words" type='number' @input='$parent.$emit("addproduct",item)'> {{ item.quantity }} x {{item.quantity * item.price}}</p>
                    </div>
                </div>
            </div>
            <div class="checkout">
                <p><span>TOTAL</span><span v-if='cartitems[1].length'>$ {{calculateCart()}} </span></p>
                <a href="checkout.html" class="chek-link">CHECKOUT</a>
                <a href="shopping_cart.html" class="gocart">GO TO CART</a>
            </div>
        </div>
    </div>
    `
})