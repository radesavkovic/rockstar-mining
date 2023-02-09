import { web3Store } from '../store/web3Store';
import { setUpdateFlag } from '../store/dataSlice';

export const updateFlag = async () => {
    const state = web3Store.getState();
    await web3Store.dispatch(
        setUpdateFlag({
            updateFlag: !(state?.dataReducer?.updateFlag),
        })
    )
}