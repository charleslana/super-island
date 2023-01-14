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

function toast(message, isError = false) {
  const toastEl = document.getElementById('toast');
  if (isError) {
    toastEl.classList.add('toast-error');
  } else {
    toastEl.classList.remove('toast-error');
  }
  document.getElementById('toast-text').textContent = message;
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastEl);
  toastBootstrap.show();
}

function hideToast() {
  const myToastEl = document.getElementById('toast');
  const myToast = bootstrap.Toast.getOrCreateInstance(myToastEl);
  myToast.hide();
}
