
const mapSelector = '.actual-map'

var map = null
var tempMarker = null
var markers = []

const showTempMarker = coords => {
    map.panTo(coords)
    tempMarker.setPosition(coords)
    tempMarker.setAnimation(google.maps.Animation.DROP)
}

const initSearch = () => {
    console.log('Entered initSearch')

    var elSearch = document.querySelector('.map-container .search-bar input')
    var elBtn = document.querySelector('.map-container .search-bar .not-btn')
    var autoComplete = new google.maps.places.Autocomplete(elSearch)

    window.autoComplete = autoComplete

    autoComplete.addListener('place_changed', () => {
        let place = autoComplete.getPlace()
        console.log(place);
        if (!place.geometry) {
            console.log('Searched for:', place.name)
            console.log('TODO use geocoding to try to get the coordinates')
            return;
        }
        let coords = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        
        showTempMarker(coords)
    })

    // elBtn.addEventListener('click', _ => {
    //     if (!elSearch.value) return
    //     google.maps.event.trigger(autoComplete, 'place_changed')
    // })
}

const initMap = () => {
    console.log('Entered initMap')
    var coords = {lat: 32.087955, lng: 34.803147}

    map = new google.maps.Map(document.querySelector(mapSelector), {
        center: coords,
        zoom: 15
    })

    initSearch()

    tempMarker = new google.maps.Marker({
        map
    })
}

export default {
    initMap
}