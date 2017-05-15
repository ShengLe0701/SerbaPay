import moment from 'moment'

export const prepareEventDates = function (events, filterMonth) {
    const parsedDates = {}
    // Dates with custom properties
    events.forEach(event => {
        let tmpEvent = {}
        let {date, ...other} = event
        date = date || event
        date = moment(date)

        if (date.isValid()){
            const day = date.date() - 1

            if (filterMonth) {
                const filterStart = moment(filterMonth).startOf('month')
                const filterEnd = moment(filterMonth).endOf('month')

                if (!(date.isSameOrAfter(filterStart) && date.isSameOrBefore(filterEnd))){
                    return
                }
            }

            other = other || {}
            const tmpEvent = {date, ...other}

            parsedDates[day] = parsedDates[day] || []
            parsedDates[day].push(tmpEvent)
        }
    })
    return parsedDates
}
