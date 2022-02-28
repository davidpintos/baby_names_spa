
export const randomString = (length = 12) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result  = '';
   for (var i = 0; i < length; ++i) {
      result += alphabet[Math.floor(Math.random() * alphabet.length)];
   }
   return result;
}

export const isValidName = (name) => name && name.length && /^[a-zA-Z\s]*$/.test(name);
