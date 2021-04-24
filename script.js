//Create a parent class
class Animal {
    constructor (_name) {
        this.name = _name;
    }

    makeSound () {
        console.log("Generic Animal Sound!!");
    }
}

//Create a child class
class Dog extends Animal {
    constructor () {
        //Take the "name" property from the parent class
        super(name)
    }

    //Override (redefine) what "makeSound()" does
    makeSound () {
        console.log("Woof! Woof!");
    }
}

const a1 = new Animal("Jackie");
const dog1 = new Dog("Blackie");

a1.makeSound(); //Generic Animal Sound!!
dog1.makeSound(); //Woof! Woof!


