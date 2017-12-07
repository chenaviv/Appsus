
import PlacesService from '../service/placesService.js'
import {initMap, initSearch} from '../js/mapInit.js'
import mapContainer from '../cmps/mapContainer.js'
import placePreview from '../cmps/placePreview.js'

export default {
    template: `
        <section class="places-app">

            <map-container @currentLocationReq="markCurrentLocation"></map-container>

            <div class="places">
                <ul class="places-list">
                    <place-preview v-for="place in places" :key="place.id" :place="place"></place-preview>
                </ul>
            </div>

        </section>
    `,
    data() {
        return {
            places: [],
            map: null,
            markers: [],
            tempMarker: new google.maps.Marker()
        }
    },
    components: {
        mapContainer,
        placePreview
    },
    methods: {
        showTempMarker(coords) {
            this.map.panTo(coords)
            this.tempMarker.setPosition(coords)
            this.tempMarker.setAnimation(google.maps.Animation.DROP)
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
        }
    },
    created() {
        PlacesService.query().then(places => {
            this.places = places
            this.markers = places.map(place => ({
                id: place.id,
                marker: new google.maps.Marker({
                    position: place.coords
                })
            }))
            this.markers.forEach(({marker}) => {
                marker.setMap(this.map)
            })
        })
    },
    mounted() {
        this.map = initMap()
        this.tempMarker.setMap(this.map)
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
        })
    }
}
