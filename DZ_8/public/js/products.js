//for index.html
Vue.component('products-comp',{
    props:['showed','addproduct'],
    template: ` <div class="product-menu">
                    <div v-for="product of showed" :key='product.id_product'class="product-menu-list">
                        <a href="product.html" class="product-link"><img :src="product.imgPath" alt="some img" class='img-box'>
                            <h3>{{product.product_name}}<p class="red_words">{{product.price}} $</p></h3>
                        </a>  
                        <a href="#" class="add" :id="product.id_product" @click='$emit("addproduct",product)'>
                            <div class="add-box">
                                <img src="img/корзина2.png" alt="корзина">      
                                <p class="add-text" >Add Cart</p>
                            </div>
                        </a>
                    </div>
                </div>
`
})
//for product.html
Vue.component('products-comp2',{
    props:['showed','addproduct'],
    template: ` <div class="product-menu-arr">
                    <div v-for="product of showed" :key='product.id_product'class="product-menu-list">
                        <a href="#" class="product-link"><img :src="product.imgPath" alt="some img" class='img-box'>
                            <h3>{{product.product_name}}<p class="red_words">{{product.price}} $</p></h3>
                        </a>  
                        <a href="#" class="add" :id="product.id_product" @click='$emit("addproduct",product)'>
                            <div class="add-box">
                                <img src="img/корзина2.png" alt="корзина">      
                                <p class="add-text" >Add Cart</p>
                            </div>
                        </a>
                    </div>
                </div>
`
})
//for shopping_cart.html
Vue.component('products-cart',{
    props:['cartitems','addproduct'],
    methods: {
        calculateCart() {
            let cartPrice = 0;
            let cart = this.$root.cartGoods[1];
            cart.forEach(el => cartPrice += el.quantity * el.price)
            return cartPrice;
        },
        deleteItem(id) {
            let remove = this.$root.remove;
            let cart = this.$root.cartGoods[1];
            let find = cart.find(el => el.id_product === id);

            remove(`/api/cart/${id}`,find);
        //    const curElement = this.cartitems.find(el => el.id_product == id);
        //    if (curElement.count == 1) {
        //        this.cartitems.splice(this.cartitems.indexOf(curElement), 1);
        //    } else {
        //         --curElement.count;
        //    }
        }
    },
    template: `
    <table>
    <tr>
        <th id="th-prod">Product Details</th>
        <th>unite Price</th>
        <th>Quantity</th>
        <th>shipping</th>
        <th>Subtotal</th>
        <th>ACTION</th>
    </tr>
    
    <tr v-for="item of cartitems[1]" :key='item.id_product'>
        <td class="prod-detail"><a href="#"><img :src="item.imgPath" alt="Some img" class='cart_img'></a>
        <div class="prod-detail-text"><p id="top">{{item.product_name}}</p>
        <p><span>Color:</span>   Red</p>
        <p><span>Size:</span>   Xll</p>	</div>
        </td>
        <td>$ {{item.price}}</td>
        <td><p class="tab-cnt-prod" @input='$parent.$emit("addproduct",item)'>{{item.quantity}}</p></td>
        <td>Free</td>
        <td>$ {{item.quantity * item.price}}</td>
        <td><a href="#" class="del" @click='deleteItem(item.id_product)'><i class="fas fa-times-circle"></i></a></td>
    </tr>                   
</table>
    `
})

Vue.component('check',{
    props:['cartitems'],
    methods: {
        calculateCart() {
            let cartPrice = 0;
            let cart = this.$root.cartGoods[1];
            cart.forEach(el => cartPrice += el.quantity * el.price)
            return cartPrice;
        }
    },
    template:`
<div class="check-prise-text">
    <p v-if='cartitems.length'>Sub total&emsp;$ {{calculateCart()}}</p>
    <span>GRAND TOTAL&emsp;<span class="red_words" v-if='cartitems.length'>$ {{calculateCart()}}</span></span>
</div>
`
})