let uidCounter = 0

export default function uid() {
  uidCounter += 1
  return `c${uidCounter}`
}
