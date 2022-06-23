export default class ServiceLocator {
    private static _instance: ServiceLocator;
    private _services: { [key: string]: unknown };
    
    private constructor() {
        this._services = {};
    }
    
    public static getInstance(): ServiceLocator {
        if (!ServiceLocator._instance) {
            ServiceLocator._instance = new ServiceLocator();
        }
        return ServiceLocator._instance;
    }
    public register(key: string, service: unknown): void {
        if (this._services[key]) {
            throw new Error(`Service with key ${key} already exists`);
        }
        this._services[key] = service;
    }
    
    public get(key: string): unknown {
        return this._services[key];
    }
}
