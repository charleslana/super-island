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

function hideTooltip() {
  const tooltips = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltips.forEach(tooltip => {
    const instance = bootstrap.Tooltip.getInstance(tooltip);
    instance.hide();
  });
}

function checkInternet() {
  const failed = document.getElementById('failedInternet');
  const success = document.getElementById('successInternet');
  const child = success.firstElementChild;
  window.addEventListener('offline', () => {
    failed.style.display = 'block';
    child.classList.add('animate__slideInDown');
    child.classList.remove('animate__fadeOut');
  });
  window.addEventListener('online', () => {
    failed.style.display = 'none';
    success.style.display = 'block';
    child.addEventListener('animationend', () => {
      child.classList.remove('animate__slideInDown');
      child.classList.add('animate__fadeOut');
      const interval = setInterval(() => {
        clearInterval(interval);
        success.style.display = 'none';
      }, 1000);
    });
  });
}
