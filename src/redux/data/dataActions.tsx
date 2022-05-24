// log
import store from "../store";

const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST",
    };
};

const fetchDataSuccess = (payload: any) => {
    return {
        type: "CHECK_DATA_SUCCESS",
        payload,
    };
};

const fetchDataFailed = (payload: any) => {
    return {
        type: "CHECK_DATA_FAILED",
        payload,
    };
};

function fetchData() {
    console.log("fetchData1");

    return async (dispatch: any) => {
        dispatch(fetchDataRequest());
        try {
            console.log("fetchData2", store
                .getState()
                .blockchain.smartContract.methods);

            const ActiveProducerArray = await store
                .getState()
                .blockchain.smartContract.methods.getProducerInfoArray()
                .call();
            console.log("fetchData3", ActiveProducerArray);

            dispatch(
                fetchDataSuccess({
                    ActiveProducerArray,
                    // cost,
                })
            );
        } catch (err) {
            console.log(err);
            dispatch(fetchDataFailed("Could not load data from contract."));
        }
    };
}



export default fetchData;