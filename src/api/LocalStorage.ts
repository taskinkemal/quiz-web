const ACCESS_TOKEN = 'ACCESS_TOKEN';

export interface LocalSettings {
  accessToken?: string;
}

function saveAccessToken(accessToken: string): void {
  window.localStorage.setItem(ACCESS_TOKEN, accessToken);
}

function load(): LocalSettings {
  function loadByKey(key: string) {
    const value = window.localStorage.getItem(key);
    return value || undefined;
  }

  return {
    accessToken: loadByKey(ACCESS_TOKEN)
  };
}

function reset(): void {
  window.localStorage.removeItem(ACCESS_TOKEN);
}

const obj = { saveAccessToken, load, reset };
export default obj;