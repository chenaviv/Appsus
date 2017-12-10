import StorageService from './StorageService.js'

const KEY_STORE = 'myEmails'

var lsEmails = StorageService.load(KEY_STORE)
lsEmails = (lsEmails)? lsEmails : []
lsEmails = (lsEmails.length > 0)? lsEmails : null

var emails = lsEmails || [
    {
        id: 100,
        subject: 'Ideas for A Novel',
        from: 'someone@gmail.com',
        to: 'me@gmail.com',
        txt: 'none so far',
        read: false,
        created: 1430574728000
    },
    {
        id: 101,
        subject: 'Zdeas for A Novel',
        from: 'someone@gmail.com',
        to: 'me@gmail.com',
        txt: 'none so far',
        read: false,
        created: 1272672000000        
    },
    {
        id: 102,
        subject: 'ideas for A Novel',
        from: 'someone@gmail.com',
        to: 'me@gmail.com',
        txt: 'none so far',
        read: false,
        created: 1424649600000
        
    },
    {
        id: 103,
        subject: 'bdeas for A Novel',
        from: 'someone@gmail.com',
        to: 'me@gmail.com',
        txt: 'none so far',
        read: false,
        created: 1388620800000
    }
]

const getEmails = () => {
    return new Promise((resolve) => {
        setTimeout(_ => resolve(emails), 1000)
    })
}

const getEmail = emailId => {
    return new Promise((resolve, reject) => {
        var foundEmail = emails.find(email => email.id === emailId)
        foundEmail? resolve(foundEmail) : reject(`Could not find a email with ID ${emailId}`)
    })
}

const sendEmail = email => {
    email.id = _getNextId()
    email.created = Date.now()
    emails.push(email)
    StorageService.store(KEY_STORE, emails)
    return Promise.resolve(email)
}

// const saveEmail = email => {
//     if (email.id) {
//         let updateIdx = emails.findIndex(currEmail => currEmail.id === email.id)
//         if (updateIdx !== -1) {
//             emails.splice(updateIdx, 1, email)
//             StorageService.store(KEY_STORE, emails)
//         }
//         else return Promise.reject('failure saving email')
//     } else {
//         email.id = _getNextId()
//         email.created = Date.now()
//         emails.push(email)
//         StorageService.store(KEY_STORE, emails)
//     }

//     return Promise.resolve(email)
// }

const markRead = (emailId, isRead) => {
    return new Promise((resolve, reject) => {
        var email = emails.find(({id}) => id === emailId)
        if (email) {
            email.read = isRead
            resolve(email)
        } else reject('Error while trying to find email in database')
    })
}


const _getNextId = () => {
    var maxId = emails.reduce((acc, email)=>{
        return (email.id > acc)? email.id : acc
    }, 0);
    return maxId + 1;
} 

const deleteEmail = emailId => {
    return new Promise((resolve, reject) => {
        let deleteIdx = emails.findIndex(currEmail => currEmail.id === emailId)
        if (deleteIdx !== -1) {
            emails.splice(deleteIdx, 1)
            StorageService.store(KEY_STORE, emails)            
            resolve()
        } 
        else reject('Did not find email to delete')
    })
}

const emptyEmail = () => ({
    subject: '',
    from: 'me@gmail.com',
    to: 'myself@gmail.com',
    txt: '',
    read: false,
})


export default {
    getEmails,
    getEmail,
    emptyEmail,
    // saveEmail,
    deleteEmail,
    markRead,
    sendEmail
    // sortByCreated,
    // sortByPriority
}
