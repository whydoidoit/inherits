const _ = require('lodash')
require('chai').should()
const inherits = require('../index')

describe('dual-inherits', () => {

    describe("insert construction parameter", () => {
        it("should call a constructor with an extra parameter", () => {

            function A(one, two) {
                if (!one) throw new Error("No first parameter")
                if (!two) throw new Error("No second parameter")
            }

            var B = inherits(function (one) {
            }, A)

            !(() => new B()).should.throw("No first parameter")
            !(() => new B(1)).should.throw("No second parameter")

            var C = inherits(function (one) {

            }, A, (Super, instance, param1) => {
                Super.call(instance, param1, "C")
            })

            var d = new C(1)

            !(() => new C(1)).should.not.throw("No second parameter")
            d.should.be.instanceof(A);


        })
    })

    describe("inherits from", () => {
        it("should have the prototype chain from two separate classes", () => {

            function A() {

            }

            A.prototype.aFunction = function () {
            }

            function B() {

            }

            B.prototype.bFunction = function () {

            }

            var C = inherits(B, Array)

            var D = inherits(A, Array)

            var E = inherits(C, D)

            var e = new E()

            e.aFunction.should.be.a('function')
            e.bFunction.should.be.a('function')
            e.length.should.be.a('number')

        })
        it("should be able to inherit properties from both", () => {

            function A() {
            }

            Object.defineProperty(A.prototype, "readOnly", {
                get: () => "a",
                configurable: false,
                enumerable: false
            })

            function B() {
            }

            Object.defineProperty(B.prototype, "anotherProperty", {
                get: () => "b",
                configurable: false,
                enumerable: false
            })

            var a = new A()
            a.readOnly.should.equal("a")

            var C = inherits(B, Array)

            var D = inherits(A, Array)
            var d = new D()
            d.readOnly.should.equal("a")

            var E = inherits(C, D)

            var e = new E()
            e.readOnly.should.equal('a')

        })
        it("should be able to inherit simple values from both", () => {
            function A() {
            }

            A.prototype.test = "c"

            function B() {
            }

            B.prototype.test2 = "d"

            var C = inherits(B, Array)
            var D = inherits(A, Array)
            var E = inherits(C, D)

            var e = new E()
            e.test.should.equal("c")
            e.test2.should.equal("d")
        })
        it("should have functions from both prototype chains", () => {
            function A() {
            }

            A.prototype.testFunction = function (a) {
                return a + 1
            }

            function B() {
            }

            B.prototype.anotherTestFunction = function (b) {
                return b * 10
            }

            var C = inherits(B, Array)
            var D = inherits(A, String)
            var E = inherits(C, D)

            var e = new E()

            e.testFunction(1).should.equal(2)
            e.anotherTestFunction(2).should.equal(20)
            e.push.should.be.a('function')
            e.push(2)
            e.length.should.equal(1)
            e.splice(e.indexOf(2), 1)
            e.length.should.equal(0)
            e.charCodeAt.should.be.a('function')

        })
    })
})
