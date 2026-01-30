const autocannon = require('autocannon');
const fs = require('fs');
const os = require('os');

const endpoints = ['/', '/health', '/compute'];

// Function to pick a random endpoint
function getRandomEndpoint() {
  return endpoints[Math.floor(Math.random() * endpoints.length)];
}

// Custom function to generate a stream of random requests
const requests = [];
for (let i = 0; i < 10000; i++) {
  requests.push({ method: 'GET', path: getRandomEndpoint() });
}

console.log('🚀 Starting load test: 10,000 requests, random endpoints');

const instance = autocannon({
  url: 'http://192.168.5.15:9003', // vm3
  connections: 100,               // concurrent clients
  requests: requests,
  pipelining: 1
}, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('✅ Load test completed!\n');

  // Save detailed report to file
  const reportFile = 'single_report.json';
  fs.writeFileSync(reportFile, JSON.stringify(result, null, 2));
  console.log(`📄 Detailed report saved to ${reportFile}`);

  // Also print summary
  console.log(`
Requests per second: ${result.requests.average.toFixed(2)}
Mean latency: ${result.latency.average.toFixed(2)} ms
50th percentile latency: ${result.latency.p50} ms
90th percentile latency: ${result.latency.p90} ms
99th percentile latency: ${result.latency.p99} ms
Total errors: ${result.errors}
Total timeouts: ${result.timeouts}
`);
});

// Live progress in console
autocannon.track(instance, { renderProgressBar: true });
