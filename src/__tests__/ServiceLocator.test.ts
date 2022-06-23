import ServiceLocator from "../ServiceLocator";

const serviceLocator = ServiceLocator.getInstance();

describe("Basic service locator process", () => {
    test("ServiceLocator must provide an instance of itself", () => {
        expect(serviceLocator).toBeInstanceOf(ServiceLocator); 
    });
    
    test("ServiceLocator must register a basic service", () => {
        serviceLocator.register("test", "test");
        expect(serviceLocator.get("test")).toBe("test");
    });
    
    test("ServiceLocator must throw an error if registering a service with an already existing key", () => {
        expect(() => serviceLocator.register("test", "test")).toThrow();
    }); 

    test("ServiceLocator must throw an error if getting a service with an unknown key", () => {
        expect(() => serviceLocator.get("unknown_service")).toThrow();
    });
});

describe("Service locator with a concrete user service", () => {
    class User {
        private _name: string;
        public constructor(name: string) {
            this._name = name;
        }
        get name(): string {
            return this._name;
        }
    }
    
    class UserService {
        private _users: User[];
        public constructor() {
            this._users = [];
        }
        public addUser(user: User): void {
            this._users.push(user);
        }
        public getUsers(): User[] {
            return this._users;
        }
        public getUser(name: string): User|undefined {
            return this._users.find((user:User) => user.name === name);
        }
    }

    test("ServiceLocator must register a concrete user service", () => {
        serviceLocator.register("userService", new UserService());
        expect(serviceLocator.get("userService")).toBeInstanceOf(UserService);
    });

    test("ServiceLocator must add a user to the user service", () => {
        const userService = serviceLocator.get("userService") as UserService;
        userService.addUser(new User("John"));
        expect(userService.getUsers().length).toBe(1);
        const user = userService.getUser("John");
        expect(user?.name).toBe("John");
    });
});