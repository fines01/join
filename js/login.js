// users moved to data.js

/**
 * function schowPassword() is used to show the password when clicking on the eye symbol
 */

function showPassword() {
    var x = document.getElementById('password');
    var y = document.getElementById('hide1');
    var z = document.getElementById('hide2');

    if (x.type == 'password') {
        x.type = "text";
        y.style.display = 'block';
        z.style.display = 'none';
    } else {
        x.type = "password";
        y.style.display = 'none';
        z.style.display = 'block';
    }
}


/**
 * function checkLogin() checks the data of the inout fields with the users in the JSON and if it is correct you will get to the mainpage
 */


function checkLogin() {
    let username = document.getElementById('user');
    let password = document.getElementById('password');

    for (let i = 0; i < users.length; i++) {
        let element = users[i];

        if (username.value == element['email'] &&
            password.value == element['password']) {
            window.open('index.html');
            return
        }

    }
    alert('Username or Password is not correct!')
}

function openRegisterWindow() {
    document.getElementById('form-box2').classList.remove('display-none');
    document.getElementById('form-box1').classList.add('display-none');
}

function closeRegisterWindow() {
    document.getElementById('form-box2').classList.add('display-none');
    document.getElementById('form-box1').classList.remove('display-none');
}

function registerNewUser() {
    let registerUser = document.getElementById('new-user');
    let registerPassword = document.getElementById('new-password');
    let newUser = {
        //'name' :
        'email': registerUser.value,
        'password': registerPassword.value,
        'color' : randomHexColor(),
        'status': false,
    }

    for (let i = 0; i < users.length; i++) {
        if (registerUser.value == users[i]['email']) {
            alert('that username already exists please choose another');
            return;
        } else if (registerPassword.value.length < 3) {
            alert('that password is too short, include more than 3 characters');
            return;
        }

    }
    users.push(newUser);
    console.log(users);
    saveNewUser();
}

function saveNewUser() {
    let usersAsText = JSON.stringify(users);

    localStorage.setItem('users', usersAsText);
}

function loadNewUser() {
    let usersAsText = localStorage.getItem('users');
    if (usersAsText) {
        users = JSON.parse(usersAsText);
    }

}