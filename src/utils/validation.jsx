
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);

export const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);

export const validateUsername = (username) => /^[a-zA-Z0-9]{4,15}$/.test(username);