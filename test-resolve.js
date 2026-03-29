try {
  const path = require.resolve('@react-three/fiber');
  console.log('Resolved path:', path);
} catch (e) {
  console.error('Resolution failed:', e.message);
}
