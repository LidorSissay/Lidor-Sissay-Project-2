class StorageService {
    getData<T>(key: string): T | null {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : null
    }

    setData<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

const storageService = new StorageService()
export default storageService