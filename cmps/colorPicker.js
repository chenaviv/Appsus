export default {
    template: `
        <section class="picker">
           <div class="picked" v-for="color in colors" @click="colorPicked(color)" :class="color">
                <i v-if="selectedColor === color" class="fa fa-check" aria-hidden="true"></i>
           </div>
        </section>
    `,
    prop: ['value'],
    data() {
        return {
            colors: [
                'white','red','orange','yellow','green','light-blue', 
                'blue', 'dark-blue', 'purple', 'pink', 'brown', 'gray'
            ],
            selectedColor: ''
        }
    },
    created() {
        this.selectedColor = this.value
        console.log(this.value)
    },
    methods: {
        colorPicked(color) {
            this.$emit('input', color)
            this.selectedColor = color
        }
    }
}