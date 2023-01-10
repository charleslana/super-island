// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', () => {
  load();
});

function load() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  const queue = new createjs.LoadQueue(true);
  queue.loadManifest([
    'assets/images/icons/preloader_v2.webp',
    'assets/images/icons/premium.png',
    'assets/images/icons/stamina_2.png',
    'assets/images/icons/money_2.png',
    'assets/images/icons/diamond.png',
    'assets/images/icons/add_cash.png',
    'assets/images/icons/news_feed_raid.png',
    'assets/images/avatars/hero_order.png',
  ]);
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').style.display = 'none';
  body.classList.remove('overflow-hidden');
}
