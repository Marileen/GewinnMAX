define(['module', 'underscore', '../types/Controller', 'plupload'], function(module, _, Controller) {

    var config = {
        url: '',
        runtimes : 'html5,flash,silverlight,html4',
        unique_names: true,
        flash_swf_url : module.config().flash ,
        silverlight_xap_url : module.config().silverlight,
        filters: {
            mime_types : [
                { title : "Image files", extensions : "jpg,png" }
            ],
            max_file_size: 0,
            prevent_duplicates: false
        },
        resize: {
            width: null,
            height: null,
            crop: false,
            quality: 70
        },
        init: {}
    };

    return Controller.extend({

        events: function() {
            return {
                'click': onClick
            }
        },

        initialize: function() { console.log('hello');
            Controller.prototype.initialize.apply(this, arguments);
            config.browse_button = this.el;
            config.url = this.$el.attr('href');
            config.filters.max_file_size = this.$el.data('max-file-size') || config.filters.max_file_size;
            config.filters.prevent_duplicates = this.$el.data('prevent-duplicates') || config.filters.prevent_duplicates;
            config.resize.width = this.$el.data('max-image-size') || config.resize.width;
            config.resize.height = this.$el.data('max-image-size') || config.resize.height;

            this.pluploader = new plupload.Uploader(config);
            this.pluploader.init();
            this.pluploader.bind('FilesAdded', _.bind(function() {
                this.pluploader.start();
            }, this));
        }
    });

    function onClick(e) {
        e.preventDefault();
    }
});