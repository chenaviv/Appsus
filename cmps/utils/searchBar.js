

export default {
    template: `
        <section class="search-bar" :class="classObj">
            <input :placeholder="placeHolder"
            @focus="focused = true" @blur="focused = false" />
            <button class="not-btn">
                <i class="fa fa-search" aria-hidden="true"></i>                
            </button>
        </section>
    `,
    props: ['value', 'placeHolder'],
    data() {
        return {
            focused: false
        }
    },
    computed: {
        classObj() {
            return { focused: this.focused }
        }
    },
    methods: {
        input() {
            console.log('input detected')
            this.$emit('input')
        }
    }
}