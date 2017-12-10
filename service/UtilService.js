
// supports only 'hh:mm dd/mm/yy' format right now
export const formatDate = (timestamp, withHour) => {
    var date = new Date(timestamp)
    var dd = date.getDate()
    // var mm = date.getMonth() + 1
    var mm = (function () {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[date.getMonth()];
    })();
    var yy = date.getFullYear()
    var hh = date.getHours()
    var minutes = date.getMinutes()

    return (withHour)?  `${mm} ${dd} ${yy} ${hh}:${minutes}` : `${mm} ${dd} ${yy}`
}

export default {
    formatDate
}
