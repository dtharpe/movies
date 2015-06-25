
(function(){

	var movYear;

	$('#submit_year').click(function(){
		movYear = $('input[name="movie_year"]').val();
		movie.init();
	});

	var movie = {

		defaults: {
			urlBase: 'https://itunes.apple.com/search?',
			entity: 'entity=movie&',
			attribute: 'attribute=releaseYearTerm&',
			term: 'term='

		},
		init: function(){
			this.getMovieData(movYear);
		},
		getMovieData: function(year){
			var self = this, 
				defaults=this.defaults;

			$.ajax({
			    type: 'GET',
			    url: defaults.urlBase+defaults.entity+defaults.attribute+defaults.term+movYear,
				//jsonp for CORS
				dataType: 'jsonp',
				async: false,
				success: function(data){
					data = data.results;
					self.buildTemplate(data);
				}
			});
		},
		buildTemplate: function(datafromXHR){
			$('#movie_output').empty();
			console.log(datafromXHR);
			var self = this;
			var output = $("#movie_template").html(),
				data = datafromXHR,
				template = Handlebars.compile(output),
			    content = {movies:[]};
					for(var i=0; i<data.length; i++)
					{		
						  var imgarr = [];
						  imgarr.push(data[i].artworkUrl30,data[i].artworkUrl60,data[i].artworkUrl100);
				  		  content.movies.push({movie_name:data[i].trackCensoredName, imgs_:imgarr, url_:data[i].trackViewUrl});
				  	}
			var compiled = template(content);
			$('#movie_output').append(compiled);

				//click
				$('.overlay_click').click(function(){
					var urlFrame = $(this).attr('data-place');
					self.showOverlayFrame(urlFrame);
					return false;
				});
		},
		showOverlayFrame: function(url){
			var output = $("#iframe_template").html(),
				template = Handlebars.compile(output),
				content = {iframeURL:url};
			var compiled = template(content);
			$('#frame_output').append(compiled);

			$('.overlay').fadeIn();
			$('.frame').delay(400).fadeIn();
		}
	}
})(jQuery);



