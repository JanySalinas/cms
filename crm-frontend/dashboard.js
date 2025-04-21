document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        // Hvis token mangler, omdiriger til login-siden
        window.location.href = 'login.html';
        return;
    }
    
    // Hent kundedata fra backend API
    fetch('http://localhost:3000/api/customer', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if(!response.ok) {
            throw new Error(`Feil ved lasting av kunder: ${response.statusText}`);
        }
        return response.json();
    })
    .then(customers => {
        const tableBody = document.querySelector('#customer-table tbody');
        tableBody.innerHTML = ''; // Tømmer tabellen før vi legger til data
        customers.forEach(customer => {
            const tr = document.createElement('tr');
            // Antar at kundedata har properties: name, email, company
            tr.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.company || ''}</td>
                <td>
                    <button onclick="viewCustomer('${ customer.id }')">Vis</button>
                    <button onclick="editCustomer('${ customer.id }')">Rediger</button>
                    <button onclick="deleteCustomer('${ customer.id }')">Slett</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Feil ved henting av kundedata:", error);
        alert("Kunne ikke laste kundedata.");
    });
  });
  
  // Eksempel-funksjoner for action-knapper (må implementeres videre)
  function viewCustomer(id) {
    alert("Vis kunde med ID: " + id);
    // Implementer visning av kundeinfo
  }
  
  function editCustomer(id) {
    alert("Rediger kunde med ID: " + id);
    // Implementer redigeringsfunksjonalitet
  }
  
  function deleteCustomer(id) {
    if(confirm("Er du sikker på at du vil slette denne kunden?")) {
        const token = localStorage.getItem('jwtToken');
        fetch(`http://localhost:3000/api/customer/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => {
            if(response.ok) {
                alert("Kunde slettet.");
                // Oppdater tabellen ved å laste inn på nytt eller fjern raden
                window.location.reload();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message || "Slette kunde feilet.");
                });
            }
        })
        .catch(error => {
            console.error("Feil ved sletting:", error);
            alert("Klarte ikke slette kunden.");
        });
    }
  }