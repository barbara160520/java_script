Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''
        }  
    },
    template: `
<div class="error-block" v-if="isVisible">
    <p class="error-msg">
        {{ text }}<a href="#" class="del" @click="text=''"><i class="fas fa-times-circle"></i></a>
    </p>
</div>`
})