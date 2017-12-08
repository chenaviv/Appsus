
export default {
    template: `
        <section class="modal confirm">
            <div class="inner">
                <slot></slot>
                <div class="controls">
                    <button class="button" @click="confirm">confirm</button>
                    <button class="button" @click="cancel">cancel</button>
                </div>
            </div>
        </section>
    `,
    methods: {
        confirm() {
            this.$emit('confirm')
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}