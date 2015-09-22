(function ($) {
    var Book = Backbone.Model.extend({
        defaults: {
            coverImage: "img/placeholder.png",
            title: "No title",
            author: "Unknown",
            releasedate: '2008-04-30',
            keywords: "None"
        },
        idAttribute: "id"
    });

    var Library = Backbone.Collection.extend({
        url: 'http://localhost:8081/api/books',
        //url: 'https://morning-coast-1696.herokuapp.com/api/books',
        model: Book
    });

    var BookView = Backbone.View.extend({
        tagName: "div",
        className: "bookContainer",
        template: $("#bookTemplate").html(),

        render: function () {
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
            this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this;
        },

        events: {
            "click .delete": "deleteBook"
        },

        deleteBook: function () {
            this.model.destroy();
            this.remove();
        }
    });

    var LibraryView = Backbone.View.extend({
        el: $("#books"),

        events: {
            "click #add": "addBook"
        },

        initialize: function () {
            this.collection = new Library();
            this.collection.fetch({
                error: function () {
                    console.log(arguments);
                }
            });
            this.render();

            this.collection.on("add", this.renderBook, this);
            this.collection.on("reset", this.render, this);
        },

        render: function () {
            var that = this;
            _.each(this.collection.models, function (item) {
                that.renderBook(item);
            }, this);
        },

        renderBook: function (item) {
            var bookView = new BookView({ model: item });
            this.$el.append(bookView.render().el);
        },

        addBook: function (e) {
            e.preventDefault();

            var formData = {};

            $("#addBook").find("div").children("input").each(function (i, el) {
                if ($(el).val() !== "") {
                    formData[el.id] = $(el).val();
                }
            });
            this.collection.create(formData, {wait:true});
        }

    });

    var libraryView = new LibraryView();

})(jQuery);