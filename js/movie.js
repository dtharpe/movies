
(function(){

	var movYear, movSearchData;

	$('#submit_year').click(function(){
		movYear = $('input[name="movie_year"]').val();
		movies.init();
	});

	$('input[name="movie_search"]').keyup(function(){
		var searchVal = $(this).val();
		movies.filterResults(searchVal);
	});

	var movies = {

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
					self.showSearch(true);
				}
			});
		},
		buildTemplate: function(datafromXHR){
			$('#movie_output').empty();
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
		
			//$('#movie_output').append(compiled);
			$("#movie_template").ready(function(){
				$('#movie_output').append(compiled);
			});
			movSearchData = content.movies;

				$('.overlay_click').click(function(){
					var urlFrame = $(this).attr('data-place');
					self.showOverlayFrame(urlFrame);
					return false;
				});
		},
		showSearch: function(bool){
			if (bool == true){
				$('.movie_search_form').delay(300).fadeIn();
			}else{
				$('.movie_search_form').delay(300).fadeOut();
			}
		},
		filterResults: function(val){
			console.log(val);
			// $('#movie_output').empty();
			// var myExp = new RegExp(val, "i");
			// console.log(myExp);
			// $.each(movSearchData, function (key, val){
			// 	if((val.movie_name.search(myExp) != -1)){

				//}
		
			// });
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
})();



