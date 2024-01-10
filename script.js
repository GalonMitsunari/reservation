document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const places = document.getElementById('places').value;
    console.log('Date:', date, 'Number of seats:', places);
});