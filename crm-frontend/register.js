document.getElementById('register-form')
  .addEventListener('submit', async e => {
    e.preventDefault();
    const name  = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const pw    = e.target.password.value;
    const pw2   = e.target.confirmPassword.value;
    if (pw !== pw2) return alert('Passwords must match');

    try {
      const res  = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: pw })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      alert('Registered successfully');
      window.location.href = 'login.html';
    } catch (err) {
      alert('Registration failed: ' + err.message);
    }
  });