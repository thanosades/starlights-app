const reducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...state, action.payload];
    case 'UPDATE':
      const updatedPost = action.payload;
      return state.map(post => 
        post.id === updatedPost.id ? updatedPost : post);
    case 'DELETE':
      return state.filter(post => post.id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
