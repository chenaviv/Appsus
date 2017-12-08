 

 export default {
     template: `
        <section class="image-carousel">
        
            <div v-for="i in indexSequence" class="img">
                <img :src="'../img/' + images[i]" />
            </div>

            <button class="not-btn"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </section>
     `,
    props: ['images', 'countStr'],
    data() {
        return {
            currIndex: 0,
            count: 0
        }
    },
    created() {
        this.count = + this.countStr
        console.log(this.images)
    },
    computed: {
        indexSequence() {
            if (this.images.length <= this.count) {
                return this.images.map((image, i) => i)
            } else {
                var idxs = [this.currIndex]
                var nextIdx = this.currIndex++
                while (idxs.length < this.count) {
                    if (!this.imgs[nextIdx]) nextIdx = 0
                    idxs.push(nextIdx)
                    nextIdx++
                }
                return idxs
            }
        }
    }
 }