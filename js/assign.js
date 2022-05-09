
/**This function gets all selected user values from an html multiple select field and returns the values in an array
 * @returns {string[]} - selected users
 */
function getAssignedUsers() {
    let assignedUsers = [];
    let selectOptions = getId('assignUser').options;

    for (let i = 0; i < selectOptions.length; i++) {
        if (selectOptions[i].selected) {
            assignedUsers.push(selectOptions[i].value);
        }
    }
    return assignedUsers;
}

/**
 * Clears user icons when resetting the addToTask.html form
 */
function clearAssignments() {
    getId('iconsContainer').innerHTML = renderAssignedUsers([]);
}

function renderAssignedUsers(usersArr) {
    let iconsHTML = '';
    if (usersArr && usersArr.length > 0) {
        for (let i = 0; i < usersArr.length; i++) {
            let user = usersArr[i];
            iconsHTML += renderUserIcon(user);
        }
    } else {
        iconsHTML = '<img src="img/icon-plus.png" alt="" class="icon-replacement">';
    }
    return iconsHTML;
}

// returns up to 2 initials of a given user name
function extractInitials(userName) {
    let splitNameArr = userName.split(' ');
    let initials = '';
    if (splitNameArr.length > 1) {
        for (let i = 0; i < 2; i++) { // max 2 initials 
            initials += splitNameArr[i][0] + ' '; // get first character (with a space) of every string/ name
        }
    } else {
        initials = splitNameArr[0][0]; // get first character
    }
    return initials;
}

function renderUserIcon(userName) {
    let user = users.filter(usr => usr.name == userName);
    // get initials (max 2 or 3)
    let initials = extractInitials(userName);
    return /*html*/ `<span id="icon-${userName}" class="user-icon" alt="user icon" style="background-color: ${user[0].color}">${initials}</span>`;
}

function showSelectedUserIcon() { // ...iconS !
    let selectedUsersArr = getAssignedUsers();
    //if(selectedUsersArr){
        getId('iconsContainer').innerHTML = renderAssignedUsers(selectedUsersArr);
    //}
}

function getLogBorderColor(namesArr) {
    if(namesArr){
        let userName = namesArr[0]; // so right now only first user will be marked by border-color (which will always be user with index 0, need better ideas
        let user = users.filter(usr => usr.name == userName);
        if (user && user.length > 0) {
            return user[0].color;
        }
    }
}

