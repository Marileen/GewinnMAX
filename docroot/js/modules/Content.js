define([ 'jquery', 'backbone', 'underscore', 'sortElements' ], function( $, Backbone, _ ) {

    return Backbone.View.extend({

        events: {
        },

        initialize: function() {

            var minHeight = $('.header[data-fragment="header/menu"]').height();
            minHeight = (minHeight<400) ? 400 : minHeight+8;
            this.$el.css({ minHeight: minHeight });


            // this is for tables which has to be sortable - tables are defined in FcK Editor, so we
            // don't have a component for it and have to look for table.sort in each Content Controller
            var $tables = $('table.sort', this.$el);

            function parseDate(elem) {

                var dateParts =  $.text([elem]).split('/');

                return new Date(dateParts[1], dateParts[0]-1, 1);
            }

            function isValidDate(d) {
                if ( Object.prototype.toString.call(d) !== "[object Date]" ) {
                    return false;
                }
                return !isNaN(d.getTime());
            }

            $('th', $tables).each(function () {
                var th = $(this),
                    thIndex = th.index(),
                    inverse = true;

                th.click(function () {

                    th.closest('table').find('th').removeClass('active dsc asc');

                    th.closest('table').find('td').filter(function () {

                        return $(this).index() === thIndex;

                    }).sortElements(function (a, b) {

                        var DateA = parseDate(a);
                        var DateB = parseDate(b);

                        if (isValidDate(DateA)) {
                            return DateA > DateB ?
                                inverse ? -1 : 1
                                : inverse ? 1 : -1;
                        }

                        return $.text([a]) > $.text([b]) ?
                            inverse ? -1 : 1
                            : inverse ? 1 : -1;

                    }, function () {

                        // parentNode is the element we want to move
                        return this.parentNode;

                    });

                    th.addClass('active');

                    inverse = !inverse;

                    if (inverse) {
                        th.addClass('asc');
                    }

                });
            });

            //initially sort a table by date column:

            //look in all tables that has sorting functionality
            $tables.each(function () {

                //for all td elements in the first <tr>
                var $firstRowEntries = $(this).find('tbody > tr:first-child td');

                //with each of this td elements
                $firstRowEntries.each(function (index) {

                    //look if it can be parsed to a valid date
                    if ( isValidDate(parseDate($(this))) ) {

                        //if it is, find the th in the same table with the same index
                        var thDefaultSort = $(this).closest('table').find('th')[index]

                        //an trigger its click function
                        $(thDefaultSort).trigger('click');
                    }
                })

            });

        }

    });

});