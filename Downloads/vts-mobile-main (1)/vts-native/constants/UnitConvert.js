import moment from 'moment';

export const MeterToKm = (meter) => {
  let kilometer;
  kilometer = 0
  var km = meter / 1000;
  if (km < 0) {
    kilometer = 0
  } else {
    kilometer = km.toFixed(2)
  }
  return kilometer
}

export const msToTime = (duration) => {
  var seconds = Math.floor((duration / 1000) % 60)
  var minutes = Math.floor((duration / (1000 * 60)) % 60)
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

export const addLeadingZeros = (num) => {
  return String(num?.toFixed(0)).padStart(3, '0');
}

export const setOdometer = (num) => {
  let odometernumber;
  odometernumber = 0;
  if (num === 0) {
    odometernumber = 0;
  } else {
    var numberFix = num?.toFixed(0);
    var numberSlice = numberFix?.slice(0, 6);
    odometernumber = numberSlice;
  }
  return odometernumber;
}
export const setDateFunction = (value) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let DateFormate;
  let TimeFormate;
  DateFormate = '-';
  TimeFormate = '-';
  const date = `${new Date(value).getDate()} ${months[new Date(value).getMonth()]} ${new Date(value).getFullYear()}`
  DateFormate = date;
  const time = moment(value)?.format(' hh:mm A')
  TimeFormate = time;

  return { DateFormate: DateFormate, TimeFormate: TimeFormate };
}