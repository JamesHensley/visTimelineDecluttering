const oneSecond = 1000;
export const oneMinute = 60 * oneSecond;
export const oneHour = 60 * oneMinute;
export const oneDay = 24 * oneHour;

class dateObj extends Date {
    constructor(props) {
        super(props);
    }

    get startOfDay() {
        const o = new dateObj(new Date(this).setHours(0, 0, 0, 0));
        return o;
    }

    get endOfDay() {
        const o = new dateObj(new Date(this).setHours(23, 59, 59, 999));
        return o;
    }

    addMinutes(mins = 0) {
        const o = new dateObj(new Date(this).getTime() + (mins * oneMinute));
        return o;
    }

    addHours(hours = 0) {
        const o = new dateObj(new Date(this).getTime() + (hours * oneHour));
        return o;
    }
}

export default dateObj;
