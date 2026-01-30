const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

const hostname = os.hostname();

/* Pretty timestamp: YYYY-MM-DD HH:mm:ss */
function timestamp() {
  return new Date().toISOString().replace('T', ' ').split('.')[0];
}

/* Global request logger (runs for ALL routes) */
app.use((req, res, next) => {
  console.log(`[${timestamp()}] [${hostname}] ${req.method} ${req.url}`);
  next();
});

app.get('/health', (req, res) => {
  res.send(`OK from ${hostname}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* CPU-heavy route */
app.get('/compute', (req, res) => {
  // Heavy computation: nth Fibonacci number
  function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
  }

  const n = 35; // Adjust for more/less CPU load
  const result = fib(n);

  res.send(`[${timestamp()}] [${hostname}] Computed fib(${n}) = ${result}`);
});

app.listen(PORT, () => {
  console.log(`[${timestamp()}] [${hostname}] Server running on port ${PORT}`);
});
