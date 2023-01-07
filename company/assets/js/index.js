addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.querySelectorAll('.year')[0].innerHTML = year;

  const body = document.getElementsByTagName('body')[0];
  body.classList.add('overflow-hidden');

  gsap.to(
    '#progress',
    {
      duration: 0.5,
      width: '100%',
      ease: Power4.easeIn,
      onComplete() {
        document
          .getElementById('loader')
          .classList.add('animate__fadeOutUpBig');
        body.classList.remove('overflow-hidden');
      },
    },
    0.2
  );
});
