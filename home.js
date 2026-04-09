const userRaw = localStorage.getItem('vertex_user');
const user = userRaw ? JSON.parse(userRaw) : null;
if (!user || !user.email) {
  window.location.href = 'index.html';
}

const welcomeText = document.getElementById('welcomeText');
const chatArea = document.getElementById('chatArea');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const micBtn = document.getElementById('micBtn');

const memory = [];
const appName = user?.name ? `${user.name}` : 'User';
welcomeText.textContent = `Welcome, ${appName}`;

function addMessage(role, text) {
  const item = document.createElement('div');
  item.className = `bubble ${role}`;
  item.textContent = text;
  chatArea.appendChild(item);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function aiReply(input) {
  const q = input.toLowerCase();
  if (q.includes('history')) return 'Chat history synced in your dashboard menu.';
  if (q.includes('voice')) return 'Voice mode is active. Tap mic and speak naturally.';
  if (q.includes('avatar')) return 'Avatar studio is ready. Open AI Avatar Creation from the menu.';
  if (q.includes('setting')) return 'Settings updated. Your preferences are now saved locally.';
  if (q.includes('payment') || q.includes('permission')) return 'For secure actions, permission and PIN confirmation are always required.';
  return 'I understood your message. I can help with chat, planning, and assistant actions from this home screen.';
}

function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN';
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

addMessage('ai', 'Welcome to vertex.ai. Your home assistant is now active.');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  memory.push({ role: 'user', text });
  chatInput.value = '';

  setTimeout(() => {
    const response = aiReply(text);
    addMessage('ai', response);
    memory.push({ role: 'ai', text: response });
    if (memory.length > 30) memory.shift();
    speak(response);
  }, 300);
});

document.querySelectorAll('[data-menu]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-menu]').forEach((el) => el.classList.remove('active'));
    button.classList.add('active');
    const label = button.textContent.trim();
    const response = `${label} panel opened. You can continue from this home screen.`;
    addMessage('ai', response);
    speak(response);
  });
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognizer = new SpeechRecognition();
  recognizer.lang = 'en-IN';
  recognizer.interimResults = false;

  micBtn.addEventListener('click', () => {
    recognizer.start();
  });

  recognizer.onresult = (event) => {
    const text = event.results?.[0]?.[0]?.transcript || '';
    if (text) {
      chatInput.value = text;
      chatForm.dispatchEvent(new Event('submit'));
    }
  };
} else {
  micBtn.disabled = true;
  micBtn.title = 'Voice input is not available in this browser';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('vertex_user');
  window.location.href = 'index.html';
});
