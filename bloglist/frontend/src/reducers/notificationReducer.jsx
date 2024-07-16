import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const notification = (content, seconds, type) => {
  return dispatch => {
    dispatch(setNotification({ content: content, type: type }))
    setTimeout(() => dispatch(removeNotification()), seconds * 1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer