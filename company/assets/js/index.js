addEventListener('DOMContentLoaded', () => {
  changeYear();
  showProgress();
  load();
});

function changeYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year')[0].innerHTML = year;
}

function showProgress() {
  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');
  gsap.to(
    '#progress',
    {
      duration: 0.5,
      width: '100%',
      ease: Power4.easeIn,
      onComplete() {},
    },
    0.5
  );
}

function load() {
  const queue = new createjs.LoadQueue(true);
  queue.loadManifest([
    'assets/images/about.png',
    'assets/images/favicon64x64.png',
    'assets/images/featured_game.png',
    'assets/images/games.png',
    'assets/images/team_1.png',
    'assets/images/logo/160x80_white.png',
    'assets/images/logo/270x135_white.png',
  ]);
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  document.getElementById('progress').style.width = '100%';
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').classList.add('animate__fadeOutUpBig');
  body.classList.remove('overflow-hidden');
}
