export const oneDay = 24 * 60 * 60 * 1000;

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
}

export default dateObj;
