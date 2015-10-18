define(['module', 'jquery'], function (module, $) {
    return ({
        "rest":     {
            // define mapping in script.handlebars
        },
        initialize: function () {

            //check for global definition
            if( window.hueck && window.hueck.rest ){
                $.extend( this.rest, window.hueck.rest );
            } else {
                console.log('RestModel: could not find REST Definition');
            }
            return this;

        },
        request: function( method, data, cbsuccess, cberror ){

            var apimethod = this.rest[method];
            if (!apimethod) {
                console.log('RestModel: could not find API Method', method);
                return;
            }
            $.ajax({
                type:     apimethod.type,
                url:      apimethod.url + data.href,
                dataType: apimethod.dataType,
                success:  function( response ){
                    var data = (typeof response =='object') ? response : $.parseJSON(response);
                    var success = false;
                    switch( data.status.toString() ){
                        case "true":
                            success = true;
                            break;
                        case "added":
                            success = true;
                            break;
                        case "basketFull":
                            success = false;
                            break;
                        case "documentAlreadyExists":
                            success = false;
                            break;
                        case "documentIsNull":
                            success = false;
                            break;
                    }
                    data.success = success;

                    if( success ){
                        if( cbsuccess ){
                            cbsuccess( data );
                        }
                        //trigger data via event for observer
                        $(document).trigger(apimethod, data);
                    } else {
                        if( cberror ){
                            cberror( data );
                        } else {
                            console.log('RestModel: Error cannot handle response', response, data);
                        }
                    }
                },
                data: data,
                error: function( response ){
                    cberror(data);
                }
            });

        }
    }).initialize();
});
          