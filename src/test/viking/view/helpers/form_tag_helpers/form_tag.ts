import * as Backbone from 'backbone';
import 'qunit';
import * as sinon from 'sinon';

const { module, test, assert } = QUnit;

import { Viking } from '../../../../../viking';

module('Viking.View.Helpers#form_tag', {}, () => {

    // formTag(options, [&content])
    // =============================
    test("formTag()", function() {
        assert.equal(Viking.View.Helpers.formTag(), "<form>");
    });
    
    test("formTag({action: URL})", function() {
        assert.equal(Viking.View.Helpers.formTag({action: '/action'}), '<form action="/action" method="post">');
    });
    
    test("formTag({action: URL, method: METHOD})", function() {
        assert.equal(Viking.View.Helpers.formTag({action: '/action', method: 'get'}), '<form action="/action" method="get">');
    });
    
    test("formTag({action: URL, method: NON_BROWSER_METHOD})", function() {
        assert.equal(Viking.View.Helpers.formTag({action: '/action', method: 'put'}), '<form action="/action" method="post"><input name="_method" type="hidden" value="put">');
    });
    
    test("formTag({multipart: true})", function() {
        assert.equal(Viking.View.Helpers.formTag({multipart: true}), '<form enctype="multipart/form-data">');
    });
    
    test("formTag(content)", function() {
        assert.equal(Viking.View.Helpers.formTag('data'), "<form>data</form>");
    });
    
    test("formTag(emptyContent)", function() {
        assert.equal(Viking.View.Helpers.formTag(''), "<form></form>");
    });
    
    test("formTag(content, options)", function() {
        assert.equal(Viking.View.Helpers.formTag('data', {action: '/action', method: 'get'}), '<form action="/action" method="get">data</form>');
    });
    
    test("formTag(contentFunc, options)", function() {
        var contentFunc = function() { return 'data'; };
        
        assert.equal(Viking.View.Helpers.formTag(contentFunc, {action: '/action', method: 'get'}), '<form action="/action" method="get">data</form>');
    });
    
    test("formTag(options, content)", function() {
        assert.equal(Viking.View.Helpers.formTag({action: '/action', method: 'get'}, 'data'), '<form action="/action" method="get">data</form>');
    });
    
    test("formTag(options, contentFunc)", function() {
        var contentFunc = function() { return 'data'; };
        
        assert.equal(Viking.View.Helpers.formTag({action: '/action', method: 'get'}, contentFunc), '<form action="/action" method="get">data</form>');
    });
    
    test("formTag(content, {method: NON_BROWSER_METHOD})", function() {
        assert.equal(Viking.View.Helpers.formTag('data', {method: 'put'}), '<form method="post"><input name="_method" type="hidden" value="put">data</form>');
    });
    
    
});