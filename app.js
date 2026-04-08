const form = document.getElementById('authForm');
const statusBox = document.getElementById('status');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const submitBtn = document.getElementById('submitBtn');
const confirmWrap = document.getElementById('confirmWrap');
const confirmInput = document.getElementById('confirmPassword');
const nameWrap = document.getElementById('nameWrap');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const showPassword = document.getElementById('showPassword');
const showConfirmPassword = document.getElementById('showConfirmPassword');

let mode = 'login';

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === 'signup';

  loginTab?.classList.toggle('active', !isSignup);
  signupTab?.classList.toggle('active', isSignup);
  loginTab?.setAttribute('aria-selected', String(!isSignup));
  signupTab?.setAttribute('aria-selected', String(isSignup));

  confirmWrap?.classList.toggle('hidden', !isSignup);
  nameWrap?.classList.toggle('hidden', !isSignup);

  if (submitBtn) {
    submitBtn.textContent = isSignup ? 'Create Account' : 'Login';
  }

  if (statusBox) {
    statusBox.textContent = '';
  }
}

function saveSession({ name, email }) {
  localStorage.setItem('vertex_user', JSON.stringify({
    name: name || '',
    email,
    updatedAt: new Date().toISOString(),
  }));
}

showPassword?.addEventListener('change', () => {
  if (passwordInput) {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
  }
});

showConfirmPassword?.addEventListener('change', () => {
  if (confirmInput) {
    confirmInput.type = showConfirmPassword.checked ? 'text' : 'password';
  }
});

loginTab?.addEventListener('click', () => setMode('login'));
signupTab?.addEventListener('click', () => setMode('signup'));

if (form && statusBox) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput?.value.trim() ?? '';
    const email = document.getElementById('email')?.value.trim() ?? '';
    const password = passwordInput?.value ?? '';
    const confirmPassword = confirmInput?.value ?? '';

    if (!email || !password) {
      statusBox.textContent = 'Please enter email and password.';
      statusBox.style.color = '#ff9595';
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      statusBox.textContent = 'Please enter a valid email address.';
      statusBox.style.color = '#ff9595';
      return;
    }

    if (mode === 'signup' && !name) {
      statusBox.textContent = 'Please enter your full name.';
      statusBox.style.color = '#ff9595';
      return;
    }

    if (password.length < 8) {
      statusBox.textContent = 'Password must be at least 8 characters.';
      statusBox.style.color = '#ff9595';
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      statusBox.textContent = 'Passwords do not match.';
      statusBox.style.color = '#ff9595';
      return;
    }

    statusBox.textContent = mode === 'signup' ? 'Creating account...' : 'Signing in...';
    statusBox.style.color = '#f9d17a';

    window.setTimeout(() => {
      saveSession({ name, email });
      statusBox.textContent = mode === 'signup'
        ? `Account created ✅ Welcome, ${name}. Redirecting...`
        : 'Login successful ✅ Redirecting...';
      statusBox.style.color = '#6cf5ad';

      window.setTimeout(() => {
        window.location.href = 'home.html';
      }, 450);
    }, 700);
  });
}
