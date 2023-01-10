function loading() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.remove('overflow-hidden');
  document.getElementById('loading').style.display = 'none';
}

function toast(message) {
  document.getElementById('toast-text').textContent = message;
  const toastEl = document.getElementById('toast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
  toastBootstrap.show();
}

function hideToast() {
  const myToastEl = document.getElementById('toast');
  const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
  myToast.hide();
}

function numberFormatter(number) {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
}
