

export default {
    template: `
        <li class="place-preview" :class="place.tag">

            <!-- <img class="img" v-if="place.imgs[0]" :src="place.img[0]" /> -->
            <h3 class="name">{{place.name}}</h3>
            <h6 class="tag">{{place.tag}}</h6>

        </li>
    `,
    props: ['place']
}