
import StorageService from './storageService.js'

const STORE_KEY = 'myPlaces'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/koolshooz/image/upload'
const CLOUDINARY_PRESET = 'c75cmahf'

var places = StorageService.load(STORE_KEY) || 
    [
        {
            name: 'Shemesh',
            description: 'A well known shwarma place',
            coords: {
                lat: 32.087451,
                lng: 34.803824
            },
            imgs: [],
            tag: 'food',
            id: 101
        },
        {
            name: 'Shpinoza Pharmacy',
            description: 'An established pharmacy in Ramat Gan',
            coords: {
                lat: 32.085949,
                lng: 34.001954
            },
            imgs: [],
            tag: 'shopping',
            id: 102
        },
        {
            name: 'Menza',
            description: 'A place for a hot lunch',
            coords: {
                lat: 32.086672,
                lng: 34.803242
            },
            imgs: [],
            tag: 'fun',
            id: 103
        },
        {
            name: 'Sabich Hasharon',
            description: 'A place for sabich',
            coords: {
                lat: 32.086158,
                lng: 34.802823
            },
            imgs: [],
            tag: 'education',
            id: 104
        },
        {
            name: 'Embassy',
            description: 'A place for sabich',
            coords: {
                lat: 32.085722,
                lng: 34.805093
            },
            imgs: [],
            tag: 'sports',
            id: 105
        }
    ]

const query = () => {
    return new Promise((resolve, reject) => {
        setTimeout(_ => resolve(places), 1000)
    })
}

const getPlace = placeId => {
    return new Promise((resolve, reject) => {
        var place = places.find(currPlace => currPlace.id === placeId)
        place? resolve(place) : reject(`Could not find a place entity with ID ${placeId}`)
    })
}

const savePlace = place => {
    return new Promise((resolve, reject) => {
        if (place.id) {
            let updateIdx = places.findIndex(currPlace => currPlace.id === place.id)
            if (updateIdx !== -1) {
                places.splice(updateIdx, 1, place)
                StorageService.store(STORE_KEY, places)
                resolve(place)
            } else reject('failure saving place')
        } else {
            place.id = _getNextId()
            place.created = Date.now()
            places.push(place)
            StorageService.store(STORE_KEY, places)
            resolve(place)
        }
    })
}

const _getNextId = () => {
    var maxId = places.reduce((acc, place)=>{
        return (place.id > acc)? place.id : acc
    }, 0);
    return maxId + 1;
}

const deletePlace = placeId => {
    return new Promise((resolve, reject) => {
        var deleteIdx = places.findIndex(place => place.id === placeId)
        if (deleteIdx !== -1) {
            places.splice(deleteIdx, 1)
            StorageService.store(STORE_KEY, places)            
            resolve()
        } 
        else reject('Could not find place to delete')
    })
}

const getEmptyPlace = () => ({
    name: '',
    description: '',
    coords: null,
    imgs: [],
    tag: ''
})

export const uploadImage= (file) => {

    var formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET)

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    return axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(res => res.data.url)
    .catch(err => console.log(err))

}



export default {
    query,
    getPlace,
    savePlace,
    deletePlace,
    getEmptyPlace
}