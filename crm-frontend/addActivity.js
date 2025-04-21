document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }
    
    // Hvis du ønsker å hente en customerId fra URL for automatisk kobling, kan du gjøre følgende:
    const urlParams = new URLSearchParams(window.location.search);
    const urlCustomerId = urlParams.get('id');  // f.eks. ?id=123
    const customerIdField = document.getElementById('customerId');
    if (urlCustomerId && customerIdField) {
        customerIdField.value = urlCustomerId;
    }
    
    document.getElementById('activity-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const customerId = document.getElementById('customerId').value.trim();
        const type = document.getElementById('type').value;
        const note = document.getElementById('note').value;
        const date = document.getElementById('date').value;
        
        const activityData = { type, note, date };
        // Legg til customerId dersom feltet ikke er tomt
        if (customerId) {
            activityData.customerId = customerId;
        }
        
        try {
            const response = await fetch('http://localhost:3000/api/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(activityData)
            });
            
            const resData = await response.json();
            if (response.ok) {
                alert('Aktivitet lagt til!');
                // Mulig redirect til dashboard eller aktiviteter siden:
                window.location.href = 'dashboard.html';
            } else {
                alert('Feil: ' + resData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Det oppstod en feil under lagring av aktivitet');
        }
    });
});
