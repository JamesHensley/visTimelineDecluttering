import mediatorService from '../services/mediatorService.js';
import baseObj from './baseObj.js';

class eventsArea extends baseObj {
    constructor() {
        super({ templateUrl: '../components/eventsArea.html', classNames: ['eventsArea', 'bordered'] });
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

customElements.define('events-area', eventsArea);

export default eventsArea;
