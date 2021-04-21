Vue.component('filter-el', {
    data(){
      return {
          userSearch: ''
      }
    },
    template: `
<div class="form1">
    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
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
    <input type="text" placeholder="Search for Item..." class="search-field" v-model="userSearch">
    <button class="bnt2" type="submit"><a href="#"><img src="img/search.png" alt="поиск"></a></button>
    </form>
</div>`
})
