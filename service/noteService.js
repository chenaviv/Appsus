import StorageService from './StorageService.js'

const KEY_STORE = 'myNotes'

var lsNotes = StorageService.load(KEY_STORE)
lsNotes = (lsNotes > 0)? lsNotes : null

var notes = lsNotes || [
    {
        id: 100,
        title: 'Ideas for A Novel',
        txt: 'none so far',
        img: 'https://reformedforum.org/wp-content/blogs.dir/1/files/2016/06/book.jpg',
        color: 'green',
        priority: 2,
        created: 1430574728000
    },
    {
        id: 101,
        title: 'Tasks for Wednesday',
        txt: 'Water the plants',
        img: 'https://wiki.nurserylive.com/uploads/default/original/2X/d/d2fe3deb67a8a3b92dd953d6854b0265f3ee1246.jpg',
        color: 'yellow',
        priority: 2,
        created: 1512499946000
    },
    {
        id: 102,
        title: 'Application Forms',
        txt: 'fill in and send',
        img: 'http://fairdealdisplay.com/wp/wp-content/uploads/2016/01/Supermarket-racks.jpg',
        color: 'green',
        priority: 3,
        created: 1430574728000
    },
    {
        id: 103,
        title: 'Check workflows',
        txt: 'Leads, contacts and support',
        img: 'https://images.studentuniverse.com/new/suwebui/photos/marketing/student-travel-student-flights.jpg',
        color: 'yellow',
        priority: 3,
        created: 1512499946000
    },
    {
        id: 104,
        title: 'Update monthly targets',
        txt: 'need to validate benchmarks',
        img: 'https://www.signupto.com/wp-content/uploads/2017/01/Benchmark-3000x1562px-web-header.jpg',
        color: 'green',
        priority: 2,
        created: 1430574728000
    },
    {
        id: 105,
        title: 'Tasks for Thursday',
        txt: 'fix the dryer',
        img: 'https://bigfishtees.com/wp-content/uploads/2015/06/Depositphotos_22198035_xs.jpg',
        color: 'red',
        priority: 1,
        created: 1512499946000
    },
    {
        id: 106,
        title: 'Weekend trip',
        txt: 'Make reservations',
        img: 'https://2xd7m81yfswf20bam1231iux-wpengine.netdna-ssl.com/wp-content/uploads/2014/08/AdobeStock_90080788-2000x1250.jpg',
        color: 'blue',
        priority: 1,
        created: 1430574728000
    },
    {
        id: 107,
        title: 'Sunday launch',
        txt: 'Make reservations',
        img: 'https://bar145columbus.com/images/gallery/gallery5.jpg',
        color: 'yellow',
        priority: 2,
        created: 1512499946000
    }
]

const getNotes = () => {
    return new Promise((resolve) => {
        setTimeout(_ => resolve(notes), 1000)
    })
}

const getNote = noteId => {
    return new Promise((resolve, reject) => {
        var foundNote = notes.find(note => note.id === noteId)
        foundNote? resolve(foundNote) : reject(`Could not find a note with ID ${noteId}`)
    })
}

const saveNote = note => {
    if (note.id) {
        let updateIdx = notes.findIndex(currNote => currNote.id === note.id)
        if (updateIdx !== -1) {
            notes.splice(updateIdx, 1, note)
            StorageService.store(KEY_STORE, notes)
        }
        else return Promise.reject('failure saving note')
    } else {
        note.id = _getNextId()
        note.created = Date.now()
        notes.push(note)
        StorageService.store(KEY_STORE, notes)
    }

    return Promise.resolve(note)
}


const _getNextId = () => {
    var maxId = notes.reduce((acc, note)=>{
        return (note.id > acc)? note.id : acc
    }, 0);
    return maxId + 1;
} 

const deleteNote = noteId => {
    return new Promise((resolve, reject) => {
        let deleteIdx = notes.findIndex(currNote => currNote.id === noteId)
        if (deleteIdx !== -1) {
            notes.splice(deleteIdx, 1)
            StorageService.store(KEY_STORE, notes)            
            resolve()
        } 
        else reject('Did not find note to delete')
    })
}

const sortByPriority = () => {
        notes.sort(function (a, b) {
            return b.priority - a.priority
        })   
}

const sortByCreated = () => {
        notes.sort(function (a, b) {
            return  b.created - a.created;
        })   
}

const emptyNote = () => ({
    title: '',
    txt: '',
    img: null,
    color: 'yellow',
    priority: 2, // 1 = high / 2 = normal / 3 = low
})


export default {
    getNotes,
    getNote,
    emptyNote,
    saveNote,
    deleteNote,
    sortByCreated,
    sortByPriority
}