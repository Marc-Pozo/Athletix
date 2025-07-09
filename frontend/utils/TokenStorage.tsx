import * as SecureStore from 'expo-secure-store';

export const storeTokenSecurely = async (token : string) => {
  try {
    await SecureStore.setItemAsync('session_token', token);
    console.log('Token securely saved');
  } catch (e) {
    console.error('Failed to save secure token', e);
  }
};

export const verifySecureToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('session_token');
    console.log('Secure token:', token);

    const response = await fetch(`http://192.168.1.65:3000/api/auth/login/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
    });

    if(!response.ok)
        return false;
    return true;
  } catch (e) {
    console.error('Failed to load secure token', e);
  }
};

export const getSecureToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('session_token');
    if (token) {
      console.log('Secure token retrieved:', token);
      return token;
    } else {
      console.warn('No secure token found');
      return null;
    }
  } catch (e) {
    console.error('Failed to retrieve secure token', e);
    return null;
  }
}

export const removeSecureToken = async () => {
  try {
    await SecureStore.deleteItemAsync('session_token');
    console.log('Secure token removed');
  } catch (e) {
    console.error('Failed to remove secure token', e);
  }
};
