import {uploadImage} from '../service/PlacesService.js'


export default {
    template: `
        <section class="place-edit-modal">
            <form class="place-edit" @submit.prevent="">
                <h4>Edit location details:</h4>
                <div class="place-name" :class="{focused: focused === 'place-name'}">
                    <input v-model="place.name" @focus="focus('place-name')" @blur="focus('')" placeholder="Enter place name" />
                </div>
                <div class="place-description" :class="{focused: focused === 'place-description'}">
                    <textarea v-model="place.description" @focus="focus('place-description')" @blur="focus('')" placeholder="Enter place description"></textarea>
                </div>
                <div class="place-photos">
                    <h5>Upload photos or Enter photo URL:</h5>
                    <input type="file" @change="pushPhoto" @focus="focus('')" @blur="focus('')" multiple />
                    <div class="photo-url" :class="{focused: focused === 'photo-url'}">
                        <input type="url" v-model="urlToAdd" @focus="focus('photo-url')" @blur="focus('')" placeholder="Enter full photo URL" />
                        <button  v-if="urlToAdd !== 'Added!'" @click="addUrlToImgs" class="not-btn">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <i v-else class="fa fa-check" aria-hidden="true"></i>
                    </div>
                    <div v-if="!canSubmit" class="thumbnails loading">
                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                        <span class="sr-only">Uploading...</span>
                    </div>
                    <div v-else class="thumbnails">
                        <img v-for="img in place.imgs" :src="img" />
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
                    <button type="submit" @click="submit" :class="submitClasses">
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
            tags: ['business', 'culture', 'education', 'family', 'food', 'fun', 'public', 'shopping', 'sports', 'travel'],
            // focused: 'place-name',
            focused: '',
            clicked: '',
            urlToAdd: '',
            canSubmit: true
        }
    },
    computed: {
        submitClasses() {
            return {
                clicked: this.clicked === 'submit',
                disabled: !this.canSubmit
            }
        }
    },
    methods: {
        pushPhoto({target}) {
            // if (target.type === 'url') {
            //     // TODO: simple regex validation of value
            //     this.place.imgs.push(target.value)
            //     target.value = ''
            //     return
            // }
            var files = target.files
            for (let i = 0; i < files.length; i++) {
                if (!files[i].type.match(/image.*/)) continue
                if (files[i].size > 5000000) continue
                this.canSubmit = false
                uploadImage(files[i])
                .then(imgUrl => {
                    console.log('photo uploaded')
                    this.place.imgs.push(imgUrl)
                    this.canSubmit = true
                }).catch(err => {
                    console.error('error adding photo:', err)
                    this.canSubmit = true
                })
            }
        },
        addUrlToImgs() {
            if (!this.urlToAdd.trim()) return
            this.place.imgs.push(this.urlToAdd)
            this.urlToAdd = 'Added!'
            setTimeout(_=> {
                if (this.urlToAdd === 'Added!') this.urlToAdd = ''
            }, 1500)
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
            if (!this.canSubmit) return
            this.clicked = 'submit'
            console.log(this.place)
            setTimeout(_=> this.clicked = '', 200)
            setTimeout(_=> this.$emit('submit', this.place), 400)
        }
    }
}