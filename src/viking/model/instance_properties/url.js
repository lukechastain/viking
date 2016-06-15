// Default URL for the model's representation on the server
export const url = function() {
    let base =
      _.result(this, 'urlRoot') ||
      _.result(this.collection, 'url') ||
      urlError();

    if (this.isNew()) return base;
        
    return base.replace(/([^\/])$/, '$1/') + this.toParam();
};