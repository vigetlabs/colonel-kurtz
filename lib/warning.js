function warning (message) {
  if (warning.env !== 'production') {
    console.warn(message)
  }
}

// This allows us to modify env for testing
warning.env = process.env.NODE_ENV

export default warning
