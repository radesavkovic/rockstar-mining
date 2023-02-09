import { createSlice } from '@reduxjs/toolkit';

const initialState ={
	updateFlag:false,
}

const dataSlice = createSlice({
	name: 'dataSlice',
	initialState,
	reducers: {
		setUpdateFlag(state, action) {
			state.updateFlag = action.payload;
		},
    }
})

export const {
	setUpdateFlag,
} = dataSlice.actions;
export default dataSlice.reducer;