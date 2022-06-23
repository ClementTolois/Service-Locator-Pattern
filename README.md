# Service-Locator-Pattern

## Introduction

The Service-Locator-Pattern is a design pattern that allows you to easily use and manage services. It is a way to create a singleton object that can be used to register and access services. It is a common way to use dependency injection.

This repository contains a simple example of the Service-Locator-Pattern in typescript. You cand find the source code in the `src/` folder. Explainations are provided in the `README.md` file.

Enjoy!
## Prerequisites
For this project I'm using typescript to explain the pattern, however, you can use any language you want. The project is scinded into two parts: the **ServiceLocator** class and the **unit tests**.
## ServiceLocator class
### Private constructor and static property
The first step is to create a private constructor and a static property. The constructor is private because we don't want to allow anyone to create an instance of the ServiceLocator class. The static property is used to store the **single instance** of the ServiceLocator class.

The goal of using only one instance of the ServiceLocator class is to share the same references of the registered services everywhere in the application.

The first time the `ServiceLocator.getInstance()` static method is called, it will create the single instance and store it in the static property. The next time it will return the same instance.

```typescript
class ServiceLocator {
    private static _instance: ServiceLocator;
    
    private constructor() {
        this._services = {};
    }

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator._instance) {
            ServiceLocator._instance = new ServiceLocator();
        }
        return ServiceLocator._instance;
    }
}
```
### Register end get service
The second step is to create a method to register a service and a method to get a service.

The register method takes a service name and a service object as parameters. The service object can be any object, string, class...It is stored in the private `_services` property of the ServiceLocator class. The property is private to avoid anyone to modify it.

To access a service, you must call the `getService` method with the name of the service as parameter.
```typescript
class ServiceLocator {
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
    
    public registerService(name: string, service: unknown): void {
        this._services[name] = service;
    }
    
    public getService(name: string): unknown {
        return this._services[name];
    }
}
```
### Avoid errors
The last step, very important in typescript is to avoid errors. The register method throws an error if the service name is already registered. The getService method throws an error if the service name is not registered.

```typescript
class ServiceLocator {
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
        if (!this._services[key]) {
            throw new Error(`Service with key ${key} does not exist`);
        }
        return this._services[key];
    }
}
``` 
