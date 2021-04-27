Vue.component('products', {
   data(){
       return {
           catalogUrl: '/catalogData.json',
           filtered: [],
           products: []
       }
   },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    item.imgPath = `img/product_${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
   template: `<ul class="product-menu">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img = "item.imgPath"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </ul>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
            <li class="product-menu-list">
                <a href="product.html" class="product-link"><img :src="img" alt="product" class="img-box">
                    <h3>{{product.product_name}}<p class="red_words">{{product.price}} $</p></h3>
                </a>
                <a href="#" class="add">
                    <div class="add-box">
                        <img src="img/корзина2.png" alt="корзина">
                        <p class="add-text"  @click="$emit('add-product', product)">Add Card</p>
                    </div>
                </a>
            </li>
    `
})
//Для страницы product.html
Vue.component('products_2', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: '../img/product_arr_1.jpg'
        }
    },
     mounted(){
         this.$parent.getJson(`/api/products`)
             .then(data => {
                 for (let item of data){
                     this.$data.products.push(item);
                     this.$data.filtered.push(item);
                 }
             });
     },
     methods: {
         filter(userSearch){
             let regexp = new RegExp(userSearch, 'i');
             this.filtered = this.products.filter(el => regexp.test(el.product_name));
         }
     },
    template: `<ul class="product-menu-arr">
                 <product_2 v-for="item of filtered" 
                 :key="item.id_product" 
                 :img="imgProduct"
                 :product="item"
                 @add-product="$parent.$refs.cart.addProduct"></product_2>
                </ul>`
 });
Vue.component('product_2',{
    props: ['product', 'img'],
    template: `
    <li class="product-menu-list">
        <a href="#" class="product-link"><img :src="img" alt="product" class="img-box">
            <h3>{{product.product_name}}<p class="red_words">{{product.price}} $</p></h3>
        </a>
        <a href="#" class="add">
            <div class="add-box">
                <img src="img/корзина2.png" alt="корзина">
                <p class="add-text"  @click="$emit('add-product', product)">Add Card</p>
            </div>
        </a>
    </li>
`
})