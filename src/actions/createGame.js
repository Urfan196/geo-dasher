const createGame = (routeId, userId) => {
  return (dispatch) => {
    dispatch({ type: "BEGIN_CREATING_GAME"});
    return fetch(`http://localhost:3005/api/v1/games`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        game: {
          route_id: routeId,
          user_id: userId
        }
      })
    })
    .then(res => res.json())
    .then(parsedJSON => {
      console.log(parsedJSON)
    })
  }
}

export default createGame




// const fetchGames = (user_id) => {
//   return (dispatch) => {
//     dispatch({ type: "START_ADDING_GAMES" });
//     return fetch(`http://localhost:3005/api/v1/users/${user_id}`, {
//              method: "GET",
//              headers: {
//                "Content-Type": "application/json",
//                "Accept": "application/json",
//                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
//              }
//            })
//            .then(res => res.json())
//            .then(userObj => {
//                let games = userObj.user.games
//                let user = userObj.user
//                dispatch({ type: "SET_CURRENT_USER", user: user })
//                dispatch({ type: "ADD_GAMES", games: games })
//
//            })
//            .catch(parsedJSON => null)
//   }
// }
//
// export default fetchGames