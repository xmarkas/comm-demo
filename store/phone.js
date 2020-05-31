export const state = () => ({
    dialNumber: ""
})

export const mutations = {
    updateDialNumber(state, data) {
        console.log('STORE- updateDialNumber', data)
        state.dialNumber = data;
    }
}
