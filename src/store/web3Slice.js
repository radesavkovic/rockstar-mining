import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    userAddress:"",
	isLoaderOpen:false,
	loaderMessage:"",
	userData:"",
	contractData:"",
	userReferral:[],
	minerPrice:0,
	modalValue:false,
}

const web3Slice = createSlice({
	name: 'web3Slice',
	initialState,
	reducers: {
		setWalletAddress(state, action) {
			state.userAddress = action.payload;
		},
		setLoaderValue(state,action){
			const {isLoaderOpen,loaderMessage} = action.payload;
			state.isLoaderOpen = isLoaderOpen;
			state.loaderMessage = loaderMessage;
		},
		setUserData(state, action) {
			state.userData = action.payload;
		},
		setContractData(state, action) {
			state.contractData = action.payload;
		},
		setReferralData(state,action){
			state.userReferral = action.payload;
		},
		setMinerPrice(state,action){
			state.minerPrice = action.payload;
		},
		setModalValue(state,action){
			state.modalValue = action.payload;
		},
    }
})

export const {
	setWalletAddress,
	setLoaderValue,
	setUserData,
	setContractData,
	setReferralData,
	setMinerPrice,
	setModalValue,
} = web3Slice.actions;
export default web3Slice.reducer;