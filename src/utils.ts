export default {
    daysBetweenDates(start: Date, end: Date){
        const diffInMillisecs = (
            end.getTime() - start.getTime()
        )
        return diffInMillisecs / (1000 * 3600 * 24)
    }
}