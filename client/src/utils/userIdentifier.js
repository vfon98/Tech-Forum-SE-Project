const getIdentifier = (email) => {
  if (!email) return '@unknown';
  return '@' + email.split('@')[0]
} 

export { getIdentifier };