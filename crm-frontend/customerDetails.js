document.addEventListener('DOMContentLoaded', () => {
    // Hent kunde-ID fra query-string (f.eks. ?id=123)
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');
    if (!customerId) {
        alert("Ingen kunde-ID spesifisert");
        return;
    }
    
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Hent kundeinformasjon
    fetch(`http://localhost:3000/api/customer/${customerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Feil ved henting av kundedetaljer");
        }
        return response.json();
    })
    .then(customer => {
        // Oppdater DOM med kundeinformasjon
        document.getElementById('customer-name').textContent = customer.name;
        document.getElementById('customer-email').textContent = customer.email;
        document.getElementById('customer-company').textContent = customer.company || '';
    })
    .catch(error => {
        console.error("Feil i henting av kunde:", error);
        alert("Kunne ikke laste kundedetaljer.");
    });
    
    // Hent aktiviteter for denne kunden
    fetch(`http://localhost:3000/api/activity?customerId=${customerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Feil ved henting av aktiviteter");
        }
        return response.json();
    })
    .then(activities => {
        const tbody = document.getElementById('activity-table-body');
        tbody.innerHTML = ''; // Tøm tabellen før vi legger til data
        activities.forEach(activity => {
            // Forventet at aktivitet har egenskaper: type, note, og date
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${activity.type}</td>
                <td>${activity.note}</td>
                <td>${new Date(activity.date).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Feil i henting av aktiviteter:", error);
        alert("Kunne ikke laste aktiviteter.");
    });
});