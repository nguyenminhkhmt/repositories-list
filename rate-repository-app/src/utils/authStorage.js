import AsyncStorage from '@react-native-async-storage/async-storage';
const tokenKey = "accessToken";
class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:${tokenKey}`);
    return token;
  }

  async setAccessToken(accessToken) {
    console.log(accessToken);
    await AsyncStorage.setItem(`${this.namespace}:${tokenKey}`, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:${tokenKey}`);
  }
}

export default AuthStorage;