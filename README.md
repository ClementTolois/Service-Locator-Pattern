# Service-Locator-Pattern

## Introduction

The Service-Locator-Pattern is a design pattern that allows you to easily use and manage services. It is a way to create a singleton object that can be used to register and access services. It is a common way to use dependency injection.

This repository contains a simple example of the Service-Locator-Pattern in typescript. You cand find the source code in the `src/` folder. Explainations are provided in the `README.md` file.

Enjoy!

## Prerequisites

For this project I'm using typescript to explain the pattern, however, you can use any language you want. The project is scinded into two parts: the **ServiceLocator** class and the **unit tests**.

## ServiceLocator class

### Private constructor and static property

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