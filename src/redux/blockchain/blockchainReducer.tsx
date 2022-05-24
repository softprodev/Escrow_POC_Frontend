const initialState = {
    loading: false,
    account: null,
    smartContract: null,
    activeProducers: null,
    activeProviders: null,
    assetsArray: null,
    escrowArray: null,
    contractOwnerAddress: null,
    activeAssetTypes: null,
    web3: null,
    errorMsg: "",
    isconnected: false,
};

const blockchainReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "CONNECTION_REQUEST":
            return {
                ...initialState,
                loading: true,
                isconnected: false,
            };
        case "CONNECTION_SUCCESS":
            return {
                ...state,
                loading: false,
                account: action.payload.account,
                smartContract: action.payload.smartContract,
                activeProducers: action.payload.activeProducers,
                activeProviders: action.payload.activeProviders,
                activeAssetTypes: action.payload.activeAssetTypes,

                assetsArray: action.payload.assetsArray,
                escrowArray: action.payload.escrowArray,
                contractOwnerAddress: action.payload.contractOwnerAddress,
                web3: action.payload.web3,
                isconnected: true,

            };
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,
                isconnected: false,

            };
        case "UPDATE_ACCOUNT":
            return {
                ...state,
                account: action.payload.account,
                isconnected: true,
            };
        default:
            return state;
    }
};

export default blockchainReducer;
