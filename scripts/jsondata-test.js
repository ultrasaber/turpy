/*
var testObject = {
    foo: "bar",
    bar: "foo"
}

var testObject2 = {
    foo: "bar2",
    bar: "foo2"
}

var testObject3 = {
    foo: "bar3",
    bar: "foo3"
}

var testObject4 = {
    foo: "bar4",
    bar: "foo4"
}

turpy.writeGlobalData('test', testObject, function() {
    turpy.log('[TEST] Wrote global data');
});

turpy.writeGuildData(0, 'test', testObject2, function() {
    turpy.log('[TEST] Wrote guild data');
});

turpy.writeUserData(0, 'test', testObject3, function() {
    turpy.log('[TEST] Wrote user data');
});

turpy.writeGuildUserData(0, 0, 'test', testObject4, function() {
    turpy.log('[TEST] Wrote guild user data');
});

turpy.readGlobalData('test', function(data) {
    turpy.log('[TEST] Read global data ' + data.foo);
});

turpy.readGuildData(0, 'test', function(data) {
    turpy.log('[TEST] Read guild data ' + data.foo);
});

turpy.readUserData(0, 'test', function(data) {
    turpy.log('[TEST] Read user data ' + data.foo);
});

turpy.readGuildUserData(0, 0, 'test', function(data) {
    turpy.log('[TEST] Read guild user data ' + data.foo);
});
*/