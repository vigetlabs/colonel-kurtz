let uidCounter = 0;

module.exports = function() {
  uidCounter += 1
  return `c${ uidCounter }`
}
