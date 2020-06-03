/* eslint-env node */
const interfaces = require('os').networkInterfaces();

module.exports = function getIPAddress() {
  const interfacesKeys = Object.keys(interfaces);

  for (let i = 0; i < interfacesKeys.length; i++) {
    const iface = interfaces[interfacesKeys[i]];

    for (let j = 0; j < iface.length; j++) {
      const alias = iface[j];

      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }

  return '0.0.0.0';
};
