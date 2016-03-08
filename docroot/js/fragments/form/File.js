define([ 'jquery', 'backbone', 'underscore', 'jquery.fileupload' ], function ($, Backbone, _) {

    return Backbone.View.extend({

        events: {
        },

        initialize: function () {

            // Change this to the location of your server-side upload handler:
            console.log(this.$el.attr("data-upload-url"));


            var url = this.$el.attr("data-upload-url"),
                that = this,
                uploadButton = $('<span/>')
                    .addClass('btn btn-white loading')
                    .prop('disabled', true)
                    .text( this.$el.attr('data-loading-message') )
                    .on('click', function () {
                        var $this = $(this),
                            data = $this.data();
                        $this
                            .off('click')
                            .text( that.$el.attr('data-abort-message') )
                            .on('click', function () {
                                $this.remove();
                                data.abort();
                            });
                        data.submit().always(function () {
                            $this.remove();
                        });
                    });
            $('#fileupload').fileupload({
                url: url,
                dataType: 'json',
                autoUpload: false,
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                maxFileSize: 5000000, // 5 MB
                // Enable image resizing, except for Android and Opera,
                // which actually support image resizing, but fail to
                // send Blob objects via XHR requests:
                disableImageResize: /Android(?!.*Chrome)|Opera/
                    .test(window.navigator.userAgent),
                previewMaxWidth: 100,
                previewMaxHeight: 100,
                previewCrop: true
            }).on('fileuploadadd',function (e, data) {
                console.log('file: fileuploadadd !!!');
                data.context = $('<div/>').appendTo('#files');
                $.each(data.files, function (index, file) {
                    var node = $('<p/>')
                        .append($('<span/>').text(file.name));
                    if (!index) {
                        node
                            .append('<br>')
                            .append(uploadButton.clone(true).data(data));
                    }
                    node.appendTo(data.context);

                    //file wegschicken

                    $.ajax({
                        url: url,
                        type: 'POST',
                        data: file,
                        contentType: "multipart/form-data",
                        processData: false
                    });
                });
            }).on('fileuploadprocessalways',function (e, data) {
                console.log('file: fileuploadadd');
                var index = data.index,
                    file = data.files[index],
                    node = $(data.context.children()[index]);
                if (file.preview) {
                    node
                        .prepend('<br>')
                        .prepend(file.preview);
                }
                if (file.error) {
                    node
                        .append('<br>')
                        .append($('<span class="text-danger"/>').text(file.error));
                }
                if (index + 1 === data.files.length) {
                    data.context.find('button')
                        .text('Upload')
                        .prop('disabled', !!data.files.error);
                }
            }).on('fileuploadprogressall',function (e, data) {
                console.log('file: fileuploadprogressall');
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('#progress .progress-bar').css(
                    'width',
                    progress + '%'
                );
            }).on('fileuploaddone',function (e, data) {
                console.log('file: fileuploaddone');
                $.each(data.result.files, function (index, file) {
                    if (file.url) {
                        var link = $('<a>')
                            .attr('target', '_blank')
                            .prop('href', file.url);
                        $(data.context.children()[index])
                            .wrap(link);
                    } else if (file.error) {
                        var error = $('<span class="text-danger"/>').text(file.error);
                        $(data.context.children()[index])
                            .append('<br>')
                            .append(error);
                    }
                });
            }).on('fileuploadfail',function (e, data) {
                console.log('file: fileuploadfail');
                $.each(data.files, function (index, file) {
                    var error = $('<span class="text-danger"/>').text( that.$el.attr('data-error-message') );
                    $(data.context.children()[index])
                        .append('<br>')
                        .append(error);
                });
            }).prop('disabled', !$.support.fileInput)
            .parent().addClass($.support.fileInput ? undefined : 'disabled');
        }

    });

});