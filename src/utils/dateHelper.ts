class DateHelper {
  static format(date: string, fmt: string) {
    const d = new Date(date);
    const o: { [key: string]: number } = {
      'M+': d.getMonth() + 1, // 月份
      'd+': d.getDate(), // 日
      'h+': d.getHours(), // 小时
      'm+': d.getMinutes(), // 分
      's+': d.getSeconds(), // 秒
      'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
      S: d.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${d.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          // @ts-ignore
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    }
    return fmt;
  }

  static getWeekDay(date: string) {
    const w = new Date(date).getDay();
    let weekDay = '';
    switch (w) {
      case 0:
        weekDay = '日';
        break;
      case 1:
        weekDay = '一';
        break;
      case 2:
        weekDay = '二';
        break;
      case 3:
        weekDay = '三';
        break;
      case 4:
        weekDay = '四';
        break;
      case 5:
        weekDay = '五';
        break;
      case 6:
        weekDay = '六';
        break;
    }
    return weekDay;
  }

  static parseTimeToDate(time: string) {
    const t = new Date(time);
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
  }
}

export default DateHelper;
