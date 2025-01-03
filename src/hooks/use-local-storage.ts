// hooks/use-local-storage.ts
import { canUseDom } from "@/lib/react/dom";
import { useState, useEffect, useCallback } from "react";

// Configuration type for the hook
interface LocalStorageConfig<T> {
  // Serializer and deserializer functions can be customized
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  // Optional sync across tabs
  syncTabs?: boolean;
  // Logger for debugging
  logger?: (message: string, error?: unknown) => void;
}

const defaultLogger = (message: string, error?: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[localStorage]: ${message}`, error || "");
  }
};

/**
 * Safe storage operations that handle JSON parsing/stringifying and errors
 */
export const safeStorage = {
  getItem<T>(key: string, fallback: T, deserializer?: (value: string) => T): T {
    if (typeof window === "undefined") {
      return fallback;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return fallback;
      }

      return deserializer ? deserializer(item) : JSON.parse(item);
    } catch (error) {
      defaultLogger(`Error reading ${key} from localStorage`, error);
      return fallback;
    }
  },

  setItem<T>(
    key: string,
    value: T,
    serializer?: (value: T) => string
  ): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      const valueToStore = serializer
        ? serializer(value)
        : JSON.stringify(value);
      window.localStorage.setItem(key, valueToStore);
      return true;
    } catch (error) {
      defaultLogger(`Error writing ${key} to localStorage`, error);
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      defaultLogger(`Error removing ${key} from localStorage`, error);
      return false;
    }
  },
};

/**
 * Hook for managing localStorage values with SSR support and cross-tab synchronization
 * @param key - The localStorage key to store the value under
 * @param initialValue - The initial value if no value is stored
 * @param config - Configuration options for storage behavior
 *
 * Usage example:
 * const [preferences, setPreferences, removePreferences] = useLocalStorage<UserPreferences>(
 *  'user-preferences',
 *  {
 *   theme: 'light',
 *   fontSize: 16,
 *   motionPreference: 'full-motion'
 * },
 * {
 *   syncTabs: true,
 *   logger: (message, error) => {
 *     // Custom logging logic
 *   }
 * }
 * );
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  config: LocalStorageConfig<T> = {}
) {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncTabs = false,
    logger = defaultLogger,
  } = config;

  // Initialize state with a lazy function to avoid unnecessary localStorage access
  const [storedValue, setStoredValue] = useState(() => {
    return safeStorage.getItem<T>(key, initialValue, deserializer);
  });

  // Handle syncing across tabs
  useEffect(() => {
    if (!syncTabs || !canUseDom) return;

    const handleStorageChange = (event: globalThis.StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = deserializer(event.newValue);
          // Only update if value actually changed
          setStoredValue((prev) =>
            JSON.stringify(prev) !== JSON.stringify(newValue) ? newValue : prev
          );
        } catch (error) {
          logger("Error syncing value across tabs", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, deserializer, syncTabs, logger]);

  // Memoize setValue to avoid unnecessary rerenders
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((prev) => {
          // Allow value to be a function so we have same API as useState
          const valueToStore = value instanceof Function ? value(prev) : value;

          // Only update localStorage if value changed
          if (JSON.stringify(prev) !== JSON.stringify(valueToStore)) {
            safeStorage.setItem(key, valueToStore, serializer);
          }

          return valueToStore;
        });
      } catch (error) {
        logger("Error setting value", error);
      }
    },
    [key, serializer, logger]
  );

  const remove = useCallback(() => {
    setStoredValue(initialValue);
    return safeStorage.removeItem(key);
  }, [key, initialValue]);

  return [storedValue, setValue, remove] as const;
}
