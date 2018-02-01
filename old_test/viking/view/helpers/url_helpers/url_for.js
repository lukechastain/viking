(function () {
    module("Viking.View.Helpers#urlFor");

    test("urlFor(Class)", function() {
        expect(2);
        
        Workshop = Viking.Model.extend('workshop');
        workshopsPath = function() { ok(true); return '/workshops'; }

        equal(
            urlFor(Workshop),
            window.location.protocol + '//' + window.location.host + '/workshops'
        );
        
        delete Workshop;
        delete workshopsPath;
    });
    
    test("urlFor(new Class())", function() {
        expect(2);
        
        Workshop = Viking.Model.extend('workshop');
        workshopsPath = function() { ok(true); return '/workshops'; }

        equal(
            urlFor(new Workshop()),
            window.location.protocol + '//' + window.location.host + '/workshops'
        );
        
        delete Workshop;
        delete workshopsPath;
    });
    
    test("urlFor(model)", function() {
        expect(2);
        
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { ok(true); return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10})),
            window.location.protocol + '//' + window.location.host + '/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(STIModel)", function() {
        expect(2);
        
        Workshop = Viking.Model.extend('workshop');
        SantaWorkshop = Workshop.extend('santa_workshop');
        workshopPath = function(m) { ok(true); return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new SantaWorkshop({id: 10})),
            window.location.protocol + '//' + window.location.host + '/workshops/10'
        );
        
        delete Workshop;
        delete SantaWorkshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {anchor: STRING})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {anchor: 'location'}),
            window.location.protocol + '//' + window.location.host + '/workshops/10#location'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {onlyPath: true})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {onlyPath: true}),
            '/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {trailingSlash: true})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {trailingSlash: true}),
            window.location.protocol + '//' + window.location.host + '/workshops/10/'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {host: STRING})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {host: 'example.com'}),
            window.location.protocol + '//example.com' + (window.location.port ? ':' : '') + window.location.port + '/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {port: NUMBER})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {port: 9292}),
            window.location.protocol + '//' + window.location.hostname + ':9292/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {protocol: STRING})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {protocol: 'custom'}),
            'custom://' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port + '/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {scriptName: STRING})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {scriptName: '/base'}),
            window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port + '/base/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(class, {user: STRING, password: STRING})", function() {
        Workshop = Viking.Model.extend('workshop');
        workshopPath = function(m) { return '/workshops/' + m.toParam(); }

        equal(
            urlFor(new Workshop({id: 10}), {user: 'username', password: 'password'}),
            window.location.protocol + '//username:password@' + window.location.hostname + (window.location.port ? ':' : '') + window.location.port + '/workshops/10'
        );
        
        delete Workshop;
        delete workshopPath;
    });
    
    test("urlFor(string)", function() {
        equal(
            urlFor("http://www.example.com"),
            "http://www.example.com"
        );
    });
    
}());