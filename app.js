const form = document.getElementById('loginForm');
const statusBox = document.getElementById('status');

if (form && statusBox) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value;

    if (!email || !password) {
      statusBox.textContent = 'Please enter email and password.';
      statusBox.style.color = '#ff9595';
      return;
    }

    if (password.length < 8) {
      statusBox.textContent = 'Password must be at least 8 characters.';
      statusBox.style.color = '#ff9595';
      return;
    }

    statusBox.textContent = 'Signing in...';
    statusBox.style.color = '#f9d17a';

    window.setTimeout(() => {
      statusBox.textContent = 'Sign in successful ✅ Welcome to Vertex AI.';
      statusBox.style.color = '#6cf5ad';
    }, 700);
  });
}
