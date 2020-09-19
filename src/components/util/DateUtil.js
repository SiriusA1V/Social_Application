/**
 * 表示用に日付を加工するUtil
 */
const WEEK = ['日', '月', '火', '水', '木', '金', '土'];
const DateUtil = {
    /**
     * 日付情報を、年、月、日、曜日に分解して返す
     * @param {string} date
     */
    splitDate(date) {
        if (!date) return null;
        let _date = new Date(date);
        let _d = _date.getDate();
        if (_d < 10) _d = '0' + _d;

        return {
            year: _date.getFullYear() + '',
            month: (_date.getMonth() + 1) + '',
            day: _d,
            week: WEEK[_date.getDay()]
        };
    }
}

export default DateUtil;