document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    try {
      const res = await fetch('/api/auth/login', {   // ← merk ledende /
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      localStorage.setItem('jwtToken', data.token);
      window.location.href = 'dashboard.html';
    } catch (err) {
      alert('Innlogging feilet: ' + err.message);
    }
  });