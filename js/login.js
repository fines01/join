let users = [{
        'user': 'FabianEichhorn@mail.de',
        'password': 'FabianE.Join',
    },
    {
        'user': 'MarcoBeer@mail.de',
        'password': 'MarcoB.Join',
    },
    {
        'user': 'StefanHerrmann@mail.de',
        'password': 'StefanH.Join',
    },
    {
        'user': 'InesFritsch@mail.de',
        'password': 'InesF.Join',
    },
    {
        'user': 'Test@mail.de',
        'password': 'Test',
    }
]


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

        if (username.value == element['user'] &&
            password.value == element['password']) {
            window.open('index.html');
            return
        }

    }
    alert('Username or Password is not correct!')
}