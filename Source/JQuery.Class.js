/**
 * A way to mimic Class functionality in javascript based on mootools
 *
 * Features:
 * - class inheritance
 * - functionality implementation
 * - a default constructor
 * - extra: options
 * - extra: events
 */
(function()
{
	var Class = this.Class = function(params)
	{
		return function() {
			for(var key in params) {
				if (params.hasOwnProperty(key)) {
					this[key] = params[key];
				}
			}

			this.setOptions = function(options) {
				if(options === undefined) {
					return;
				}

				for(var k in options) {
					if (options.hasOwnProperty(k)) {
						this.options[k] = options[k];
					}
				}
			};

			return (this.initialize) ? this.initialize.apply(this, arguments) : this;
		};
	};

	Class.Options = new Class({

	})


}());