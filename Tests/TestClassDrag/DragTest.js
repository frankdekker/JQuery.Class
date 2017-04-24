

$(document).ready(function() {

    var start = {};

    new Drag(
        $('#box'),
        {
            snap: 50,
            onBeforeStart: function(element) {
                'use strict';

                start.x = parseInt(element.css('left'));
                start.y = parseInt(element.css('top'));
            },
            onStart: function(element) {
                'use strict';

                element.css('background-color:', '#00FF00');
            },
            onDrag: function(element, currentPoint, startPoint) {
                'use strict';

                var x = start.x - startPoint.x + currentPoint.x;
                //var y = start.y - startPoint.y + currentPoint.y;

                element.css('left', x);
                //element.css('top', y);
            },
            onCancel: function() {
                'use strict';

                console.log('cancel')
            },
            onComplete: function() {
                'use strict';

                console.log('drag complete')
            },
        }
    );
});