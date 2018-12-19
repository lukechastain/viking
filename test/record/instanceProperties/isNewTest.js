import 'mocha';
import * as assert from 'assert';
import VikingModel from 'viking/model';

describe('Viking.Model#isNewRecord', () => {

    class Model extends VikingModel { }

    it('returns true on a newly istanicated model', () => {
        let model = new Model();
        assert.equal(model.isNewRecord(), true);
    });

    it('returns false on a record returned from the server', function(done) {
        Model.find(12).then((model) => {
            if (model === null) {
                assert.fail("model expected");
                return;
            }
            assert.equal(model.isNewRecord(), false);
        }).then(done, done);

        this.withRequest('GET', '/models', {where: {id: 12}, order: {id: 'desc'}, limit: 1}, (xhr) => {
            xhr.respond(200, {}, '[{"id": 12, "name": "Viking"}]');
        });
    });

    // it('returns false on a new record after saving', function(done) {
    //     Model.find(12).then((model) => {
    //         if (model === null) {
    //             assert.fail("model expected");
    //             return;
    //         }
    //         assert.equal(model.isNewRecord(), false);
    //     }).then(done, done);

    //     this.withRequest('GET', '/models', {where: {id: 12}, order: {id: 'desc'}, limit: 1}, (xhr) => {
    //         xhr.respond(200, {}, '[{"id": 12, "name": "Viking"}]');
    //     });
    // });
});
