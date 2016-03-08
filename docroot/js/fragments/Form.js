define([ 'jquery', 'backbone', 'underscore', 't8y/utils/parser' ], function( $, Backbone, _, T8yParser ) {

    return Backbone.View.extend({

        events: {
            'form:submit': submit,
            'form:validField': validField,
            'form:validForm': validForm
        },

        types: {
            'email': /^[-a-zßäöü0-9~!$%^&*_=+.]+@([-a-zßäöü0-9~!$%^&*_=+]+\.)+[-a-zßäöü0-9~!$%^&*_=+]{2,10}$/i
        },

        validForm: true,

        initialize: function() {

            //Klasse auf body tag setzen wenn data-module="form/register"
            if (this.$el.closest('.register[data-module="form/register"]').length > 0) {
                $('body').addClass('hasRegisterForm');
                $('body .btn.btn-blue.btn-home').remove();
                $('body').prepend('<a class="btn btn-blue btn-home" href="/"><span>Zurück zur Startseite</span></a>');
            }

            this.submit = this.$el.find('[type=submit]');
            this.reset = this.$el.find('[type=reset]');
            this.fields = this.$el.find('.form-control');
            this.ajaxurl = this.$el.attr('data-ajax');
            this.target = this.$el.attr('data-content-target');
            this.inlineValidation = this.$el.attr('data-inline-validation');

            if( this.inlineValidation ){
                $.each( $(this.fields), _.bind( function( index, control ){

                    // placeholder for IE
                    if( $("html").hasClass("lte9") && $(control).attr("placeholder") ) {
                        var placeholder = $('<span class="ie-placeholder">'+$(control).attr("placeholder")+'</span>');
                        if($(control).val().length > 0){
                            placeholder.addClass("hasValue");
                        }
                        // hover - hide placeholder
                        $(control).closest(".field").hover(function(){
                            placeholder.addClass("hide");
                        }, function(){
                            placeholder.removeClass("hide");
                        });
                        // keypress - hide placeholder
                        $(control).on('keyup', _.bind( function( event ){
                            if($(control).val().length > 0){
                                placeholder.addClass("hasValue");
                            } else {
                                placeholder.removeClass("hasValue");
                            }
                        }, this ));
                        $(control).after(placeholder);
                    }

                    // on enter valid field, not form
                    if( this.$el.attr('data-stop-submit-on-enter') == "true" ){
                        $(control).keypress( _.bind( function( event ){
                            if( event.which == 13 ){
                                event.preventDefault();
                                this.$el.trigger( $.Event('form:validField', { el: $(control) }));
                            }
                        }, this ));
                    }

                    // required field
                    if( $(control).attr('required') ){
                        // hide html5 Bubblemessage
                        $(control).on("invalid", function( event ){
                            event.preventDefault();
                        });
                        if(control.type.indexOf("select") >= 0){
                            $(control).parent().on('click', _.bind( function( event ){
                                if($(control).parent().hasClass("leave")){
                                    this.$el.trigger( $.Event('form:validField', { el: $(control) }));
                                }
                            }, this ));
                        } else {
                            // valid field on blur
                            $(control).on('blur', _.bind( function( event ){
                                this.$el.trigger( $.Event('form:validField', { el: $(control) }));
                            }, this ));
                            // valid field on keypress
                            if( $(control).attr('data-valid-on-keypress') ){
                                $(control).on('keyup', _.bind( function( event ){
                                    this.$el.trigger( $.Event('form:validField', { el: $(control) }));
                                }, this ));
                            }
                        }
                    }
                }, this ));
            }

            this.reset.on("click", _.bind( function( event ){
                this.$el.find('.form-group').removeClass("has-error has-success");
            }, this ));

            this.submit.on("click", _.bind( function( event ){
                event.preventDefault();
                this.$el.trigger( $.Event('form:validForm', { el: this.$el }));
            }, this ));

            if( this.$el.attr("data-validate-onload") == "true" ){
                window.setTimeout(_.bind( function(){
                    this.$el.trigger( $.Event('form:validForm', { el: this.$el, firstCheck: true }));
                }, this),1);
            }

        }

    });

    // validField
    function validField( event ){
        var validField = true;

        // password fields
        if( $(event.el).attr("data-equal") ){
            var a = isValid( $(event.el).val() );
            var id = $(event.el).attr("data-equal");
            var equal = $(this.el).find( id );
            var b = isValid( equal.val() );
            // nur dann validieren, wenn ins zweite was eingegeben wird
            if( (a.length > 0 && b.length > 0) || (!a) ){
                if( a && b && a == b ){
                    validField = (makeClass( event.el, $(event.el).val() )) ? validField : false;
                    validField = (makeClass( equal, equal.val() )) ? validField : false;
                } else {
                    validField = (makeClass( event.el, false )) ? validField : false;
                    validField = (makeClass( equal, false )) ? validField : false;
                }
            }

        // select field
        } else if(event.el.get(0).type.indexOf("select") >= 0) {
            var selected = $('option:selected', event.el );
            validField = makeClass( event.el, selected.attr("value") );

        // radio or checkbox field
        } else if( event.el.get(0).type.indexOf("radio") >= 0 || event.el.get(0).type.indexOf("checkbox") >= 0 ){
            var name = $(event.el).attr("name");
            validField = makeClass( event.el, $('input[name='+name+']:checked').val() );

        // input
        } else {
            var type = ($(event.el).attr("data-type")) ? $(event.el).attr("data-type") : $(event.el).attr("type");
            switch( type ) {
                case "email" :
                    validField = makeRegexClass( event.el, this.types["email"], $(event.el).val() );
                    break;
                case "hidden" :
                    if($(event.el).attr("required")){
                        // check upload require file
                        var items = $('.files .item');
                        if( $(event.el).hasClass("upload") && items && items.length > 0 ){
                            $(event.el).val( items.length );
                        } else {
                            $(event.el).val("");
                            $('.file .message .error_100').addClass("show");
                        }
                        validField = makeClass( event.el, $(event.el).val() );
                    }
                    break;
                default :
                    validField = makeClass( event.el, $(event.el).val() );
            }
            // double check (plz und ort)
            var checkTarget = ($(event.el).attr("data-check-target")) ? ($(event.el).attr("data-check-target")) : false;
            if(checkTarget){
                if(validField){
                    validField = makeClass( event.el, $('.form-control[name="'+checkTarget+'"]').val() );
                }
            }
        }
        this.validForm = (validField) ? this.validForm : false;
    }

    // validRegex
    function validRegex( type, value ) {
        var re = type;
        return re.test( value );
    }

    // validForm
    function validForm( form ){
        if( !form.firstCheck ){
            var form = (form.el) ? form.el : form;
            this.validForm = true;
            $.each( $('.form-control[required]',form), _.bind( function( index, entry ){
                form.trigger( $.Event('form:validField', { el: $(entry) }));
            }, this ));
            if(this.validForm){
                form.trigger( $.Event('form:submit', { el: form }));
            } else {
                // form scroll on error on top
                if( form.attr('data-scrolltop-on-error') == "true" ){
                    $("html, body").animate({ scrollTop: form.offset().top },500,function(){});
                }
            }
        }
    }

    // isValid
    function isValid( value ){
        return ( value && value.length > 0 ) ? value : false;
    }

    // makeClass
    function makeClass( entry, value ){
        if( isValid(value) ){
            $(entry).closest(".form-group").removeClass("has-error").addClass("has-success");
            return true;
        } else {
            $(entry).closest(".form-group").removeClass("has-success").addClass("has-error");
            return false;
        }
    }

    // makeClass
    function makeRegexClass( entry, type, value ){
        if( validRegex( type, value ) ){
            $(entry).closest(".form-group").removeClass("has-error").addClass("has-success");
            return true;
        } else {
            $(entry).closest(".form-group").removeClass("has-success").addClass("has-error");
            return false;
        }
    }

    // submit
    function submit( event ){
        this.$el.find('#page').val(1);
        if(this.ajaxurl) {
            $.ajax({
                url: this.ajaxurl,
                target: this.target,
                data: this.$el.serializeArray(),
                method: (this.$el.attr("method")) ? this.$el.attr("method") : "POST",
                dataType: 'html'
            }).done(function( data ){
                if( $(this.target).hasClass("endlessScroll") ){
                    var length = ( data.length > 4 ) ? $('.col',data).length : 0;
                    if( length > 0 ){
                        $(this.target).removeClass("done");
                        $('.inner',this.target).empty().append( data );
                        T8yParser.parse($('.inner',this.target));
                    } else {
                        $(this.target).addClass("done");
                    }
                } else {
                    $(this.target).attr("data-current-page",1);
                    $(this.target).removeClass("done");
                    $('.inner',this.target).empty().append( data );
                }
            });
        } else {
            this.$el.submit();
        }
    }

});