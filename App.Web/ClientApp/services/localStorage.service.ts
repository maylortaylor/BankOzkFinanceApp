class LocalStorageService {
    constructor() {
        console.log('creating new instance of localStorage.service');
    }

    deleteHero(key: string) {
        return localStorage.removeItem(key);
    }
    getItem(key: string) {
        return localStorage.getItem(key);
    }
    addItem(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
    updateItem(key: string, value: string) {
        return localStorage.setItem(key, value);
    }
}

export const localStorageService = new LocalStorageService();