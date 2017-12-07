
import PlacesService from '../service/placesService.js'
import searchBar from '../cmps/utils/searchBar.js'
// import mapContainer from '../cmps/mapContainer.js'

export default {
    template: `
        <section class="places-app">

            <section class="map-container">
                <section class="controls">
                    <div class="search">
                        <search-bar></search-bar>
                    </div>
                    <div class="buttons">
                        <button @click="" class="not-btn" title="Current Location">
                            <i class="fa fa-location-arrow" aria-hidden="true"></i>                    
                        </button>
                        <button @click="" class="not-btn" title="Copy URL to clipboard">
                            <i class="fa fa-clipboard" aria-hidden="true"></i>                    
                        </button>
                    </div>
                </section>

                <div class="actual-map"></div>
            </section>

        </section>
    `,
    components: {
        searchBar
    },
    mounted() {
        PlacesService.initMap()
    }
}
