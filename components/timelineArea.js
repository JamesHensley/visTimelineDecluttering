import dateObj from '../classes/dateObj.js';
import timelineFactory from '../factories/timelineFactory.js';
import mediatorService from '../services/mediatorService.js';
import uuidService from '../services/uuidService.js';
import baseObj from './baseObj.js';

class timelineArea extends baseObj {
    constructor() {
        super({ templateUrl: '../components/timelineArea.html', classNames: ['timelineArea', 'bordered'] });

        this.contentReady = () => {
            this.ref = timelineFactory.build({
                container: this.wrapper.querySelector('.componentContent'),
                options: {
                    stack: false,
                    stackSubgroups: false
                },
                // readyCallBack: readyCallBack
            });

            this.ref.addGroups([ { id: '1', content: 'Group 1' } ])
            this.ref.addItems([
                { id: 1, groupId: '1', content: 'item 1', dateStart: '2023-11-20', appType: 'event', appId: uuidService.uuid },
                { id: 2, groupId: '1', content: 'item 2', dateStart: '2023-11-19', dateEnd: '2023-11-24', appType: 'range', appId: uuidService.uuid },
                { id: 3, groupId: '1', content: 'item 3', dateStart: '2023-11-21', dateEnd: '2023-11-26', appType: 'range', appId: uuidService.uuid },
            ]);
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
