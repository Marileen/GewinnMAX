define(['../types/DomModel', '../types/Point', '../types/Size', '../types/Bounds'], function(DomModel, Point, Size, Bounds) {
    return DomModel.extend({
        defaults: function() {
           return {
               bounds: new Bounds(),
               position: new Point(),
               size: new Size(),
               outerSize: new Size(),
               normalized: {
                   position: new Point()
               }
           }
        }
    });
});