define(['jquery', 'underscore', 't8y/services/Upload', 't8y/utils/parser'], function($, _, Upload, parser) {

    return Upload.extend({
        template: '<div class="item" data-file="<%= filename %>">' +
            '<p>' +
                '<span class="btn btn-white loading" disabled><%= loadingMsg %></span>' +
                '<span class="preview"><img src=""><a href="#" class="link"><span class="glyphicon glyphicon-remove"></span><%= deleteMsg %></a></span>' +
                '<span><%= filename %></span>' +
            '</p>' +
        '</div>',

        initialize: function() {
            Upload.prototype.initialize.apply(this, arguments);

            this.pluploader.bind('FilesAdded', _.bind(function(uploader, result) {

                for(var i = 0; i < result.length; i++) {

                    //if (result[i].size > this.$el.data('remaining-size')) {
                        //console.log(this.$el.data('remaining-size')); //todo
                    //}

                    var temp = _.template(this.template)({filename: result[i].name, loadingMsg: this.$el.data('loading-message'), deleteMsg: this.$el.data('delete-message')});
                    $('#files').append(temp);
                }
                //parser.parse($('#files'));
            }, this));

            this.pluploader.bind('FileUploaded', _.bind(function(uploader, result, data) {
                var response = JSON.parse(data.response);
                addPreview(response, this.$el.parent());
                $('.file').closest(".form-group").removeClass("has-error");

            }, this));

            this.pluploader.bind('Error', function(uploader, result, data) {
                console.log( result, arguments );
                var errorCode = result.code;
                $('.file').closest(".form-group").addClass("has-error");
                $('.file .message .text').removeClass("show");
                switch( errorCode ){
                    case -200 :
                        // handle server error
                        if(result.response.indexOf("{") == 0){
                            var serverJson = $.parseJSON(result.response);
                            switch(serverJson.code){
                                case "fileNotFound" :
                                    $('.file .message .error_810').addClass("show");
                                    break;
                                case "fileNotCreated" :
                                    $('.file .message .error_820').addClass("show");
                                    break;
                                case "fileToBig" :
                                    $('.file .message .error_830').addClass("show");
                                    break;
                                default :
                                    $('.file .message .error_800').addClass("show");
                            }
                        } else {
                            // default 200 message
                            $('.file .message .error_200').addClass("show");
                        }
                        break;
                    case -601 :
                        // extension error message
                        $('.file .message .error_601').addClass("show");
                        break;
                    default :
                        // default error message
                        $('.file .message .error').addClass("show");
                        break;
                }
            });

            // fill the progress bar initially
            setProgress(this.$el.data('remaining-size'), this.$el.data('max-file-size'), this.$el.parent());

            //console.log('cc');

            $('#files').on('click', '.preview > a', function(e) {
                var container = $(e.target).closest('.item');
                e.preventDefault();
                $.ajax({
                    url: $(e.target).data('delete-url'),
                    type: 'DELETE',
                    success: function(response) {
                        container.remove();
                        setProgress(response.remainingFileSize, response.totalFileSize, this.$el);
                    }
                })
            });

//            for(var i = 0; i < 3; i++) {
//                var temp = _.template(this.template)({filename: 'HELLo', loadingMsg: this.$el.data('loading-message'), deleteMsg: this.$el.data('delete-message')});
//                $('#files').append(temp);
//            }
//            parser.parse($('#files'));


        }
    });

    function addPreview(response, parent) {
        var container = $('#files > [data-file="' + response.name + '"]');
        container.removeData('file').removeAttr('data-file');
        $('.preview > a', container).data('delete-url', response.deleteURL)

        $('.preview > img', container).one('load', function() {
            $('span.btn', container).hide();
            $('.preview', container).addClass('active')
        }).attr('src', response.thumbnailURL);


        setProgress(response.remainingFileSize, response.totalFileSize, parent);
    }

    function setProgress(remain, total, node) {
        $('.progress > .progress-bar', node).css('width', ((total - remain) / total * 100) + '%');
        //this.$el.data('remaining-size', remain);
    }
});