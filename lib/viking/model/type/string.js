const StringType = {

    load: function(value) {
        if (typeof value !== 'string' && value !== undefined && value !== null) {
            return String(value);
        }
        return value;
    },

    dump: function(value) {
        if (typeof value !== 'string' && value !== undefined && value !== null) {
            return String(value);
        }
        return value;
    }

};

export default StringType;
