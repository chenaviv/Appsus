
import NoteService from '../service/NoteService.js'
import NoteView from './NoteView.js'
import noteUpdate from '../cmps/noteUpdate.js'

export default {
    template: `
        <section class="notesapp">
            <div>
                <button @click="addMode = true" class="not-btn fa fa-lg" title="New note">
                    <i class="fa fa-plus"></i>
                </button>
                <button class="not-btn fa" @click="sortNotes('priority')" title="Sort by priority">
                <i class="fa fa-sort-amount-desc fa-lg" aria-hidden="true" ></i>
                </button>
                <button class="not-btn fa" @click="sortNotes('created')" title="Sort by date">
                    <i class="fa fa-sort-numeric-asc fa-lg" aria-hidden="true"></i>
                </button>
            </div>
            
                <div class="is-flex">
                    <note-view v-for="note in notes" :key="note.id" :curr-note="note"></note-view>
                </div>
                    <note-update v-if="addMode" :note="newNote" @update="addNote"></note-update>                
            
            
        </section>
    `,
    data() {
        return {
            notes: [],
            newNote: NoteService.emptyNote(),
            addMode: false
        }
    },
    components: {
        NoteView,
        noteUpdate
    },
    methods: {
        addNote(note) {
            this.addMode = false
            if (note === null) return
            else {
            NoteService.saveNote(note)
                .then(_ => this.newNote = NoteService.emptyNote())
                .catch(err => console.log('Error while trying to add note: ', err))
            }
        },

        sortNotes(sortBy) {
            sortBy === 'priority' ? NoteService.sortByPriority() : NoteService.sortByCreated() 
        }
    },
    created() {
        NoteService.getNotes()
            .then(notes => this.notes = notes)
            .catch(err => console.log('Error loading notes from server:', err))
    }
}