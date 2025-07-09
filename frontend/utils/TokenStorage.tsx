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
    
    const response = await fetch(`http://192.168.1.65:3000/api/auth/login/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
    });

    const { user_id } = await response.json();

    if(!response.ok)
        return null;
    return {token, user_id};
  } catch (e) {
    console.error('Failed to load secure token', e);
  }
};

export const getSecureToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('session_token');
    if (token) {
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
