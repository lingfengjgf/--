function getWeek(dateTime) {
  let temptTime = dateTime
  //周几
  let weekday = temptTime.getDay() || 7
  //周1+5天=周六
  temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
  let firstDay = new Date(temptTime.getFullYear(), 0, 1)
  let dayOfWeek = firstDay.getDay()
  let spendDay = 1
  if (dayOfWeek != 0) {
    spendDay = 7 - dayOfWeek + 1
  }
  firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
  let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
  let result = Math.ceil(d / 7)
  return result + 1
}
const getTimeArray = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day, hour, minute, second];
}
const addZero = (num) => {
  if (num / 1 == 0) {
    return "00";
  }
  num = "" + num;
  return num < 10 ? (num.substr(0, 1) == 0 ? num : ('0' + num)) : num;
}
function getWeeksArray(year, en) {
  //获取当前周的第一天
  let curMon = getFirWeekDay(new Date(year + '/12/31'), en);
  //获取当年第一周的第一天
  let firMon = getFirWeekDay(new Date(year + '/01/01'), en);
  let d = Math.ceil((curMon.valueOf() - firMon.valueOf()) / 8.64e7);
  return Math.ceil(d / 7) + 1;
}
function getFirWeekDay(date, en = false) {

  let temptTime = new Date(date);
  let weekday = temptTime.getDay() || (en ? 0 : 7);
  return temptTime.setDate(temptTime.getDate() - weekday + (en ? 0 : 1));
}
const getFirstAndLastDate = (year, week, en, weekType) => {
  let firstDate = new Date(getWeekFirstDate(new Date(year + '/01/01'), en));
  if (weekType === 'fullWeek') {
    if (firstDate.getFullYear() != year) {
      firstDate.setDate(firstDate.getDate() + 7);
    }
  }
  firstDate = new Date(firstDate.setDate(firstDate.getDate() + (week - 1) * 7));
  let lastDate = new Date(firstDate);
  lastDate = new Date(lastDate.setDate(lastDate.getDate() + 6));
  const [fy, fm, fd] = getTimeArray(firstDate);
  const [ly, lm, ld] = getTimeArray(lastDate);
  const start = `${fy}-${addZero(fm)}-${addZero(fd)}`;
  const end = `${ly}-${addZero(lm)}-${addZero(ld)}`;
  return { start, end };
}
function getWeekFirstDate(date, en = false) {
  let temptTime = new Date(date);
  let weekday = temptTime.getDay() || (en ? 0 : 7);
  return temptTime.setDate(temptTime.getDate() - weekday + (en ? 0 : 1));
}
const getTotalWeeks = (start, end, en, weekType) => {
  if (weekType === 'firstDay') {
    return getFirstDayTotalWeeks(start, end, weekType)
  }
  //获取end当前周的第一天
  let endMon = getWeekFirstDate(new Date(end), en);
  //获取start当前周的第一天
  let startMon = getWeekFirstDate(new Date(start), en);
  let year = new Date(start).getFullYear();
  let firMon = getWeekFirstDate(new Date(year + '/01/01'), en);
  if (weekType === 'fullWeek') {
    if (new Date(startMon).getFullYear() != year) {
      let curTime = new Date(startMon);
      startMon = curTime.setDate(curTime.getDate() + 7);
    }
    if (new Date(firMon).getFullYear() != year) {
      let curTime = new Date(firMon);
      firMon = curTime.setDate(curTime.getDate() + 7);
    }
  }
  return getStartAndEndWeek(firMon, startMon, endMon, weekType);
}
function getFirstDayTotalWeeks(start, end, weekType) {
  let year = new Date(start).getFullYear();
  let startTime = new Date(start).getTime();
  let endTime = new Date(end).getTime();
  let firstTime = new Date(year + '/01/01').getTime();
  return getStartAndEndWeek(firstTime, startTime, endTime, weekType)

}
function getStartAndEndWeek(first, start, end, weekType) {
  let d = Math.ceil((end.valueOf() - first.valueOf()) / 8.64e7);
  console.log(d);
  let extra = weekType === 'firstDay' ? 0 : 1
  let endWeek = Math.ceil(d / 7) + extra;
  let startWeek = 1;
  if (start !== first) {
    let d = Math.ceil((start.valueOf() - first.valueOf()) / 8.64e7);
    startWeek = Math.ceil(d / 7) + extra;
  }
  return [startWeek, endWeek];
}
// console.log(getWeeksArray(2023, true));
// console.log(new Date(getFirWeekDay('2023/01/01')).toLocaleDateString());
// getFirstAndLastDate(2023, 2)
console.log(getTotalWeeks('2023/01/01', '2023/01/05', false, 'fullWeek'));
// console.log(getFirstAndLastDate(2023, 53, true, 'fullWeek'));