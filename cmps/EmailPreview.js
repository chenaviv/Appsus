
import {formatDate} from '../service/UtilService.js'

export default {
    template: `
        <div class="panel-block email-preview">
            <div class="panel-icon">
                    <i class="fa fa-trash-o" title="Delete"></i>
                <button @click="markRead" class="not-btn">
                    <i v-if="email.read" class="fa fa-envelope-open-o" title="Mark as unread"></i>
                    <i v-else class="fa fa-envelope" title="Mark as read"></i>
                </button>
            </div>
            <a  @click="selectEmail" class="email-data">
                <div class="sender" :class="readClass">
                    {{email.from}}
                </div>
                <div class="subject" :class="readClass">
                    {{email.subject}}
                </div>
                <div class="date" :class="readClass">
                    {{dateToDisplay}}
                </div>
            </a>
        </div>
    `,
    props: ['email'],
    computed: {
        dateToDisplay() {
            return formatDate(this.email.created)
        },
        readClass() {
            return {unread: !this.email.read}
        }
    },
    methods: {
        markRead() {
            this.$emit('markRead', {id: this.email.id, read: !this.email.read})
        },
        selectEmail() {
            this.$emit('selected', this.email)
        }
    }
}
