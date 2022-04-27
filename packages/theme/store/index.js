export const state = () => ({
    cartItems: [],
    cartTotal: 0,
})

export const mutations = {
    SET_CARTTOTAL(state, totalItems){
        state.cartTotal = totalItems
    },
    SET_CART_ITEMS(state, cartItems){
        state.cartItems = cartItems
    }
}
export const actions = {
    async nuxtServerInit({ commit }, context) {
        // Do something on server initialised      
    }
}