 

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
            count: 3
        }
    },
    created() {
        // this.count = this.countStr
        console.log(this.images)
        console.log(this.count)
    },
    computed: {
        indexSequence() {
            if (this.images.length <= this.count) {
                return this.images.map((image, i) => i)
            } else {
                var idxs = []
                var nextIdx = this.currIndex++
                while (idxs.length < this.count) {
                    if (!this.images[nextIdx]) nextIdx = 0
                    idxs.push(nextIdx)
                    nextIdx++
                }
                console.log(idxs)
                return idxs
            }
        }
    }
 }