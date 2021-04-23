const ul = document.querySelector('.menu');
const li = document.querySelectorAll('.menu__item');
const p = document.querySelector('.switch__sliding__text');
const input = document.querySelector('.swith__input');
const containerItem = document.querySelectorAll('.container__item');
const toogler = document.querySelector('.toggler');

toogler.addEventListener('click', () => {
  if (ul.style.transform == 'translateX(-100%)' || ul.style.transform == '') {
    ul.style.transform = 'translateX(0)';
  } else {
    ul.style.transform = 'translateX(-100%)';
  }
});

input.addEventListener('click', change);
function change() {
  if (input.checked === true) {
    p.innerHTML = 'PLAY';
    containerItem.forEach((a) => a.style.background = 'linear-gradient(180deg,#ffd86f,#fc6262 40%,#fff 0,#fff)');
    ul.style.background = 'linear-gradient(#ffd86f,#fc6262 100%,#fff 0,#fff';
  } else {
    p.innerHTML = 'TRAIN';
    containerItem.forEach((a) => a.style.background = 'linear-gradient(180deg,#0099ae,#00bf82 40%,#fff 0,#fff)');
    ul.style.background = 'linear-gradient(#0099ae,#00bf82 100%,#fff 0,#fff)';
  }
}

li.forEach((el) => {
  el.addEventListener('click', () => {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  });
});
