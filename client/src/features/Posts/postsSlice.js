import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

export const slice = createSlice({
  name: 'posts',
  initialState: {
    current: [],
  },
  reducers: {
    get: (state, action) => {
      state.current = action.payload;
    },
    create: (state, action) => {
      state.current.push(action.payload)
    },
    update: (state, action) => {
      state.current = state.current.map(post => post.id === action.payload.id 
        ? action.payload
        : post);
    },
    remove: (state, action) => {
      state.current = state.current.filter(post => post.id !== action.payload);
    }
  }
});

const { get, create, update, remove } = slice.actions;

// thunks
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch(get(data));
  } catch (error) {
    console.error(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch(create(data));
  } catch (error) {
    console.error(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch(update(data));
  } catch (error) {
    console.error(error);
  }
}

export const removePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch(remove(id));
  } catch (error) {
    console.error(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch(update(data));
  } catch (error) {
    console.error(error);
  }
}

export const selectPosts = state => state.posts.current;

export default slice.reducer;