import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export async function setToken(token: string): Promise<boolean> {
  if(token){
    await Storage.set({
      key: "token",
      value: token,
    });

    return true;
  }

  return false;
}

export async function getToken(): Promise<string> {
  const res = await Storage.get({ key: "token" });

  if(res.value){
    return res.value;
  }

  return "";
}

export async function clearToken() {
  await Storage.remove({ key: "token" })
}