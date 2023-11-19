import uuidService from '../services/uuidService.js';
import dateObj, { oneDay } from '../classes/dateObj.js';

const group = (data) => {

    return {
        id: data.id,
        content: data.content,
        className: ''
    }
}

const item = (data) => {
    const dateStart = new dateObj(data.dateStart).startOfDay;
    const dateEnd = data.dateEnd ? new dateObj(data.dateEnd).endOfDay : undefined;
    const type = (() => {
        switch (data.appType) {
            case 'decision':
            case 'milestone':
            case 'event':
                return 'point';
            case 'bar':
                return 'range';
            case 'range':
                return 'range'
        }
    })();

    return {
        id: data.id,
        content: data.content,
        start: dateStart,
        end: dateEnd,
        group: data.groupId,
        subgroup: undefined,
        type: type,
        // className: '',
        // style: '',

        appId: data.appId,
        appType: data.appType,
    }
}

const timeLine = (props) => {
    const _items = new window['vis'].DataSet([]);
    const _groups = new window['vis'].DataSet([]);

    const timelineRef = new window['vis'].Timeline(props.container, _items, _groups, props.options);

    const refreshTimeLine = () => {
        declutter().then(() => timelineRef.redraw());
    }

    const declutter = () => {
        return new Promise(resolve => {
            const grpItems = (grp) => _items.get().filter(f => f.group == grp.id);

            const groupInfoFunc = (grp, events) => {
                const grpStart = Math.min(...grpItems(grp).filter(f => f.start).map(m => m.start.getTime()));
                const grpEnd = Math.max(...grpItems(grp).filter(f => f.end).map(m => m.end.getTime()));
                const subGrpTemplate = () => Array.from(Array(Math.round((grpEnd - grpStart) / oneDay)));
                const buildNewSubGrp = () => {
                    const o = subGrpTemplate();
                    subGroups.push(o);
                    return o;
                }

                const subGroups = [subGrpTemplate()];
                events.forEach(event => {
                    const eventOffset = ((event.start.getTime() - grpStart) / oneDay);
                    const eventLength = Math.ceil((event.end.getTime() - event.start.getTime()) / oneDay);

                    const found = subGroups.find(f => {
                        return f.slice(eventOffset, eventOffset + eventLength).reduce((t, n) => t && n == undefined, true)
                    }) ?? buildNewSubGrp();

                    found.splice(eventOffset, eventLength, ...Array.from(Array(eventLength)).map(m => event.id));
                    event.subgroup = subGroups.findIndex(f => f == found);
                });

                return events;
            }

            const ret = _groups.get()
            .filter(f => grpItems(f).length > 0)
            .reduce((t,n) => [].concat.apply(t, groupInfoFunc(n, grpItems(n))), [])

            if (ret.length > 0) {
                _items.update(ret);
            }

            resolve(ret);
        })
    }

    const that = {
        timelineRef,
        addItems: (items) => {
            _items.add(items.map(m => item(m)));
            refreshTimeLine();
        },
        addGroups: (groups) => {
            _groups.add(groups.map(m => group(m)));
            refreshTimeLine();
        },
        get items() { return _items },
        set items(vals) {
            // _items.splice(0, _items.length, ...vals.map(m => item(m)));
            // refreshTimeLine();
        },
        get groups() { return _groups },
        set groups(vals) {
            // _groups.splice(0, _groups.length, ...vals.map(m => group(m)));
            // refreshTimeLine();
        },
    }

    return that;
}

const timelineFactory = {
    build: (props) => timeLine(props)
}

export default timelineFactory;
