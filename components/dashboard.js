import mediatorService from '../services/mediatorService.js';
import baseObj from './baseObj.js';

class dashBoard extends baseObj {
    constructor() {
        super({ templateUrl: '../components/dashboard.html', classNames: [] });
    }

    connectedCallback() {
        // mediatorService.subscribe
    }

    disconnectedCallback() {
        // console.log('disconnectedCallback');
    }

    adoptedCallback() {
        // console.log('adoptedCallback');
    }

    attributeChangedCallback() {
        // console.log('attributeChangedCallback');
    }
}

customElements.define('dash-board', dashBoard);

export default dashBoard;
