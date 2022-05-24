// constants
import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
// import { AbiItem } from 'web3-utils'
// log
import fetchData from "../data/dataActions";


const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
};

const connectSuccess = (payload: any) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload,
    };
};

const connectFailed = (payload: any) => {
    return {
        type: "CONNECTION_FAILED",
        payload,
    };
};

const updateAccountRequest = (payload: any) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload,
    };
};

export const connect = () => {
    return async (dispatch: any) => {
        console.log("connect start");

        dispatch(connectRequest());
        const abiResponse = await fetch("/config/abi.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        const abi = await abiResponse.json();
        const configResponse = await fetch("/config/config.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });

        console.log("connect start", configResponse);

        const CONFIG = await configResponse.json();
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

        console.log("connect start metamask", metamaskIsInstalled);

        if (metamaskIsInstalled) {
            const web3 = new Web3(ethereum);

            console.log("connect start web3", web3);

            web3.setProvider(ethereum);

            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });

                console.log("connect start accounts", accounts);

                const networkId = await ethereum.request({
                    method: "net_version",
                });


                console.log("Network ID", networkId);
                console.log("Network ID config", CONFIG.NETWORK.ID);

                if (networkId.toString() === CONFIG.NETWORK.ID.toString()) {
                    console.log("Network ID matched");

                    const SmartContractObj = new web3.eth.Contract(
                        abi,
                        CONFIG.CONTRACT_ADDRESS
                    );

                    console.log("connect start SmartContractObj", SmartContractObj);

                    // const ActiveProducerArray = await SmartContractObj.methods.getProducerInfoArray().call();
                    // const ActiveProviderArray = await SmartContractObj.methods.getProviderInfoArray().call();
                    const ActiveAssetsArray = await SmartContractObj.methods.getAssetsArray().call();
                    const ActiveEscrowArray = await SmartContractObj.methods.getEscrowArray().call();
                    const contractOwnerAddress = await SmartContractObj.methods.owner().call();

                    var assetsTempArray = [];
                    for (var _i = 0; _i < ActiveAssetsArray.length; _i++) {
                        assetsTempArray.push(ActiveAssetsArray[_i]);
                    }
                    var escrowTempArray = [];
                    for (var _i = 0; _i < ActiveEscrowArray.length; _i++) {
                        escrowTempArray.push(ActiveEscrowArray[_i]);
                    }

                    console.log("connect start SmartContractObj : contractOwnerAddress", contractOwnerAddress);
                    console.log("connect start SmartContractObj : ActiveAssetsArray", ActiveAssetsArray);
                    console.log("connect start SmartContractObj : ActiveEscrowArray", ActiveEscrowArray);

                    // // var producersTempArray = [];
                    // // for (var _i = 0; _i < ActiveProducerArray.length; _i++) {
                    // //     producersTempArray.push(ActiveProducerArray[_i]);
                    // // }
                    // // var providersTempArray = [];
                    // // for (var _i = 0; _i < ActiveProviderArray.length; _i++) {
                    // //     providersTempArray.push(ActiveProviderArray[_i]);
                    // // }

                    

                    // console.log("active asset types : ", ActiveAssetTypesArray);

                    dispatch(
                        connectSuccess({
                            account: accounts[0],
                            smartContract: SmartContractObj,
                            assetsArray: assetsTempArray,
                            escrowArray: escrowTempArray,
                            contractOwnerAddress: contractOwnerAddress,
                            web3,
                        })
                    );

                    console.log("connect start account, ", accounts[0]);


                    // Add listeners start
                    ethereum.on("accountsChanged", (accountsChanged: any) => {
                        console.log("connect start updatedaccounts, ", accountsChanged);
                        console.log("connect start updatedaccounts, ", accountsChanged[0]);

                        dispatch(updateAccount(accountsChanged[0]));
                    });
                    ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                    // Add listeners end
                } else {
                    dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
                }
            } catch (err) {
                dispatch(connectFailed("Something went wrong."));
            }
        } else {
            dispatch(connectFailed("Install Metamask."));
        }
    };
};

export const updateAccount = (account: any) => {
    return async (dispatch: any) => {
        console.log("Update account");
        dispatch(updateAccountRequest({ account }));
        dispatch(fetchData());
    };
};
