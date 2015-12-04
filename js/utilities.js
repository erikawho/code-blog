// Example from book for submit event & getting form values
(function() {
  var form = document.getElementById('login');

  addEvent(form, 'submit', function(e) { // When user submits form
    e.preventDefault(); // Stop it from being sent
    var elements = this.elements; // Gets all form elements
    var username = elements.username.value;
    var msg = 'Welcome' + username;
    document.getElementById('main').textContent = msg;
  });
}());
