import {formatDate} from '../service/UtilService.js'

export default {
    template: `
        <div class="box message-preview email-view">
            <div class="top">
                <div class="avatar">
                    <img src="https://placehold.it/128x128">
                </div>
                <div class="address">
                    <div class="subject">{{email.subject}}</div>
                    <div class="email">{{email.from}}</div>
                </div>
                <div class="date">{{dateToDisplay}}</div>
                <button class="close-btn" @click="onClose"><i class="fa fa-times" aria-hidden="true"></i></button>
                <hr>
                <div class="content">
                    {{email.txt}}
                </div>
            </div>
         </div>
    `,
    props: ['email'],

    methods: {
        onClose() {
            this.$emit('onClose')
        }
    },
    computed: {
        dateToDisplay() {
            return formatDate(this.email.created, true)
        },
    }
}