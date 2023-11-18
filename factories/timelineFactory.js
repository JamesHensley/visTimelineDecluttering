const timeLine = (props) => {
    // const _items = new DataSet();
    // const _groups = new DataSet();
    const _items = [];
    const _groups = [];

    var testItems = new window['vis'].DataSet([
        {id: 1, content: 'item 1', start: '2014-04-20'},
        {id: 2, content: 'item 2', start: '2014-04-14'},
        {id: 3, content: 'item 3', start: '2014-04-18'},
        {id: 4, content: 'item 4', start: '2014-04-16', end: '2014-04-19'},
        {id: 5, content: 'item 5', start: '2014-04-25'},
        {id: 6, content: 'item 6', start: '2014-04-27', type: 'point'}
    ]);

    // const timeline = new window['vis'].Timeline(props.container, props.items, _groups, props.options);
    const timeline = new window['vis'].Timeline(props.container, testItems, props.options);

    const refreshTimeLine = () => {

    }

    const declutter = () => {

    }

    return {
        timeline,
        addItems: (items) => {
            _items.push(...items);
            refreshTimeLine();
        },
        addGroups: (items) => {
            _groups.push(...items);
            refreshTimeLine();
        },
        get items() { return _items },
        set items(vals) {
            _items.splice(0, _items.length, ...vals);
            refreshTimeLine();
        },
        get groups() { return _groups },
        set groups(vals) {
            _groups.splice(0, _groups.length, ...vals);
            refreshTimeLine();
        },
    }
}

const timelineFactory = {
    build: (props) => timeLine(props)
}

export default timelineFactory;
