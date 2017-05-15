
export const required = (value) => {
    // empty is invalid
    if(value == '') return "Required"
    // Initial state is null/undefined
    if(!value) return true
}
