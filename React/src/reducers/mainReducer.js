const mainReducer = (state = {}, action) => {
  
    let newState = JSON.parse(JSON.stringify(state));
  
  
    switch(action.type) {
      
      case 'LOGIN':
        newState.nomusuari = action.nomusuari;
        newState.token = action.token;
        newState.idusuari = action.idusuari;
        return newState;
  
      case 'LOGOUT':
        delete newState.nomusuari;
        delete newState.token;
        delete newState.idusuari;
        return newState;
  
      default:
        return state;
    }
  
  
  }
  export default mainReducer;