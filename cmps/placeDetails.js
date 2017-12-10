
import imageViewer from '../cmps/imageViewer.js'


export default {
    template: `
        <section class="place-details">
            
            <h2 class="name detail">{{place.name}}</h2>

            <p class="description detail">{{place.description}}</p>

            <image-viewer v-if="place.imgs[0]" :images="place.imgs" class="detail"></image-viewer>

            <div class="buttons">
                <button @click="editPlace" class="not-btn">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </button>
                <button @click="deletePlace" class="not-btn">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </button>
            </div>

        </section>
    `,
    props: ['place'],
    components: {
        imageViewer
    },
    methods: {
        editPlace() {
            this.$emit('editPlace', this.place)
        },
        deletePlace() {
            this.$emit('deletePlace', this.place)
        }
    }
}