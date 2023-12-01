const jsonFilePath = 'backend/products.json';
fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('apiData', JSON.stringify(data));
    })
    .catch(error => {
        console.error('Error:', error);
    });
