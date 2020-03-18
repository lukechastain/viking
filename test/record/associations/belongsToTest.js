import * as assert from 'assert';
import 'mocha';
import VikingRecord from 'viking/record';
import { belongsTo } from 'viking/record/associations';

describe('Viking.Record::associations', () => {

    describe('belongsTo(Parent)', () => {
        class Parent extends VikingRecord { }
        class Model extends VikingRecord {
            static associations = [belongsTo(Parent)];
        }

        it("load association", function(done) {
            let model = new Model({parent_id: 24});

            model.parent.then((model) => {
                assert.ok(model instanceof Parent);
                assert.equal(model.readAttribute('id'), 24);
                assert.equal(model.readAttribute('name'), 'Viking');
            }).then(done, done);
            this.withRequest('GET', '/parents', {where: {id: 24}, order: {id: 'desc'}, limit: 1}, (xhr) => {
                xhr.respond(200, {}, '[{"id": 24, "name": "Viking"}]');
            });
        });

        it("doesn't send query if not foriegnKey present", function(done) {
            let model = new Model();

            model.parent.then((model) => {
                assert.strictEqual(model, null);
            }).then(done, done);
            assert.equal(this.requests.length, 0);
        });

        describe('assigning the association', () => {
            it('to a model with an id', function(done) {
                let model = new Model();
                let parent = new Parent({id: 13});
                model.parent = parent;

                assert.equal(model.readAttribute('parent_id'), 13);
                assert.ok(model._associations.parent.loaded);
                assert.strictEqual(model._associations.parent.target, parent);
                model.parent.then((model) => {
                    assert.strictEqual(model, parent);
                    done();
                });
                assert.equal(this.requests.length, 0);
            });

            it('to a model without an id', function(done) {
                let model = new Model();
                let parent = new Parent();
                model.parent = parent;

                assert.equal(model.readAttribute('parent_id'), null);
                assert.ok(model._associations.parent.loaded);
                assert.strictEqual(model._associations.parent.target, parent);
                model.parent.then((model) => {
                    assert.strictEqual(model, parent);
                    done();
                });
                assert.equal(this.requests.length, 0);
            });

            it('to null', function(done) {
                let model = new Model();
                model.parent = null;

                assert.equal(model.readAttribute('parent_id'), null);
                assert.ok(model._associations.parent.loaded);
                assert.strictEqual(model._associations.parent.target, null);
                model.parent.then((model) => {
                    assert.strictEqual(model, null);
                    done();
                });
                assert.equal(this.requests.length, 0);
            });
        });
    });

    describe('belongsTo(Parent, {foriegnKey: KEY})', () => {
        class Parent extends VikingRecord { }
        class Model extends VikingRecord {
            static associations = [belongsTo(Parent, {foreignKey: 'parental_id'})];
        }

        it("load association", function(done) {
            let model = new Model({parental_id: 24});

            model.parent.then((model) => {
                assert.ok(model instanceof Parent);
                assert.equal(model.readAttribute('id'), 24);
                assert.equal(model.readAttribute('name'), 'Viking');
            }).then(done, done);
            this.withRequest('GET', '/parents', {where: {id: 24}, order: {id: 'desc'}, limit: 1}, (xhr) => {
                xhr.respond(200, {}, '[{"id": 24, "name": "Viking"}]');
            });
        });

        describe('assigning the association', () => {
            it('to a model with an id', function(done) {
                let model = new Model();
                let parent = new Parent({id: 13});
                model.parent = parent;

                assert.equal(model.readAttribute('parental_id'), 13);
                assert.ok(model._associations.parent.loaded);
                assert.strictEqual(model._associations.parent.target, parent);
                model.parent.then((model) => {
                    assert.strictEqual(model, parent);
                    done();
                });
                assert.equal(this.requests.length, 0);
            });
        });
    });

    // Model.reflectOnAssociation('parent');

    // test("::new('children', { modelName: 'Region' })", function () {
    //     let Region = Viking.Model.extend();
    //     Viking.context['Region'] = Region;
    //     var assocation = new Viking.Model.BelongsToReflection('parent', { modelName: 'Region' });

    //     assert.equal(assocation.name, 'parent');
    //     assert.equal(assocation.macro, 'belongsTo');
    //     assert.deepEqual(assocation.options, { modelName: 'Region' });
    //     assert.deepEqual(assocation.modelName, new Viking.Model.Name('Region'));

    //     delete Viking.context['Region'];
    // });

    // test("::new('subject', {polymorphic: true})", function () {
    //     let Photo = Viking.Model.extend();
    //     Viking.context['Photo'] = Photo;
    //     var assocation = new Viking.Model.BelongsToReflection('subject', { polymorphic: true });
    //     assert.equal(assocation.macro, 'belongsTo');
    //     assert.equal(assocation.name, 'subject');
    //     assert.deepEqual(assocation.options, { polymorphic: true });
    //     assert.equal(assocation.modelName, undefined);

    //     delete Viking.context['Photo'];
    // });

});