import dateObj from '../classes/dateObj.js';
import timelineFactory from '../factories/timelineFactory.js';
import mediatorService from '../services/mediatorService.js';
import baseObj from './baseObj.js';

class timelineArea extends baseObj {
    constructor() {
        super({ templateUrl: '../components/timelineArea.html', classNames: ['timelineArea', 'bordered'] });

        this.contentReady = () => {
            timelineFactory.build({
                container: this.wrapper.querySelector('.componentContent'),
                options: { }
            });
        };
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

customElements.define('timeline-area', timelineArea);

export default timelineArea;
