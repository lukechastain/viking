function FormBuilder(model, options) {
    options = _.extend({}, options);
    
    this.model = model;
    this.options = options;
}

// TODO: options passed to the helpers can be made into a helper
FormBuilder.prototype = {

    checkBox: function(attribute, options, checkedValue, uncheckedValue, escape) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.checkBox(this.model, attribute, options, checkedValue, uncheckedValue, escape);
    },

    collectionSelect: function(attribute, collection, valueAttribute, textAttribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.collectionSelect(this.model, attribute, collection, valueAttribute, textAttribute, options);
    },

    hiddenField: function(attribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.hiddenField(this.model, attribute, options);
    },
    
    label: function(attribute, content, options, escape) {
        options || (options = {});
        
        //TODO shouldn't options.name be options.for?
        if (!options['for'] && !options.name && this.options.namespace) {
            options['for'] = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
            options['for'] = Viking.View.sanitizeToId(options['for']);
        }
        
        return Viking.View.Helpers.label(this.model, attribute, content, options, escape);
    },
    
    number: function(attribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.numberField(this.model, attribute, options);
    },

    passwordField: function(attribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.passwordField(this.model, attribute, options);
    },
    
    radioButton: function(attribute, tagValue, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.radioButton(this.model, attribute, tagValue, options);
    },
    
    select: function(attribute, collection, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.select(this.model, attribute, collection, options);
    },

    textArea: function(attribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.textArea(this.model, attribute, options);
    },

    textField: function(attribute, options) {
        options || (options = {});
        
        if (!options.name && this.options.namespace) {
            options.name = Viking.View.tagNameForModelAttribute(this.model, attribute, {namespace: this.options.namespace});
        }
        
        return Viking.View.Helpers.textField(this.model, attribute, options);
    },
    
    checkBoxGroup: function(attribute, options, content) {
        if (typeof options === 'function') {
            content = options;
            options = {};
        }

        if (!options.namespace && this.options.namespace) {
            options.namespace = this.options.namespace;
        }

        return Viking.View.Helpers.checkBoxGroup(this.model, attribute, options, content);
    },
    
    fieldsFor: function(attribute, options, content) {
        var builder, modelName;
        
        if (typeof options === 'function') {
            content = options;
            options = {};
        }
        
        if (this.model.get(attribute) instanceof Viking.Collection) {
            var superOptions = this.options;
            var parentModel = this.model;
            return this.model.get(attribute).map(function(model) {
                var localOptions = _.extend({}, options);
                if (!options.namespace) {
                    if (superOptions.namespace) {
                        localOptions.namespace = superOptions.namespace + '[' + attribute + '][' + model.cid + ']';
                    } else {
                        localOptions.namespace = parentModel.baseModel.modelName + '[' + attribute + '][' + model.cid + ']';
                    }
                }
                
                builder = new FormBuilder(model, localOptions);
                
                if (model.id) {
                    return builder.hiddenField('id') + content(builder);
                } else {
                    return content(builder);
                }
            }).join('');
        } else {
            if (!options.namespace) {
                if (this.options.namespace) {
                    options.namespace = this.options.namespace + '[' + this.model.baseModel.modelName + ']';
                } else {
                    options.namespace = this.model.baseModel.modelName;
                }
            }
            
            builder = new FormBuilder(this.model.get(attribute), options);
            return content(builder);
        }

    }
    
};