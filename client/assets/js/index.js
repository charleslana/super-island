// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', () => {
  changeYear();
});

function changeYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year')[0].innerHTML = year;
}
