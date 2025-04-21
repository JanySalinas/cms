document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return window.location.href = 'login.html';

  const params = new URLSearchParams(window.location.search);
  const customerId = params.get('id');
  if (customerId) {
    document.getElementById('form-title').textContent = 'Rediger Kunde';
    document.getElementById('submit-button').textContent = 'Oppdater';
    const res = await fetch(`/api/customer/${customerId}`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const cust = await res.json();
    document.getElementById('name').value    = cust.name;
    document.getElementById('email').value   = cust.email;
    document.getElementById('company').value = cust.company||'';
  }

  document.getElementById('customer-form').addEventListener('submit', async e => {
    e.preventDefault();
    const body = {
      name:    e.target.name.value,
      email:   e.target.email.value,
      company: e.target.company.value
    };
    const url    = customerId ? `/api/customer/${customerId}` : '/api/customer';
    const method = customerId ? 'PUT' : 'POST';
    const res    = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);
    window.location.href = 'dashboard.html';
  });
});