var pc = pc || {}

function getPropertyDescriptor(obj, key) {
    if(!obj) return
    let descriptor = Object.getOwnPropertyDescriptor(obj, key)
    if(descriptor) return descriptor
    return getPropertyDescriptor(Object.getPrototypeOf(obj), key)
}

function getAllPropertyNames(obj) {
    var result = Object.getOwnPropertyNames(obj)
    let proto = Object.getPrototypeOf(obj)
    if(proto && proto !== Object.prototype) {
        result = result.concat(getAllPropertyNames(proto))
    }
    return result
}

function inherits(Self, Super, callback) {
    var Temp = function () {};
    var Func = function (arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        if(callback) {
            callback(Super, this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
        } else {
            Super.call(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
        }
        Self.call(this, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);

    };
    Func._super = Super.prototype;

    var mid = function() {}
    mid.prototype = Self.prototype
    var instance = new mid()
    Temp.prototype = Super.prototype;
    Func.prototype = new Temp();
    getAllPropertyNames(instance).forEach( key => {
        if(key === 'constructor' || key.slice(0,2)=='__') return
        var descriptor = getPropertyDescriptor(instance, key)
        if(descriptor) {
            Object.defineProperty(Func.prototype, key, descriptor)
        }
    })

    return Func;
}

pc.inherits = inherits

module.exports = inherits
