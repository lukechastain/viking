import { numberFieldTag } from '../form_tag_helpers';
import { addErrorClassToOptions, tagNameForModelAttribute } from '../utils';

// numberField(model, attribute, options)
// ======================================
//
// Returns an input tag of the "number" type tailored for accessing a specified
// attribute on the model. Additional options on the input tag can be passed as
// a hash with options. These options will be tagged onto the HTML as an HTML
// element attribute as in the example shown.
//
// Examples
// --------
//   numberField(user, 'age', {min: 0, max: 100})
//   // => <input id="user_age" name="user[age]" type="number" value="27">
//   
//   numberField(account, 'requests', {class: "form_input"})
//   // => <input class="form_input" id="account_requests" name="account[requests]" type="number" value="27">
export const numberField = function (model, attribute, options) {
    options = _.extend({}, options);
    let name = options.name || tagNameForModelAttribute(model, attribute);

    addErrorClassToOptions(model, attribute, options);
    
    return numberFieldTag(name, model.get(attribute), options);
};

export default numberField;