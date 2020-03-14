const getIdentifier = (email) => {
  return '@' + email.split('@')[0]
} 

export { getIdentifier };