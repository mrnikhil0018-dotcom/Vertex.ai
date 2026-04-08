const form = document.getElementById('authForm');
const statusBox = document.getElementById('status');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const submitBtn = document.getElementById('submitBtn');
const confirmWrap = document.getElementById('confirmWrap');
const confirmInput = document.getElementById('confirmPassword');

let mode = 'login';

function setMode(nextMode) {
  mode = nextMode;
  const isSignup = mode === 'signup';

  if (loginTab && signupTab) {
    loginTab.classList.toggle('active', !isSignup);
    signupTab.classList.toggle('active', isSignup);
    loginTab.setAttribute('aria-selected', String(!isSignup));
    signupTab.setAttribute('aria-selected', String(isSignup));
  }

  if (confirmWrap) {
    confirmWrap.classList.toggle('hidden', !isSignup);
  }

  if (submitBtn) {
    submitBtn.textContent = isSignup ? 'Create Account' : 'Login';
  }

  if (statusBox) {
    statusBox.textContent = '';
  }
}

loginTab?.addEventListener('click', () => setMode('login'));
signupTab?.addEventListener('click', () => setMode('signup'));

if (form && statusBox) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value ?? '';
    const confirmPassword = confirmInput?.value ?? '';

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

    if (mode === 'signup' && password !== confirmPassword) {
      statusBox.textContent = 'Passwords do not match.';
      statusBox.style.color = '#ff9595';
      return;
    }

    statusBox.textContent = mode === 'signup' ? 'Creating account...' : 'Signing in...';
    statusBox.style.color = '#f9d17a';

    window.setTimeout(() => {
      statusBox.textContent = mode === 'signup'
        ? 'Account created ✅ Welcome to vertex.ai.'
        : 'Login successful ✅ Welcome to vertex.ai.';
      statusBox.style.color = '#6cf5ad';
    }, 700);
  });
}
