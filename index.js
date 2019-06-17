// DOM variables

const checkbox = document.querySelector('#remember'),
      errorsMsg = document.querySelector('#errors'),
      errPass = document.querySelector('#pass-err'),
      errUser = document.querySelector('#username-err'),
      hintPass = document.querySelector('#pass-hint'),
      login = document.querySelector('#logIn'),
      pass = document.querySelector('#pass'),
      passToggler = document.querySelector('#pass-show'),
      user = document.querySelector('#username');
let passIsShown = false;

// Page scripts:

window.addEventListener('DOMContentLoaded', () => {   
  'use strict';
  // Store/retrieve user details from localStorage
  saveUsername();

  // Watch for errors
  toggleUsernameError();
  togglePasswordError();
  checkPassRedExp();
  listAllErrors();

  // Watch for togglers
  togglePasswordShow();
  togglePasswordHint();
});

// Check and retrieve/save/delete data

function saveUsername() {
  let checkNext = !(localStorage.getItem('remember'));

  if (localStorage.getItem('remember') === 'true') {
    checkbox.checked = true;
    user.value = localStorage.getItem('username');
  }
      
  checkbox.addEventListener('click', () => {
    localStorage.setItem('remember', checkNext);
    checkNext = !checkNext;

    if (checkNext === false) {
      localStorage.setItem('username', user.value);
      localStorage.setItem('remember', true);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('remember');
    }
  });
}


// Check if fields are empty

function toggleUsernameError() {
  user.addEventListener('blur', () => {
    if (user.value == '') {
      errUser.classList.remove('hidden');
      user.classList.add('error');
    } else {
      errUser.classList.add('hidden');
      user.classList.remove('error');
    }
  }, false);
}

function togglePasswordError() {
  pass.addEventListener('blur', () => {
    if (pass.value == '') {
      errPass.classList.remove('hidden');
      pass.classList.add('error');
    } else {
      errPass.classList.add('hidden');
      pass.classList.remove('error');
    }
  }, false);
}

// Check the password constraints

function checkPassRedExp() {
  const rePass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");

  pass.addEventListener('blur', () => {
    if (!rePass.test(pass.value)) {
      hintPass.classList.remove('hidden');
      hintPass.classList.add('error');
      pass.classList.add('error');
    } else {
      hintPass.classList.add('hidden');
      hintPass.classList.remove('error');
      pass.classList.remove('error');
    }
  }, false);
}

// List all errors on the top

function listAllErrors() {
  
  login.addEventListener('click', () => {
    errorsMsg.innerHTML = null;
    let errorsAll = document.querySelectorAll('.hint.error:not(.hidden)');

    errorsAll.forEach(el => {
      let newErrMsgTxt = document.createTextNode(`Error: ${el.textContent}.`),
          newErrMsg = document.createElement('li');

      newErrMsg.appendChild(newErrMsgTxt);
      errorsMsg.insertAdjacentElement('beforeend', newErrMsg);
    });
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
  hintPass.classList.remove('hidden'); // show the password hint
}

function passHide() {
  pass.setAttribute('type', 'password');
  passToggler.classList.remove('fa-eye-slash');
  passToggler.classList.add('fa-eye');
  hintPass.classList.add('hidden'); // hide the password hint
}

// Watch for password constraints hint toggler

function togglePasswordHint() {
  pass.addEventListener('focusin', () => {
    hintPass.classList.remove('hidden');
  }, false);
}


// Form validation for test user

function checkForm() {
  getUserData();

  let testUser = data.username,
      testPass = data.pass;
      
  // check credentials
  if (user.value != testUser || pass.value != testPass) {
    alert('Your username/password combination was not recognized. \nPlease, try again.');
    return false;
  } else {
    alert('Login Successful! \nRedirecting...');
    return true;
  }
}

function getUserData() {
  let request = new XMLHttpRequest();

  request.open('GET', 'src/testUser.json'); // local server
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  request.send();

  request.addEventListener('readystatechange', () => {
    if (request.readyState == 4 && request.status == 200) {
      data = JSON.parse(request.response);
    } else if (request.status != 200) {
      // alert('Something went wrong. Please, reload the page and try again.');
      console.error(`Request returned with ${request.status} status`);
    }
  });
}