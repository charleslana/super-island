// window.addEventListener('beforeunload', e => {
//   e.preventDefault();
//   e.returnValue = '';
// });

addEventListener('DOMContentLoaded', async () => {
  load();
  checkLogged();
  draggable();
  tooltip();
  feedNewsBox();
  chestAFK();
  checkInternet();
  logout();
  floatMenu();
  await getHome();
  footerMenu();
  questToggle();
  menuLeftToggle();
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
    'assets/images/icons/item.png',
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
    'assets/images/left-menu/achievements_default.png',
    'assets/images/left-menu/friends_default.png',
    'assets/images/left-menu/guilds_default.png',
    'assets/images/left-menu/index_default.png',
    'assets/images/left-menu/mail_default.png',
    'assets/images/left-menu/trade_default.png',
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

function hideTooltip() {
  const tooltips = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltips.forEach(tooltip => {
    const instance = bootstrap.Tooltip.getInstance(tooltip);
    instance.hide();
  });
}

function updateTooltip(id, title) {
  const element = document.getElementById(id);
  element.title = title;
  tooltip();
}

function numberFormatter(number) {
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
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

function abbreviateNumber(number) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
}

function feedNewsBox() {
  const box = document.getElementById('newsFeedBox');
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

function floatMenu() {
  const menuShow = document.getElementById('floatMenuShow');
  const menuHide = document.getElementById('floatMenuHide');
  const menuLeftList = document.querySelectorAll('.float-menu-left');
  const menuRightList = document.querySelectorAll('.float-menu-right');
  const menuStorage = localStorage.getItem('menuToggle');
  menuHide.addEventListener('click', () => {
    menuLeftList.forEach(m => {
      m.classList.remove('animate__slideInDown');
      m.classList.add('animate__slideOutUp');
    });
    menuRightList.forEach(m => {
      m.classList.remove('animate__slideInDown');
      m.classList.add('animate__slideOutUp');
    });
    menuHide.style.setProperty('display', 'none', 'important');
    menuShow.classList.remove('animate__fadeOut');
    menuShow.style.removeProperty('display');
    localStorage.setItem('menuToggle', 'hide');
  });
  menuShow.addEventListener('click', () => {
    menuLeftList.forEach(m => {
      m.classList.remove('animate__slideOutUp');
      m.classList.add('animate__slideInDown');
    });
    menuRightList.forEach(m => {
      m.classList.remove('animate__slideOutUp');
      m.classList.add('animate__slideInDown');
    });
    menuShow.style.setProperty('display', 'none', 'important');
    menuHide.classList.remove('animate__fadeOut');
    menuHide.style.removeProperty('display');
    localStorage.setItem('menuToggle', 'show');
  });
  if (menuStorage === 'hide') {
    menuHide.click();
  }
}

async function loaderHTML(page) {
  loading();
  await axios
    .get(`pages/${page}.html`, { responseType: 'text' })
    .then(function (response) {
      const root = document.getElementById('root');
      root.innerHTML = response.data;
      root.dataset.page = page;
    })
    .catch(function (error) {
      toast(error.message);
    })
    .finally(() => {
      hideLoading();
    });
}

async function getHome() {
  await loaderHTML('home').then(() => {
    draggable();
    tooltip();
    document.getElementById('minStamina').textContent = abbreviateNumber(4900);
    document.getElementById('maxStamina').textContent = abbreviateNumber(100);
    updateTooltip('staminaTooltip', `Carne<br>${numberFormatter(4900)}/100`);
  });
}

function footerMenu() {
  const page = document.getElementById('root').getAttribute('data-page');
  document.getElementById('homeMap').addEventListener('click', () => {
    if (page !== 'home') {
      getHome();
    }
  });
  document.getElementById('townMap').addEventListener('click', () => {
    getTown();
  });
}

async function getTown() {
  await loaderHTML('town');
}

function questToggle() {
  document.getElementById('questToggle').addEventListener('click', () => {
    const questBox = document.getElementById('questBox');
    const questToggleIcon = document.getElementById('questToggleIcon');
    if (questToggleIcon.getAttribute('quest-toggle-icon') === 'hide') {
      questToggleIcon.classList.remove('fa-angle-right');
      questToggleIcon.classList.add('fa-angle-left');
      questToggleIcon.removeAttribute('quest-toggle-icon');
      questBox.classList.remove('animate__slideOutLeft');
      questBox.classList.add('animate__slideInLeft');
      return;
    }
    questToggleIcon.classList.remove('fa-angle-left');
    questToggleIcon.classList.add('fa-angle-right');
    questToggleIcon.setAttribute('quest-toggle-icon', 'hide');
    questBox.classList.remove('animate__slideInLeft');
    questBox.classList.add('animate__slideOutLeft');
  });
}

function menuLeftToggle() {
  const show = document.getElementById('leftMenuBarShow');
  const hide = document.getElementById('leftMenuBarHide');
  const menu = document.getElementById('menuLeftExpandedBar');
  show.addEventListener('click', () => {
    menu.classList.remove('animate__slideOutLeft');
    menu.classList.add('animate__slideInLeft');
  });
  hide.addEventListener('click', () => {
    menu.classList.remove('animate__slideInLeft');
    menu.classList.add('animate__slideOutLeft');
  });
}
