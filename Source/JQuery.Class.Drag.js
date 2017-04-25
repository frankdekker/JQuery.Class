(function () {

    /**
     * Class to handle drag movements
     *
     * @class
     */
    this.Drag = new Class({
        Extends: [Events, Options],

        /**
         * @var {jQuery}
         */
        element: null,

        /**
         * @var {Object}
         */
        options: {
            snap: 10,
            preventDefault: false,
            stopPropagation: false
            // onBeforeStart: function(element, point, event) {},
            // onStart:       function(element, point, event) {},
            // onDrag:        function(element, point, start, event) {},
            // onCancel:      function(element, point, start, event) {},
            // onComplete:    function(element, poinst, start, event) {},
        },

        /**
         * @var {Object}
         */
        bound: {},

        /**
         * @var {Object}
         */
        mouse: {},

        /**
         *
         * @param {jQuery} element
         * @param {Object} options
         */
        initialize: function (element, options) {
            'use strict';

            this.element = element;
            this.setOptions(options);
            this.bound = {
                start: $.proxy(this.start, this),
                check: $.proxy(this.check, this),
                drag: $.proxy(this.drag, this),
                cancel: $.proxy(this.cancel, this),
                stop: $.proxy(this.stop, this)
            };
            this.attach();
        },

        /**
         * Attach events
         *
         * @returns {Drag}
         * @public
         */
        attach: function () {
            'use strict';

            this.element.on('touchstart mousedown', this.bound.start);

            return this;
        },

        /**
         * Remove events
         *
         * @returns {Drag}
         * @public
         */
        detach: function () {
            'use strict';

            this.element.off('touchstart mousedown', this.bound.start);

            return this;
        },

        /**
         * Start of the drag event. When mouse is pressed down
         *
         * @param {Event} event
         * @private
         */
        start: function (event) {
            'use strict';

            if (this.options.preventDefault) {
                event.preventDefault();
            }

            if (this.options.stopPropagation) {
                event.stopPropagation();
            }

            var point = this.getPoint(event);
            this.mouse.start = point;

            this.trigger('beforeStart', [this.element, point, event]);

            $(document)
                .on('mousemove touchmove', this.bound.check)
                .on('mouseup touchend touchcancel', this.bound.cancel);
        },

        /**
         * @param {Event} event
         * @private
         */
        check: function (event) {
            'use strict';

            var point = this.getPoint(event),
                distance = Math.round(Math.sqrt(Math.pow(point.x - this.mouse.start.x, 2) + Math.pow(point.y - this.mouse.start.y, 2)));

            if (distance <= this.options.snap) {
                return;
            }

            // remove previous events, and attach new
            $(document)
                .off('mousemove touchmove', this.bound.check)
                .off('mouseup touchend touchcancel', this.bound.cancel)
                .on('mousemove touchmove', this.bound.drag)
                .on('mouseup touchend touchcancel', this.bound.stop);

            this.trigger('start', [this.element, point, event]);
        },

        /**
         * @param {Event} event
         * @private
         */
        drag: function (event) {
            'use strict';

            this.trigger('drag', [this.element, this.getPoint(event), this.mouse.start, event]);
        },

        /**
         * @param {Event} event
         * @private
         */
        cancel: function (event) {
            'use strict';

            $(document)
                .off('mousemove touchmove', this.bound.check)
                .off('mouseup touchend touchcancel', this.bound.cancel);

            this.trigger('cancel', [this.element, this.getPoint(event), this.mouse.start, event]);
        },

        /**
         * @param {Event} event
         * @private
         */
        stop: function (event) {
            'use strict';

            // remove previous events
            $(document)
                .off('mousemove touchmove', this.bound.drag)
                .off('mouseup touchend touchcancel', this.bound.stop);

            this.trigger('complete', [this.element, this.getPoint(event), this.mouse.start, event]);
        },


        /**
         * Retrieve point from Event. Distinguishes between touch event and regular events
         *
         * @param {Event} event
         * @returns {{x: Number, y: Number}}
         * @private
         */
        getPoint: function (event) {
            'use strict';

            if (event.originalEvent && event.originalEvent.touches && event.originalEvent.touches.length > 0) {
                return {x: event.originalEvent.touches[0].pageX, y: event.originalEvent.touches[0].pageY}
            } else if(event && event.pageX && event.pageY) {
                return {x: event.pageX, y: event.pageY}
            } else {
                return {x: -1, y: -1};
            }
        }

    });

}());