import CryptoJS from 'crypto-js';
import { FinancialData } from '@/types';

const STORAGE_KEY = 'net-worth-data';
const ENCRYPTION_KEY_SETTING = 'net-worth-encryption';

function getEncryptionKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ENCRYPTION_KEY_SETTING);
}

export function setEncryptionKey(key: string | null): void {
  if (key) {
    localStorage.setItem(ENCRYPTION_KEY_SETTING, key);
  } else {
    localStorage.removeItem(ENCRYPTION_KEY_SETTING);
  }
}

export function isEncryptionEnabled(): boolean {
  return !!getEncryptionKey();
}

export function saveData(data: FinancialData): void {
  const json = JSON.stringify(data);
  const encKey = getEncryptionKey();
  if (encKey) {
    const encrypted = CryptoJS.AES.encrypt(json, encKey).toString();
    localStorage.setItem(STORAGE_KEY, encrypted);
  } else {
    localStorage.setItem(STORAGE_KEY, json);
  }
}

export function loadData(): FinancialData | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    // Try parsing as plain JSON first
    return JSON.parse(raw) as FinancialData;
  } catch {
    // Try decrypting
    const encKey = getEncryptionKey();
    if (!encKey) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(raw, encKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      if (!decrypted) return null;
      return JSON.parse(decrypted) as FinancialData;
    } catch {
      return null;
    }
  }
}

export function clearData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
