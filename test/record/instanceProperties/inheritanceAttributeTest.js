import 'mocha';
import * as assert from 'assert';
import VikingModel from 'viking/model';

describe('Viking.Model#inheritanceAttribute', () => {

    it("default to `type`", () => {
        class Ship extends VikingModel { }
        let ship = new Ship();

        assert.equal('type', ship.inheritanceAttribute);
    });

    it("override", () => {
        class Ship extends VikingModel {
            static inheritanceAttribute = 'class_name';
        }
        let ship = new Ship();

        assert.equal('class_name', ship.inheritanceAttribute);
    });

});