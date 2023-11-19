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
                    stackSubgroups: false,
                    height: '100%',
                    moveable: true,
                    cluster: false,
                    verticalScroll: true,
                },
            });

            const groups = [
                { id: '1', content: 'Group 1' },
                { id: '2', content: 'Group 2' },
                { id: '3', content: 'Group 3' }
            ];

            const items = Array.from(Array(Math.ceil(Math.random()) * 100).keys())
            .map(m => this.buildRange(m, groups))
            .sort((a,b) => a.dateStart.getTime() > new Date(b.dateStart).getTime() ? 1 : (new Date(a.dateStart).getTime() < new Date(b.dateStart).getTime() ? -1 : 0))
            // .reduce((t, n) => {
            //     // Add some random points as needed
            //     if (Math.floor(Math.random() * 4) == 0) {
            //         const x = this.buildPoint(n);
            //         return [].concat.apply(t, [n, x]);
            //     }
            //     else {
            //         return [].concat.apply(t, [n]);
            //     }
            // }, []);
console.log(items);
            this.ref.addGroups(groups);
            this.ref.addItems(items);
        };
    }

    buildPoint(n) {
        const pointTime = new dateObj((n.dateEnd.getTime() + n.dateStart.getTime()) / 2);
        return {
            id: `${n.id}-Point`,
            groupId: n.groupId,
            content: `item ${n.content} Point`,
            dateStart: pointTime,
            appType: 'decision',
            appId: uuidService.uuid,
            linkedEventId: n.appId
        }
    }

    buildBar(m, groups) {
        const startDay = Math.floor(Math.random() * 25) + 1;
        const endDay = startDay + 1 + Math.floor(Math.random() * 5);

        return {
            id: `${m}`,
            groupId: groups[Math.floor(Math.random() * (groups.length - 1))]?.id,
            content: `item ${m}`,
            dateStart: new dateObj(`2023-11-${ `${startDay}`.padStart(2, '0') }`),
            dateEnd: new dateObj(`2023-11-${ `${endDay}`.padStart(2, '0') }`),
            appType: 'range',
            appId: uuidService.uuid
        }
    }

    buildRange(m, groups) {
        const startDay = Math.floor(Math.random() * 25) + 1;
        const endDay = startDay + 1 + Math.floor(Math.random() * 5);

        return {
            id: `${m}`,
            groupId: groups[Math.floor(Math.random() * (groups.length))]?.id,
            content: `item ${m}`,
            dateStart: new dateObj(`2023-11-${ `${startDay}`.padStart(2, '0') }`),
            dateEnd: new dateObj(`2023-11-${ `${endDay}`.padStart(2, '0') }`),
            appType: 'range',
            appId: uuidService.uuid
        }
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
