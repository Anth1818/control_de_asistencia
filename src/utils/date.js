const date = new Date().toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const hour = new Date().getHours() + ':' + new Date().getMinutes();

console.log(hour)
export {date, hour};