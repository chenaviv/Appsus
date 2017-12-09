 

 export default {
     template: `
        <section class="image-viewer">
        
            <button @click="prevPhoto" class="not-btn left"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
            <div class="img">
                <img :src="images[i]" />
            </div>
            <button @click="nextPhoto" class="not-btn right"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>

        </section>
     `,
    props: ['images'],
    data() {
        return {
            i: 0
        }
    },
    methods: {
        nextPhoto() {
            if (this.i === this.images.length - 1) this.i = 0
            else this.i++
        },
        prevPhoto() {
            if (this.i === 0) this.i = this.images.length - 1
            else this.i--
        }
    }
 }