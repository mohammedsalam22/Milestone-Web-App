import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postsAPI } from '../../api/posts';

// Async thunks
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postsAPI.getPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch posts');
    }
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await postsAPI.getPost(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postsAPI.createPost(postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create post');
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, postData }, { rejectWithValue }) => {
    try {
      const response = await postsAPI.updatePost(id, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update post');
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await postsAPI.deletePost(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete post');
    }
  }
);

// Comment async thunks
export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postId, text }, { rejectWithValue, dispatch }) => {
    try {
      const response = await postsAPI.addComment({ post: postId, text });
      const comment = response.data;
      
      // Optimistically add comment to state
      dispatch(addCommentToPost({ postId, comment }));
      
      return { postId, comment };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      await postsAPI.deleteComment(commentId);
      
      // Optimistically remove comment from state
      dispatch(deleteCommentFromPost({ postId, commentId }));
      
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete comment');
    }
  }
);

export const addReply = createAsyncThunk(
  'posts/addReply',
  async ({ postId, commentId, text }, { rejectWithValue, dispatch }) => {
    try {
      const response = await postsAPI.addReply({ 
        post: postId, 
        comment: commentId, 
        text 
      });
      const reply = response.data;
      
      // Optimistically add reply to state
      dispatch(addReplyToComment({ postId, commentId, reply }));
      
      return { postId, commentId, reply };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add reply');
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
};

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    addCommentToPost: (state, action) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
      if (state.currentPost && state.currentPost.id === postId) {
        state.currentPost.comments.push(comment);
      }
    },
    updateCommentInPost: (state, action) => {
      const { postId, commentId, updatedComment } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        const commentIndex = post.comments.findIndex(c => c.id === commentId);
        if (commentIndex !== -1) {
          post.comments[commentIndex] = { ...post.comments[commentIndex], ...updatedComment };
        }
      }
      if (state.currentPost && state.currentPost.id === postId) {
        const commentIndex = state.currentPost.comments.findIndex(c => c.id === commentId);
        if (commentIndex !== -1) {
          state.currentPost.comments[commentIndex] = { ...state.currentPost.comments[commentIndex], ...updatedComment };
        }
      }
    },
    deleteCommentFromPost: (state, action) => {
      const { postId, commentId } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.comments = post.comments.filter(c => c.id !== commentId);
      }
      if (state.currentPost && state.currentPost.id === postId) {
        state.currentPost.comments = state.currentPost.comments.filter(c => c.id !== commentId);
      }
    },
    addReplyToComment: (state, action) => {
      const { postId, commentId, reply } = action.payload;
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        const comment = post.comments.find(c => c.id === commentId);
        if (comment) {
          if (!comment.replies) comment.replies = [];
          comment.replies.push(reply);
        }
      }
      if (state.currentPost && state.currentPost.id === postId) {
        const comment = state.currentPost.comments.find(c => c.id === commentId);
        if (comment) {
          if (!comment.replies) comment.replies = [];
          comment.replies.push(reply);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single post
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create post
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createLoading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.posts.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
        if (state.currentPost && state.currentPost.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.posts = state.posts.filter(p => p.id !== action.payload);
        if (state.currentPost && state.currentPost.id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearCurrentPost,
  addCommentToPost,
  updateCommentInPost,
  deleteCommentFromPost,
  addReplyToComment,
} = postsSlice.actions;

export default postsSlice.reducer; 