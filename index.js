const divUsers = document.querySelector('.users');
const apiUsers = 'https://gorest.co.in/public/v2/users';
const apiPosts = 'https://gorest.co.in/public/v2/posts';

async function loadUsers() {
  const allUsers = await fetch(apiUsers);
  const loadedUser = await allUsers.json();

  if (loadedUser.length === 0) {
    const errorMessageUsers = document.createElement('div');
    errorMessageUsers.textContent = 'Users not found...';
    errorMessageUsers.classList.add('error-users');
    divUsers.appendChild(errorMessageUsers);
  } else {
    const userList = document.createElement('ul');
    loadedUser.forEach((user) => {
      const userItem = document.createElement('li');
      const userLink = document.createElement('a');
      userLink.textContent = user.name;
      userLink.setAttribute('href', `allUserPosts.html?user_id=${user.id}`);
      userItem.appendChild(userLink);
      userList.appendChild(userItem);
    });
    divUsers.appendChild(userList);
  }
}

loadUsers();
