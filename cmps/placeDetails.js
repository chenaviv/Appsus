
import imageCarousel from '../cmps/imageCarousel.js'


export default {
    template: `
        <section class="place-details">
            
            <div class="top">
                <h2 class="name">{{place.name}}</h2>
            </div>
            <p>{{place.description}}</p>

            <image-carousel v-if="place.imgs[0]" :images="place.imgs"></image-carousel>

        </section>
    `,
    props: ['place'],
    components: {
        imageCarousel
    }
}