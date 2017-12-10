

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
                <hr>
                <div class="content">
                    {{email.txt}}
                </div>
            </div>
         </div>
    `,
    props: ['email']
}