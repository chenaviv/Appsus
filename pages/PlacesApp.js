
import PlacesService from '../service/placesService.js'
import {initMap, initSearch} from '../js/mapInit.js'
import mapContainer from '../cmps/mapContainer.js'
import placePreview from '../cmps/placePreview.js'
import placeDetails from '../cmps/placeDetails.js'
import placeEdit from '../cmps/placeEdit.js'
import confirmModal from '../cmps/utils/confirmModal.js'

export default {
    template: `
        <section class="places-app">

            <map-container @addPlace="addPlaceMode" @currentLocationReq="markCurrentLocation" :showAdd="showAdd"></map-container>
            <place-edit v-if="placeToEdit" :place="placeToEdit" @submit="savePlace"></place-edit>

            <div class="places">
                <ul class="places-list">
                    <place-preview v-for="place in places" :key="place.id" @selected="changeSelected" :place="place"></place-preview>
                </ul>

                <place-details v-if="placeSelected" @editPlace="editPlaceMode" @deletePlace="setPlaceToDelete" :place="placeSelected"></place-details>
            </div>

            <confirm-modal v-if="placeToDelete" @confirm="deletePlace" @cancel="placeToDelete = null">
                Are you sure you want to remove {{placeToDelete.name}} from your list
            </confirm-modal>

        </section>
    `,
    data() {
        return {
            places: [],
            placeSelected: null,
            map: null,
            markers: [],
            tempMarker: new google.maps.Marker(),
            showAdd: false,
            placeToEdit: null,
            placeToDelete: null
        }
    },
    // computed: {
    //     showAdd() {
    //         return this.tempMarker.getMap()
    //     }
    // },
    components: {
        mapContainer,
        placePreview,
        placeDetails,
        placeEdit,
        confirmModal
    },
    methods: {
        showTempMarker(coords) {
            this.map.panTo(coords)
            this.tempMarker.setPosition(coords)
            this.tempMarker.setAnimation(google.maps.Animation.DROP)
            this.tempMarker.setMap(this.map)
            this.tempMarker.addListener('click', _=> this.placeToEdit = PlacesService.getEmptyPlace())
        },
        addPlaceMode() {
            this.placeToEdit = PlacesService.getEmptyPlace()
        },
        editPlaceMode(place) {
            this.placeToEdit = place
        },
        setPlaceToDelete(place) {
            this.placeToDelete = place
        },
        deletePlace() {
            PlacesService.deletePlace(this.placeToDelete.id)
            .then(_=> {
                var markerIdx = this.markers.findIndex(({places_id}) => places_id === this.placeToDelete.id)
                this.markers[markerIdx].setMap(null)
                this.markers.splice(markerIdx, 1)
                this.placeToDelete = null
                this.placeSelected = null   // temporary fix
                console.log('delete from local places array or query for updated places list')
            })
        },
        savePlace(place) {
            this.placeToEdit = null
            if(!place) return
            if (!place.id) {
                place.coords = {
                    lat: this.tempMarker.position.lat(),
                    lng: this.tempMarker.position.lng()
                }
                PlacesService.savePlace(place)
                .then(place => {
                    console.log(place)
                    console.log('Push place into  local places array')
                    this.tempMarker.setMap(null)
                    this.showAdd = false
                    var marker = this.getPlaceMarker(place)
                    marker.setMap(this.map)
                    this.markers.push(marker)
                })
                .catch(err => console.error('An error occured:', err))
            } else PlacesService.savePlace(place).then(place => {
                this.markers.find(({places_id}) => places_id === place.id).setIcon(`../img/push-pin-${place.tag}.png`)
                console.log('Use splice to replace previous place details with the updated ones or query for the new places array')
            }).catch(err => console.error('An error occured:', err))
        },
        getPlaceMarker({coords, tag, id}) {
            var marker = new google.maps.Marker({
                position: coords,
                icon: `../img/push-pin-${tag}.png`,
                places_id: id,
                animation: google.maps.Animation.DROP
            })
            marker.addListener('click', (ev => this.changeSelected(marker.places_id)))
            return marker
        },
        markCurrentLocation(fallbackCoords) {
            navigator.geolocation.getCurrentPosition(location => {
                var coords = {lat: location.coords.latitude, lng: location.coords.longitude};
                this.showTempMarker(coords);
            }, err => {
                console.log(err);
                if (!fallbackCoords) return;
                // TODO: Indicate to user that current location was not handled.
        
                this.showTempMarker(fallbackCoords)
            });
        },
        changeSelected(placeId) {
            this.placeSelected = this.places.find(place => placeId === place.id)
            this.map.panTo(this.placeSelected.coords)
            this.map.setZoom(17)
            var marker = this.markers.find(({places_id}) => places_id === this.placeSelected.id)
            marker.setAnimation(google.maps.Animation.BOUNCE)
            setTimeout(_=> marker.setAnimation(null), 2000)
        }
    },
    created() {
        PlacesService.query().then(places => {
            this.places = places
            this.markers = places.map(place => this.getPlaceMarker(place))
            this.markers.forEach((marker, i) => {
                setTimeout(_=> marker.setMap(this.map), i * 300)
            })
        })
    },
    mounted() {
        this.map = initMap()
        // this.tempMarker.setMap(this.map)
        var autoComplete = initSearch()
        autoComplete.addListener('place_changed', () => {
            let place = autoComplete.getPlace()
            console.log('place_changed');
            if (!place.geometry) {
                console.log('Searched for:', place.name)
                console.log('TODO use geocoding to try to get the coordinates')
                return;
            }
            let coords = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
            
            this.showTempMarker(coords)
            this.showAdd = true;
        })
    }
}
