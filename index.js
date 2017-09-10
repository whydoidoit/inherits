function getPropertyDescriptor(obj, key) {
    if(!obj) return
    let descriptor = Object.getOwnPropertyDescriptor(obj, key)
    if(descriptor) return descriptor
    return getPropertyDescriptor(obj.__proto__, key)

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

    for(var key in instance) {
        var descriptor = getPropertyDescriptor(Self.prototype, key)
        if(descriptor) {
            Object.defineProperty(Func.prototype, key, descriptor)
        } else {
            Func.prototype[key] = Self.prototype[key]
        }
    }


    return Func;
}

pc.inherits = inherits

export default inherits
