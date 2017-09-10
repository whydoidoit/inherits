module.exports = function (wallaby) {
    return {
        files: [
            '*.js'
        ],

        tests: [
            'tests/**/*-test.js'
        ],

        testFramework: 'mocha',
        env: {
            type: 'node',
            runner: 'node'  // or full path to any node executable
        }
    };
};
