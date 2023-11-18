import uuidService from './uuidService.js';

export const msgTypes = {
    menuMsg: {
        test: uuidService.uuid
    }
}

const mediatorService = (() => {
    const subscribers = [];

    const subscribe = (callBackFunc = () => { }) => {
        subscribers.push(callBackFunc);

        return () => {
            const idx = subscribers.findIndex(f => f == callBackFunc);
            idx >= 0 ? subscribers.splice(idx, 1) : undefined;
        }
    }

    const msgAll = (msg = { msgType: '', msgData: undefined }) => {
        const sendMsg = (msg = { msgType: '', msgData: undefined }) => {
            subscribers.forEach(f => f(msg));
        }

        switch (msg.msgType) {
            case msgTypes.menuMsg.test:
                console.log('Test message sent', msg.msgData);
                break;
            default:
                sendMsg(msg);
                break;
        }
    }

    return {
        subscribe,
        msgAll

    }
})();

export default mediatorService;
