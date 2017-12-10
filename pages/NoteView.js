
import NoteService from '../service/NoteService.js'
import UtilService from '../service/UtilService.js'
import noteUpdate from '../cmps/noteUpdate.js'
import confirmModal from '../cmps/utils/confirmModal.js'
import colorPicker from '../cmps/utils/colorPicker.js'

export default {
    template: `
    <transition name="custome" enter-active-class="animated zoomIn">                
        <div class="card note" :class="[note.color, { grouped: !noteId }]" @mouseover="showControls" @mouseleave="hideControls">
            <header class="card-header">
                <p class="card-header-title" v-if="note.title">{{note.title}}</p>
                <a class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i v-if="note.priority === 3" class="fa fa-thermometer-full" aria-hidden="true"></i>
                        <i v-if="note.priority === 2" class="fa fa-thermometer-half" aria-hidden="true"></i>
                        <i v-if="note.priority === 1" class="fa fa-thermometer-empty" aria-hidden="true"></i>
                    </span>
                </a>
            </header>
            <div class="card-content">
                <div class="content text" v-if="note.txt">{{note.txt}}</div>
                <div class="image" v-if="note.img"><img :src="note.img" /></div>
            </div>
            
                <div class="card-footer">                  
                    <transition name="fade">   
                        <h6 class="date" v-if="!controlsVisible">{{date}}</h6> 
                        <div class="is-flex-between" v-else>                  
                        <a class="card-footer-item" @click="showPicker = !showPicker" title="Color picker">
                            <i class="fa fa-paint-brush" aria-hidden="true"></i>
                        </a> 
                        <a class="card-footer-item" @click="editMode = true" title="Edit note">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </a> 
                        <a class="card-footer-item" @click="deleteConfirm = true" title="Delete note">
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </a> 
                        </div>
                    </transition>
                </div>
                <note-update v-if="editMode" :note="noteToUpdate" @update="updateNote"></note-update>
                <confirm-modal v-if="deleteConfirm" @confirm="deleteNote" @cancel="deleteConfirm = false">Are you sure?</confirm-modal>
                <color-picker v-if="showPicker" :value="note.color" @input="updateNoteColor" @mouseleave.native="showPicker = false"></color-picker>
        </div>  
    </transition>                 
    `,
    props: ['currNote'],
    data() {
        return {
            note: NoteService.emptyNote(),
            date: '',
            noteId: +this.$route.params.noteId,
            editMode: false,
            deleteConfirm: false,
            controlsVisible: false,
            showPicker: false
        }
    },
    components: {
        noteUpdate,
        confirmModal,
        colorPicker
    },
    computed: {
        noteToUpdate() {
            return Object.assign(NoteService.emptyNote(), this.note)
        }
    },
    methods: {
        updateNote(note) {
            this.editMode = false;
            if (!note) return
            NoteService.saveNote(note)
                .then(note => this.note = note) //redundant in this case
                .catch(err => console.log('Error while trying to update', err))
        },
        updateNoteColor(color) {
            var noteToUpdate = Object.assign(this.noteToUpdate, {color})
            this.updateNote(noteToUpdate)
        },
        deleteNote() {
            this.deleteConfirm = false;
            NoteService.deleteNote(this.note.id)
                .then(_ => 'note deleted')
                .catch(err => console.log('error deleting note', err))
        },
        showControls() {
            this.controlsVisible = true
        },
        hideControls() {
            this.controlsVisible = false
            this.showPicker = false
        }
    },
    created() {
        if (this.currNote) {
            this.note = this.currNote
            this.date = UtilService.formatDate(this.note.created)
            return
        }

        if (this.noteId) {
            NoteService.getNote(this.noteId)
                .then(note => this.note = note)
                .catch(err => {
                    console.log(err)
                    this.$router.push('/')
                })
        }
    }
}


























