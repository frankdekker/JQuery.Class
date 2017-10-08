(function() {

	/**
	 * @param string
	 * @returns {XML|string|void}
	 * @private
	 */
	var removeOn = function(string){
		return string.replace(/^on([A-Z])/, function(full, first){
			return first.toLowerCase();
		});
	};

	/**
	 * Class to handle asynchronous callbacks
	 *
	 * @class Chain
	 */
	this.Chain = new Class({

		$chains: [],

		/**
		 * Add functions to the call chain
		 *
		 * @param {Function} fn the function to call
		 * @returns {*}
		 * @public
		 */
		chain: function(fn) {
			this.$chains.push(fn);

			return this;
		},

		/**
		 * call the oldest function on the chain
		 *
		 * @param {...*} args one or more arguments
		 * @returns {*}
		 * @public
		 */
		callChain: function(args) {
			if (this.$chains.length == 0) {
				return this;
			}

			var fn = this.$chains.shift();
			if (typeof fn == 'function') {
				fn.apply(this, arguments);
			}

			return this;
		},

		/**
		 * Clear all functions from the chain
		 *
		 * @returns {*}
		 * @public
		 */
		clearChain: function() {
			this.$chains = [];

			return this;
		}
	});

	/**
	 * Class to send and receive events
	 *
	 * @class Events
	 */
	this.Events = new Class({

		$events: {},

		/**
		 * Add an event
		 *
		 * @param {String} type - the name of the event
		 * @param {Function} fn - the function to call
		 * @returns {*}
		 * @public
		 */
		on: function(type, fn){
			type = removeOn(type);
			var events = this.$events[type] || [];
			if ($.inArray(events, fn) < 0) {
				events.push(fn);
				this.$events[type] = events;
			}
			return this;
		},

		/**
		 * Remove an event
		 * @param {String} type - the name of the event
		 * @param {Function} [fn] - optional the function to be removed. Otherwise all listeners
		 * @returns {*}
		 * @public
		 */
		off: function(type, fn){
			type = removeOn(type);
			var events = this.$events[type];
			if (events){
				if (fn === undefined) {
					delete this.$events[type];
				} else {
					var index = $.inArray(fn, events);
					if (index !== -1) delete events[index];
				}
			}
			return this;
		},

		/**
		 * Fire an event
		 * @param {String} type the event name
		 * @param {Array}  args an array of arguments to send to the event function
		 * @returns {*}
		 * @public
		 */
		trigger: function(type, args){
			var events, i;
			type = removeOn(type);
			events = this.$events[type];
			if (!events) return this;
			args = $.isArray(args) ? args : [args];
			for (i = 0; i < events.length; i++) {
				if (events[i]) {
					events[i].apply(this, args);
				}
			}
			return this;
		}
	});

	/**
	 * Options class
	 *
	 * @class Options
	 */
	this.Options = new Class({
		/**
		 * @params {...Object} options
		 * @returns {*}
		 * @public
		 */
		setOptions: function() {
			var options = this.options = $.extend.apply(null, $.merge([true, {}, this.options], arguments));
			if (this.on) {
				for (var option in options){
					if ($.type(options[option]) != 'function' || !(/^on[A-Z]/).test(option)) {
						continue;
					}
					this.on(option, options[option]);
					delete options[option];
				}
			}
			return this;
		}
	});
}());
