/* créer une variable bool userLogged. Pour identifier si un utilisateur est connecté. 
Permettra de conditionner l'affichage de certains composants + gérer les requêtes pour alimenter le store. 
userLogged sera à utiliser pour vérifier qu'un utilisateur est bien connecté, pour faire les requêtes au backend (récupérer username, crédit, id des articles, etc...)
*/

/* 
Créer une méthode qui va checker les tokens à chaque chargement de page. 
Si le navigateur contient un access Token valide mais que le store ne contient pas de username ni de userId alors il faudra executer un process
qui va envoyer une requête au backend pour garder en mémoire l'id 
*/

/*
Item à charger dans le store après le login process: 
- username
- nb de credit
- liste des articles existants (charger les ids)

Tous ces éléments doivent également être effacé du store lorsque l'utilisateur se déconnecte ou si l'accessToken a expiré
*/

import { createStore } from 'vuex'
import axios from 'axios'; 

export default createStore({
  // données utilisées par les composants
  state: {
      username: null
  },
  // Fait l'intermédiaire entre actions et state
  mutations: {

  },
  // actions sert aux appels API et les méthodes que l'on appelle depuis les components pour interagir avec les données du store
  actions: {

  }
})