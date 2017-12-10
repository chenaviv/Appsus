import EmailService from '../service/EmailService.js'

export default {
    template: `
        <section class="email-compose">
            <div class="field">
                <label class="label">Subject</label>
                <div class="control">
                    <input v-model="email.subject" class="input" type="text" placeholder="Enter email subject">
                </div>
            </div>

        
            <div class="field">
                <label class="label">Recipient email</label>
                <div class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email input" :value="email.to" disabled>
                    <span class="icon is-small is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                </div>
            </div>
        
            <div class="field">
                <label class="label">Message</label>
                <div class="control">
                    <textarea v-model="email.txt" class="textarea" placeholder=""></textarea>
                </div>
            </div>
        
            <div class="field is-grouped">
                <div class="control">
                    <button @click="send" class="button is-link">Send</button>
                </div>
                <div class="control">
                    <button @click="cancel" class="button is-text">Cancel</button>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            email: EmailService.emptyEmail()
        }
    },
    methods: {
        send() {
            EmailService.sendEmail(this.email)
            .then(email => this.$emit('sent', email))
        },
        cancel() {
            this.$emit('sent', null)
        }
    }
}
