
import NoteService from '../service/NoteService.js'

export default {
    template: `
        <section class="note-update">
            <div class="form">

                <div>title: <input v-model="note.title" /></div>
                <div><textarea v-model="note.txt" placeholder="Enter note text here"></textarea></div>
                <div>image URL: <input type="url" v-model="note.img" /></div>
                <div>priority: 
                    <select v-model="note.priority">
                        <option :value="3" selected>High</option>
                        <option :value="2">Normal</option>
                        <option :value="1">Low</option>
                    </select>

                </div>
                
             <!--   <div class="color-pick" :class="color">
                    <div @click="pickColor('yellow')" class="default" title="yellow"></div>
                    <div @click="pickColor('red')" class="red" title="red"></div>
                    <div @click="pickColor('green')" class="green" title="green"></div>
                    <div @click="pickColor('blue')" class="blue" title="blue"></div>
                </div> -->

                <div>
                    <button class="button" @click="update"><i class="fa fa-check" aria-hidden="true"></i></button>
                    <button class="button" @click="cancelUpdate"><i class="fa fa-times" aria-hidden="true"></i></button>
                </div>

            </div>
        </section>
    `,
    props: ['note'],
    computed: {
        color() {
           return this.note.color 
        }
    },
    // computed: {
    //     defaultSelected() {
    //         return { selected: this.note.color === '' }
    //     },
    //     redSelected() {
    //         return { selected: this.note.color === 'red' }
    //     },
    //     greenSelected() {
    //         return { selected: this.note.color === 'green' }
    //     },
    //     blueSelected() {
    //         return { selected: this.note.color === 'blue' }
    //     }
    // },
    methods: {
        update() {
            this.$emit('update', this.note)
        },
        pickColor(color) {
            this.note.color = color
        },
        cancelUpdate() {
            this.$emit('update', null)
        }

    }
}