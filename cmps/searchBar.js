
export default {
    template: `
        <div class="search-bar" :class="{focused}">
            <input v-model="searchTerm" @input="input" @focus="focus" @blur="blur" type="text" />
            <button type="submit" class="not-btn">
                <i class="fa fa-search"></i>
            </button> 
        </div>
    `,
    data() {
        return {
            searchTerm: '',
            focused: false
        }
    },
    
    // could not think of a better solution, will try to at a more convenient time:
    props: ['parentTerm'],
    watch: {
        parentTerm() {
            if (!this.parentTerm) this.searchTerm = ''
        }
    },
    methods: {
        input() {
            this.$emit('input', this.searchTerm)
        },
        focus() {
           this.focused = true; 
        },
        blur() {
            this.focused = false;
        }
    }
}