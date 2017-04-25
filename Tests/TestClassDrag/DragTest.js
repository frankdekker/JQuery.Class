
//
// var DragTest = new Class({
//
//     drag: null,
//
//     initialize: function(element, options) {
//
//         this.drag = new Drag(element, )
//     },
//
// });

$(document).ready(function() {

    var start = {};

    new Drag(
        $('#box1'),
        {
            snap: 50,
            onBeforeStart: function(element) {
                'use strict';

                start.x = parseInt(element.css('left'));
                start.y = parseInt(element.css('top'));
                element.css('background-color', '#008700');
                console.log('beforeStart');
            },
            onStart: function(element) {
                'use strict';

                element.css('background-color', '#00FF00');
                console.log('start');
            },
            onDrag: function(element, currentPoint, startPoint) {
                'use strict';

                var x = start.x - startPoint.x + currentPoint.x;
                element.css('left', x);
            },
            onCancel: function(element) {
                'use strict';

                element.css('background-color', '#003f00');
                console.log('cancel')
            },
            onComplete: function(element) {
                'use strict';

                element.css('background-color', '#003f00');
                console.log('drag complete')
            }
        }
    );
});