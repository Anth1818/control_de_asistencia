const date = new Date().toLocaleDateString('es-VE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const hour = new Date().getHours() + ':' + new Date().getMinutes();
export {date, hour};