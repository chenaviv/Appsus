
// import imageCarousel from '../cmps/imageCarousel.js'
import imageViewer from '../cmps/imageViewer.js'


export default {
    template: `
        <section class="place-details">
            
            <div class="top">
                <h2 class="name">{{place.name}}</h2>
            </div>
            <p>{{place.description}}</p>

            <image-viewer v-if="place.imgs[0]" :images="place.imgs"></image-viewer>

        </section>
    `,
    props: ['place'],
    components: {
        imageViewer
    }
}