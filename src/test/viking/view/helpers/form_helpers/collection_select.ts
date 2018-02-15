import * as Backbone from 'backbone';
import 'qunit';
import * as sinon from 'sinon';

const { module, test, assert } = QUnit;

import { Viking } from '../../../../../viking';

let model: any;
module('Viking.View.Helpers#collection_select', {
    beforeEach: function() {
        let Model = Viking.Model.extend("model");
        model = new Model();
    }
}, () => {
    // collectionSelect(model, attribute, collection, valueAttribute, textAttribute, options)
    // ====================================================================================
    test("collectionSelect(model, attribute, collection, valueAttribute, textAttribute)", function() {
        let Post = Viking.Model.extend('post', {
            belongsTo: ['author']
        });
        
        let Author = Viking.Model.extend('author', {
          nameWithInitial: function() {
              return this.get('first_name')[0] + '. ' + this.get("last_name");
          }
        });

        let AuthorCollection = Viking.Collection.extend({
            model: Author
        });
                
        var post = new Post();
        var authors = new AuthorCollection([{id: 1, first_name: 'Jon', last_name: 'Bracy'},{id: 2, first_name: "Daniel", last_name: "O'Shea"}]);
        assert.equal( Viking.View.Helpers.collectionSelect(post, 'author_id', authors, 'id', 'nameWithInitial', {prompt: true}),
               '<select id="post_author_id" name="post[author_id]"><option value="">Select</option><option value="1">J. Bracy</option>\n<option value="2">D. O&#x27;Shea</option></select>');
    });
    
    test("collectionSelect(model, attribute, collection, valueAttribute, textAttribute) allows html name attribute to be overridden", function() {
        let Post = Viking.Model.extend('post', {
            belongsTo: ['author']
        });
        
        let Author = Viking.Model.extend('author', {
          nameWithInitial: function() {
              return this.get('first_name')[0] + '. ' + this.get("last_name");
          }
        });

        let AuthorCollection = Viking.Collection.extend({
            model: Author
        });
                
        var post = new Post();
        var authors = new AuthorCollection([{id: 1, first_name: 'Jon', last_name: 'Bracy'},{id: 2, first_name: "Daniel", last_name: "O'Shea"}]);
        assert.equal( Viking.View.Helpers.collectionSelect(post, 'author_id', authors, 'id', 'nameWithInitial', {name: 'overridden'}),
               '<select id="overridden" name="overridden"><option value="1">J. Bracy</option>\n<option value="2">D. O&#x27;Shea</option></select>');
    });
    
});