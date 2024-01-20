document.addEventListener('DOMContentLoaded', function() {
    // Set a default value of 100
    browser.storage.sync.get({ limit: 100 }).then( function(data) {
      document.getElementById('limit').value = data.limit;
    });
  
    // Add event listener for the form submission
    document.querySelector('form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting and refreshing the page
  
      // Get the value from the input field
      const limitValue = document.getElementById('limit').value;
      // Save the value to browser.storage.local
      if (!isNaN(+limitValue)){
          browser.storage.sync.set({ limit: parseInt(limitValue) }).then(function() {
              // Notify the user that the data was saved
              console.log('Limit saved:', limitValue);
            });
        }
    });
  });
  