const form = document.getElementById('loginForm');
const statusBox = document.getElementById('status');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    statusBox.textContent = 'Please enter email and password.';
    statusBox.style.color = '#ff9a9a';
    return;
  }

  statusBox.textContent = 'Premium sign-in experience ready ✅ (backend integration next)';
  statusBox.style.color = '#50d890';
});
