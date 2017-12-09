
export default {
    template: `
        <section class="place-edit-modal">
            <form class="place-edit" @submit.prevent="">
                <h4>Edit location details:</h4>
                <div class="place-name" :class="{focused: focused === 'place-name'}">
                    <input v-model="place.name" @focus="focus('place-name')" @blur="focus('')" placeholder="Enter place name" autofocus />
                </div>
                <div class="place-description" :class="{focused: focused === 'place-description'}">
                    <textarea v-model="place.description" @focus="focus('place-description')" @blur="focus('')" placeholder="Enter place description"></textarea>
                </div>
                <div class="place-photos">
                    <h5>Upload photos or Enter photo URL:</h5>
                    <input type="file" @input="pushPhoto" @focus="focus('')" @blur="focus('')" multiple />
                    <div class="photo-url" :class="{focused: focused === 'photo-url'}">
                        <input type="url" @input="pushPhoto" @focus="focus('photo-url')" @blur="focus('')" placeholder="Enter full photo URL" />
                    </div>
                </div>
                <div class="place-tag">
                    <h5>Choose a tag for this place:</h5>
                    <div class="place-tag-select" :class="{focused: focused === 'place-tag'}">
                        <select v-model="place.tag" @focus="focus('place-tag')" @blur="focus('')">
                            <option v-for="tag in tags" :value="tag">{{tag}}</option>
                        </select>
                    </div>
                </div>
                <div class="buttons">
                    <button @click="cancel" :class="{clicked: clicked === 'cancel'}">cancel</button>
                    <button type="submit" @click="submit" :class="{clicked: clicked === 'submit'}">
                        <span v-if="place.id">update</span>
                        <span v-else>save</span>
                    </button>
                </div>
            </form>
        </section>
    `,
    props: ['place'],
    data() {
        return {
            tags: ['business', 'education', 'food', 'fun', 'shopping', 'sports', 'travel'],
            focused: 'place-name',
            clicked: ''
        }
    },
    methods: {
        pushPhoto() {
            console.log('pushing photo')
        },
        focus(toFocus) {
            this.focused = toFocus
        },
        cancel() {
            this.clicked = 'cancel'
            setTimeout(_=> this.clicked = '', 200)
            setTimeout(_=> this.$emit('submit', null), 400)
        },
        submit() {
            this.clicked = 'submit'
            setTimeout(_=> this.clicked = '', 200)
            setTimeout(_=> this.$emit('submit', this.place), 400)
        }
    }
}