// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', () => {
  changeYear();
  load();
});

function changeYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year')[0].innerHTML = year;
}

function load() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  const queue = new createjs.LoadQueue(true);
  queue.loadManifest([
    'assets/images/background/background_v3.png',
    'assets/images/icons/preloader_v2.webp',
    'assets/images/landing/160x80_grey.png',
    'assets/images/landing/background_about.jpg',
    'assets/images/landing/background_desktop.png',
    'assets/images/landing/carousel_1.png',
    'assets/images/landing/carousel_2.png',
    'assets/images/landing/carousel_3.png',
    'assets/images/landing/chest.png',
    'assets/images/landing/discord.png',
    'assets/images/landing/download_android_en.png',
    'assets/images/landing/download_android_pt.png',
    'assets/images/landing/facebook.png',
    'assets/images/landing/ribbon.png',
    'assets/images/logo/logo_mobile.png',
    'assets/images/app_logo.png',
    'assets/images/favicon82x83.png',
    'assets/images/logo_mobile_noborder.png',
  ]);
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').style.display = 'none';
  body.classList.remove('overflow-hidden');
}
