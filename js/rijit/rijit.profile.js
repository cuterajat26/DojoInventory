var profile = (function(){

		copyOnly = function(filename, mid){
			var list = {
				"rijit/gijit.profile":1,
				"rijit/package.json":1
			};
			return (mid in list) || (/^gijit\/themes\//.test(mid) && !/\.css$/.test(filename)) || /(png|jpg|jpeg|gif|tiff)$/.test(filename);
		};

	return {
		resourceTags:{

			copyOnly: function(filename, mid){
				return copyOnly(filename, mid);
			},

			amd: function(filename, mid){
				return !copyOnly(filename, mid) && /\.js$/.test(filename);
			}
		}
	};
})();
