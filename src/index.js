const checkbox = document.querySelector('#remember'),
      hint = document.querySelector('#pass-hint'),
      pass = document.querySelector('#pass'),
      passToggler = document.querySelector('#pass-show'),
      username = document.querySelector('#username');
let passIsShown = false,
    hintIsShown = false;

window.addEventListener('DOMContentLoaded', () => {   
  'use strict';
  // Locally store/retrieve user details locally
  saveUsername();
  // Watch for showing password toggler
  togglePasswordShow();
  // Watch for password requirements toggler
  togglePasswordHint();
});

// Check and retrieve/save/delete data

function saveUsername() {
  let checkNext = !(localStorage.getItem('remember'));

  if (localStorage.getItem('remember') === 'true') {
    checkbox.checked = true;
    username.value = localStorage.getItem('username');
  }
      
  checkbox.addEventListener('click', () => {
    localStorage.setItem('remember', checkNext);
    checkNext = !checkNext;

    if (checkNext === false) {
      localStorage.setItem('username', username.value);
      localStorage.setItem('remember', true);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('remember');
    }
  });
}

// Watch for showing password toggler

function togglePasswordShow() {
  passToggler.addEventListener('click', () => {
    if (passIsShown) {
      passHide();
    } else {
      passShow();
    }
    passIsShown = !passIsShown;
  }, false);
}

function passShow() {
  pass.setAttribute('type', 'text');
  passToggler.classList.remove('fa-eye'); // opened eye icon
  passToggler.classList.add('fa-eye-slash'); // crossed eye icon
  hint.classList.remove('hidden'); // show the password hint
}

function passHide() {
  pass.setAttribute('type', 'password');
  passToggler.classList.remove('fa-eye-slash');
  passToggler.classList.add('fa-eye');
  hint.classList.add('hidden'); // hide the password hint
}

// Watch for password requirements hint toggler

function togglePasswordHint() {
  pass.addEventListener('focusin', () => {
    hint.classList.remove('hidden');
  }, false);
  pass.addEventListener('blur', () => {
    hint.classList.add('hidden');
  }, false);
}