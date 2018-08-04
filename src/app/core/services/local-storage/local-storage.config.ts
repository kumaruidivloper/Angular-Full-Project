interface StorageConfig {
  prefix?: string;
  storage?: Storage;
  expire?: number;
}

export const defaultConfig: StorageConfig = {
  prefix: 'jsvs.',
  storage: localStorage,
  expire: 3600
};
