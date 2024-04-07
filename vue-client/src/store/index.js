/* créer une variable bool userLogged. Pour identifier si un utilisateur est connecté. 
Permettra de conditionner l'affichage de certains composants + gérer les requêtes pour alimenter le store. 
userLogged sera à utiliser pour vérifier qu'un utilisateur est bien connecté, pour faire les requêtes au backend (récupérer username, crédit, id des articles, etc...)
*/

import { createStore } from 'vuex'
import axios from 'axios'; 

export default createStore({
  // données utilisées par les composants
  state: {
    accessToken: null,
    refreshToken: null,
  },
  // Fait l'intermédiaire entre actions et state
  mutations: {
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
  // actions sert aux appels API et les méthodes que l'on appelle depuis les components pour interagir avec les données du store
  actions: {

  }
})