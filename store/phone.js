export const state = () => ({
    dialNumber: "",
    contacts:[
        {
          active: true,
          name: "Jano Smith",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          name: "Wes Vega",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          name: "Naomi Blackstone",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          name: "Luz Palmer",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ]
})

export const mutations = {
    updateDialNumber(state, data) {
        console.log('STORE- updateDialNumber', data)
        state.dialNumber = data;
    },
    addContact(state, data) {
        state.contacts.push(data);
    }
}
