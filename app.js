// TODO: Replace the config with your Firebase project's web SDK config.
// You can obtain it from the Firebase console (Project Settings > General > Your apps).
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMqWQhBPziP3EU1XImXNTjBWrfIpjPO-Q",
  authDomain: "my-to-do-list-91d1c.firebaseapp.com",
  projectId: "my-to-do-list-91d1c",
  storageBucket: "my-to-do-list-91d1c.firebasestorage.app",
  messagingSenderId: "574951341560",
  appId: "1:574951341560:web:f9304b8dd708162d7daa0d"
};
  apiKey: "YOUR_API_KEY",
  authDomain: "my-to-do-list-91d1c.firebaseapp.com",
  projectId: "my-to-do-list-91d1c",
  storageBucket: "my-to-do-list-91d1c.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// UI elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const addBtn = document.getElementById('add-btn');
const newTodoInput = document.getElementById('new-todo');
const todoListUl = document.getElementById('todo-list');

let unsubscribe = null; // Firestore listener handle

// Sign‑in with Google
loginBtn.addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (e) {
    console.error('Google sign‑in error', e);
  }
});

// Sign‑out
logoutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

// Auth state observer
auth.onAuthStateChanged(user => {
  if (user) {
    // Show user info
    userInfoDiv.style.display = 'block';
    userEmailSpan.textContent = user.email;
    loginBtn.style.display = 'none';
    // Start listening to the shared todo collection
    startTodoListener();
  } else {
    // Hide UI
    userInfoDiv.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    // Detach listener if any
    if (unsubscribe) unsubscribe();
    renderTodoList([]);
  }
});

// Add new todo
addBtn.addEventListener('click', async () => {
  const text = newTodoInput.value.trim();
  if (!text) return;
  const user = auth.currentUser;
  if (!user) { alert('Please sign in first'); return; }
  await db.collection('todos').add({
    text,
    completed: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    owner: user.uid // optional, can be used for per‑user filtering later
  });
  newTodoInput.value = '';
});

function startTodoListener() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection('todos')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      const todos = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        todos.push({ id: doc.id, ...data });
      });
      renderTodoList(todos);
    }, err => console.error('Firestore listener error', err));
}

function renderTodoList(todos) {
  todoListUl.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');

    // Toggle complete on click
    li.addEventListener('click', async () => {
      await db.collection('todos').doc(todo.id).update({ completed: !todo.completed });
    });

    // Add delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.style.marginLeft = '8px';
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await db.collection('todos').doc(todo.id).delete();
    });
    li.appendChild(delBtn);
    todoListUl.appendChild(li);
  });
}

// You can obtain it from the Firebase console (Project Settings > General > Your apps).
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMqWQhBPziP3EU1XImXNTjBWrfIpjPO-Q",
  authDomain: "my-to-do-list-91d1c.firebaseapp.com",
  projectId: "my-to-do-list-91d1c",
  storageBucket: "my-to-do-list-91d1c.firebasestorage.app",
  messagingSenderId: "574951341560",
  appId: "1:574951341560:web:f9304b8dd708162d7daa0d"
};
  apiKey: "YOUR_API_KEY",
  authDomain: "my-to-do-list-91d1c.firebaseapp.com",
  projectId: "my-to-do-list-91d1c",
  storageBucket: "my-to-do-list-91d1c.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// UI elements
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfoDiv = document.getElementById('user-info');
const userEmailSpan = document.getElementById('user-email');
const addBtn = document.getElementById('add-btn');
const newTodoInput = document.getElementById('new-todo');
const todoListUl = document.getElementById('todo-list');

let unsubscribe = null; // Firestore listener handle

// Sign‑in with Google
loginBtn.addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (e) {
    console.error('Google sign‑in error', e);
  }
});

// Sign‑out
logoutBtn.addEventListener('click', async () => {
  await auth.signOut();
});

// Auth state observer
auth.onAuthStateChanged(user => {
  if (user) {
    // Show user info
    userInfoDiv.style.display = 'block';
    userEmailSpan.textContent = user.email;
    loginBtn.style.display = 'none';
    // Start listening to the shared todo collection
    startTodoListener();
  } else {
    // Hide UI
    userInfoDiv.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    // Detach listener if any
    if (unsubscribe) unsubscribe();
    renderTodoList([]);
  }
});

// Add new todo
addBtn.addEventListener('click', async () => {
  const text = newTodoInput.value.trim();
  if (!text) return;
  const user = auth.currentUser;
  if (!user) { alert('Please sign in first'); return; }
  await db.collection('todos').add({
    text,
    completed: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    owner: user.uid // optional, can be used for per‑user filtering later
  });
  newTodoInput.value = '';
});

function startTodoListener() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection('todos')
    .orderBy('createdAt')
    .onSnapshot(snapshot => {
      const todos = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        todos.push({ id: doc.id, ...data });
      });
      renderTodoList(todos);
    }, err => console.error('Firestore listener error', err));
}

function renderTodoList(todos) {
  todoListUl.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) li.classList.add('completed');

    // Toggle complete on click
    li.addEventListener('click', async () => {
      await db.collection('todos').doc(todo.id).update({ completed: !todo.completed });
    });

    // Add delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.style.marginLeft = '8px';
    delBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      await db.collection('todos').doc(todo.id).delete();
    });
    li.appendChild(delBtn);
    todoListUl.appendChild(li);
  });
}
