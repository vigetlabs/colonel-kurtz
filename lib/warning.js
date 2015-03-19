let env = process.env.NODE_ENV

export default function(message) {
  if (env !== 'production') {
    console.warn(message)
  }
}
