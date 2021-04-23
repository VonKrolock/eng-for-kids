const ul = document.querySelector('.menu');
const li = document.querySelectorAll('.menu__item');
const swit = document.querySelector('.switch');
const p = document.querySelector('.switch__sliding__text');
const input = document.querySelector('.swith__input');
const toogler = document.querySelector('.toggler');
const containerItem = document.querySelectorAll('.container__item');
const containerItemBack = document.querySelectorAll('.container__item__back');
const containerItemFront = document.querySelectorAll('.container__item__front__image');
const imgText = document.querySelectorAll('.imgText');
const rotate = document.querySelectorAll('.rotate');
const audios = document.querySelectorAll('.audio');
const audioFail = document.querySelector('.fail__sound');
const gameContainer = document.querySelector('.game__container');
const btn = document.querySelector('.btn');
const btnGameOver = document.querySelector('.game__over');
const starContainer = document.querySelector('.star__container');
const starContainerTwo = document.querySelector('.star__container__two');
const demo = document.querySelector('.demo');

function init() {
  location.reload();
}
function createElement() {
  const starWin = document.createElement('div');
  starWin.classList.add('star__win');
  return starWin;
}

function createFailElement() {
  const starLoose = document.createElement('div');
  starLoose.classList.add('star__loose');
  return starLoose;
}

// Game
function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

gameContainer.addEventListener('click', playGame);
const arr = Array.from(audios);
function playGame() {
  let index = randomInteger(0, arr.length - 1);
  arr[index].play();
  btn.style.display = 'none';

  containerItem.forEach((a) => a.addEventListener('click', guessCard));

  function guessCard() {
    if (arr[index] == this.querySelector('.audio')) {
      this.style.opacity = '0.3';
      starContainer.appendChild(createElement());
      arr.splice(index, 1);
      if (arr.length === 0) {
        btn.style.opacity = '0';
        swit.style.opacity = '0';
        starContainerTwo.innerHTML = '';
        btnGameOver.style.display = 'block';
        demo.innerText = `Your score is ${starContainer.children.length} out of 8`;
        return null;
      }
      index = randomInteger(0, arr.length - 1);
      arr[index].play();
    } else {
      audioFail.play();
      arr.splice(index, 1);
      index = randomInteger(0, arr.length - 1);
      setTimeout(() => arr[index].play(), 1500);
      if (arr.length === 0) {
        btn.style.opacity = '0';
        swit.style.opacity = '0';
        demo.innerText = `Your score is ${starContainer.children.length} out of 8`;
        starContainerTwo.innerHTML = '';
        btnGameOver.style.display = 'block';
        return null;
      }
      starContainerTwo.appendChild(createFailElement());
    }
  }
}

// Buttom resize event
btn.addEventListener('click', btnChange);
function btnChange() {


}

// Hamburger transform
toogler.addEventListener('click', () => {
  if (ul.style.transform == 'translateX(-100%)' || ul.style.transform == '') {
    ul.style.transform = 'translateX(0)';
  } else {
    ul.style.transform = 'translateX(-100%)';
  }
});

// Menu active change state
li.forEach((el) => {
  el.addEventListener('click', () => {
    ul.querySelector('.active').classList.remove('active');
    el.classList.add('active');
  });
});

// Input event listener
input.addEventListener('click', change);
function change() {
  if (input.checked === true) {
    p.innerHTML = 'PLAY';
    containerItem.forEach((a) => { a.style.height = '190px'; });
    imgText.forEach((a) => a.style.display = 'none');
    rotate.forEach((a) => a.style.display = 'none');
    starContainer.style.opacity = '1';
    starContainerTwo.style.opacity = '1';
    demo.style.opacity = '1';
    ul.style.background = 'linear-gradient(#ffd86f,#fc6262 100%,#fff 0,#fff)';
    containerItemFront.forEach((a) => a.addEventListener('click', pauseAudio));
    btn.style.display = 'block';
    function pauseAudio() {
      this.querySelector('.audio').pause();
    }
  } else {
    p.innerHTML = 'TRAIN';
    containerItem.forEach((a) => { a.style.height = '240px'; a.style.opacity = '1'; });
    ul.style.background = 'linear-gradient(#0099ae,#00bf82 100%,#fff 0,#fff)';
    btn.style.display = 'none';
    demo.style.opacity = '0';
    starContainer.style.opacity = '0';
    starContainerTwo.style.opacity = '0';
    audioFail.pause();
    location.reload();
    containerItemFront.forEach((a) => a.addEventListener('click', playAudio));
    function playAudio() {
      this.querySelector('.audio').play();
    }
    setTimeout(() => {
      imgText.forEach((a) => a.style.display = 'block');
      rotate.forEach((a) => a.style.display = 'block');
    }, 900);
  }
}

// Click Rotate event listener
rotate.forEach((a) => a.addEventListener('click', flipCard));
function flipCard(a) {
  containerItem[+a.target.getAttribute('data-target')].style.transform = 'rotateY(180deg)';
}

// Leave rotate event listener
containerItemBack.forEach((a) => a.addEventListener('mouseleave', leaveCard));
function leaveCard(a) {
  containerItem[+a.target.getAttribute('data-target')].style.transform = 'rotateY(360deg)';
}

// Audio event listener

containerItemFront.forEach((a) => a.addEventListener('click', playAudio));
function playAudio() {
  this.querySelector('.audio').play();
}
