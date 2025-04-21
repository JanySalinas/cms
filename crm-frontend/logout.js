document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('jwtToken');
    window.location.href = 'login.html';
  });