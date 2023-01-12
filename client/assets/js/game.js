// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', () => {
  load();
  checkLogged();
  draggable();
  tooltip();
  feedNewsBox();
  chestAFK();
  checkInternet();
  logout();
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
    'assets/images/icons/news_feed.png',
    'assets/images/icons/exp.png',
    'assets/images/icons/exp_vocation.png',
    'assets/images/icons/quest_progress.png',
    'assets/images/icons/quest.png',
    'assets/images/icons/attack.png',
    'assets/images/avatars/hero_order.png',
    'assets/images/background/home_order_v2.png',
    'assets/images/footer/bag_default.png',
    'assets/images/footer/character_default.png',
    'assets/images/footer/home_default.png',
    'assets/images/footer/town_default.png',
    'assets/images/footer/worldmap_default.png',
    'assets/images/map/mystery_chest_closed.gif',
    'assets/images/boats/01.gif',
    'assets/images/boats/02.gif',
    'assets/images/boats/03.gif',
    'assets/images/boats/04.gif',
    'assets/images/boats/05.gif',
    'assets/images/boats/06.gif',
    'assets/images/boats/07.gif',
    'assets/images/boats/08.gif',
    'assets/images/boats/09.gif',
    'assets/images/boats/10.gif',
    'assets/images/boats/11.gif',
    'assets/images/boats/12.gif',
    'assets/images/boats/13.gif',
    'assets/images/menu/reward_bg.png',
    'assets/images/menu/hunting_default.png',
    'assets/images/menu/tasks_default.png',
    'assets/images/menu/rewards_v2.png',
    'assets/images/menu/shop_default.png',
    'assets/images/menu/walkthrough_default_2.png',
    'assets/images/menu/help_default.png',
    'assets/images/menu/news_default.png',
    'assets/images/menu/events_default.png',
    'assets/images/menu/challenge_default.png',
    'assets/images/menu/rank_v2.png',
    'assets/images/menu/wheel_default.png',
    'assets/images/npc/01.gif',
    'assets/images/npc/02.gif',
    'assets/images/characters/01.gif',
  ]);
  queue.addEventListener('complete', handleComplete);
}

function handleComplete() {
  const body = document.getElementsByTagName('body')[0];
  document.getElementById('loader').style.display = 'none';
  body.classList.remove('overflow-hidden');
}

function draggable() {
  interact('.draggable').draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true,
      }),
    ],
    listeners: {
      move: dragMoveListener,
      end(event) {
        var textEl = event.target.querySelector('p');
        textEl &&
          (textEl.textContent =
            'moved a distance of ' +
            Math.sqrt(
              (Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2)) |
                0
            ).toFixed(2) +
            'px');
      },
    },
  });

  function dragMoveListener(event) {
    hideTooltip();
    var target = event.target;
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    if (window.innerWidth < 1312) {
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  }
  window.dragMoveListener = dragMoveListener;
}

function tooltip() {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(tooltipTriggerEl => {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      html: true,
      delay: { show: 250, hide: 100 },
    });
  });
}

function feedNewsBox() {
  const box = document.getElementById('newFeedBox');
  box.classList.remove('animate__fadeOut');
  box.classList.add('animate__fadeIn');
  const interval = setInterval(() => {
    box.classList.add('animate__fadeOut');
    box.addEventListener('animationend', () => {
      box.style.setProperty('display', 'none', 'important');
    });
    clearInterval(interval);
  }, 15000);
  box.addEventListener('click', () => {
    box.classList.add('animate__fadeOut');
    box.addEventListener('animationend', () => {
      box.style.setProperty('display', 'none', 'important');
    });
  });
}

function chestAFK() {
  const chest = document.getElementById('chestAFK');
  const spin = document.getElementById('chestAFKSpin');
  spin.addEventListener('click', () => {
    spin.classList.remove('spin');
    spin.classList.add('animate__fadeOut');
    chest.classList.add('animate__fadeOut');
    chest.classList.remove('animate__infinite');
    spin.style.pointerEvents = 'none';
  });
}

function checkBrowserTabs() {
  const tabCount = +localStorage.getItem('tabCount');
  window.addEventListener('storage', storageChanged, false);
  localStorage.setItem('tabCount', tabCount + 1);
  function storageChanged(event) {
    if (event.newValue <= tabCount) {
      window.location.href = 'about:blank';
      return;
    }
    localStorage.setItem('tabCount', tabCount + 1);
  }
}

function logout() {
  document.getElementById('userLogged').addEventListener('click', () => {
    removeSession();
  });
}

function checkLogged() {
  const logged = localStorage.getItem('logged');
  if (logged === null || logged === 'false') {
    removeSession();
    return;
  }
  checkBrowserTabs();
}

function removeSession() {
  localStorage.removeItem('tabCount');
  localStorage.removeItem('logged');
  window.location.href = 'index.html';
}
