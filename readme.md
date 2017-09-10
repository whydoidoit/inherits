### Introduction

Creates a Javascript prototypical inheritance from one class to another with 
added features.  

Firstly a callback is made during the construction cycle to 
allow the injection of additional parameters into a super class constructor. If 
supplied the callback is responsible for calling the super class constructor
and is passed a reference to it.

Secondly the prototype chain of *both* classes is merged into the resulting prototype.
This includes the mapping of property descriptors from both.

### Installation

```language-shell
npm install --save javascript-dual-inherit
```

### Usage

```language-javascript
import inherits from 'javascript-dual-inherit'

...

var someImportantModuleParameter = "secret";

var MyObject = inherits(function MyObject(someParameter) {
    this.param = someParameter;
}, SomeOtherClass, (Super, instance, someParameter) =>{
    Super.call(instance, someImportantModuleParameter, someParameter);
});
 
...
 
var myObjectInstance = new MyObject("Hello");

```

### Parameters

`inherits(ClassConstructor, SuperClass, [callback])`

`ClassConstructor` the sub class

`SuperClass` the super class to inherit from

`callback` an optional callback function which is passed a series of parameters:

>`function callback(Super, instance, param1, param2, param3...)`
>
>`Super` the super class to call
>
>`instance` the newly constructed instance that should be initialized by the 
superclass
>
>`param1` etc, the parameters used to call the sub class constructor


