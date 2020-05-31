
export const state = () => ({
    sipId: "DemoUser1533722711245116084838",
    password: null,
    plivoUser: null,
})

export const mutations = {
    phoneLogin(state, data) {
        plivoLogin(state.sipId, data);
    },
    updatePlivoUser(state, data) {
        state.plivoUser = data;
    }
}

