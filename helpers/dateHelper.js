module.exports = function () {
    return {
        getNow: function () {
            return this.now || this.getDate();
        },

        getDate: function () {
            return new Date();
        }
    };
};