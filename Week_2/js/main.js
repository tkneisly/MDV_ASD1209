// Week 2
// David Tyler Kneisly
// ASD 1209
// Book Tracker

// Variables
var genreValue,
	genreChecked,
	level,
	favoriteValue = "No"
;

// Events
var bookForm = $('#addItem'),
	errorslink = $('#errorslink'),
	submittedlink = $('#submittedlink'),
	viewlink = $('#viewAllItems'),
	editlink = $('#editItem'),
	favorite = $('#favorite'),
	save = $('#submit')
;

// Global Toggle Event
var revealToggle = function() {
	$('.reveal').toggle();
	$('.form').toggle();
	$('#navbar_additems').toggle();
	$('#navbar_additems_alt').toggle();
};

$('.app_footer .viewall').click(function() {
	$('.newitem').click();
	revealToggle();
});

// Initialize #newItem page
$('#newItem').on('pageinit', function(argument) {
	
	var storeData = function(key) {

		var id = key;
		
		if(bookForm.valid()) {
			var id = Math.floor(Math.random()*100000001);
		} else {
			id = key;
		};

		// Find value of Flip Switch 'Favorite'
		var getSliderValue = function() {
			if (favorite[0].value === "on") {
				favoriteValue = "Yes";
			} else {
				favoriteValue = "No";
			}
		};
	
		// Find value of Radios
		var getSelectedRadio = function() {
			var radios = $('input:radio[name=genre]:nth(0)');
			for (var i=0; i < radios.length; i++) {
				if (radios[i].checked) {
					genreValue = radios[i].value;
					genreChecked = radios[i];
				}
			}
		};

		var item = {};
		item.groups = ['Group:', $('#groups').val()];
		item.titles = ['Title:', $('#booktitle').val()];
		item.authors = ['Author:', $('#author').val()];
		item.readpages = ['Pages:', $('#pages').val()];
		item.datefinished = ['Date Finished:', $('#date').val()];
		item.rating = ['Rating:', $('#rating').val()];
		item.category = ['Genre:', getSelectedRadio()];
		item.favs = ['Favorite:', getSliderValue()];
		item.note = ['Notes:', $('#notes').val()];
		localStorage.setItem(id, JSON.stringify(item));
		
		clearForm(submit);
		
	};

	var clearForm = function(check) {
		
		var resetSelect = function() {
			var select = $('#groups');
			select[0].selectedIndex = 5;
			select.selectmenu('refresh');
		}
		
		var resetSlider = function() {
			$('#rating').val(5).slider('refresh');
			$('#favorite').val(0).slider('refresh');
		};
		
		var clearRadios = function() {
			$('#Science-Fiction').attr('checked',false).checkboxradio('refresh');
			$('#Fantasy').attr('checked',false).checkboxradio('refresh');
			$('#Thriller').attr('checked',false).checkboxradio('refresh');
			$('#Classic').attr('checked',false).checkboxradio('refresh');
			$('#Periodical').attr('checked',false).checkboxradio('refresh');
			$('#Non-Fiction').attr('checked',false).checkboxradio('refresh');
		};
		
		resetSelect();									
		resetSlider();
		clearRadios();
		
		if(check === submit) {
			$('#hclear').click();
			$('#submitlink').click();
		} else {
			$('#hclear').click();
			$('#clearall').click();
		}
	};


	bookForm.validate({
		// Fires if invalid values are detected in required fields
		invalidHandler: function(form, validator) {
			errorslink.click();
			var output = '';
			for(var key in validator.submitted) {
				var label = $('label[for^="' + key + '"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				output += '<li class="errorli">' + "You're missing the " + fieldName.toLowerCase() + "." + '</li>';
			};
			$('#geterrors ul').html(output);
			console.log(validator.submitted);
		},

		// Fires when form is submitted and there are no validation errors
		submitHandler: function() {
			storeData(this.key);
		}
	});
	
	//Load Data
	var loadData = function(type) {
		//JSON
		var getJSON = function() {
			$('.datapark').empty();
			$('#dataload').empty();
			$('<h4>').html("JSON Test Data").appendTo('#dataload');
				$.ajax({
					url:  "xhr/json.js",
					type: "GET",
					dataType: "json",
					success: function(json){
						alert("Parsing Started!");
						for (var i=0, j=json.item.length; i<j; i++){
							var dataJSON = json.item[i];
							$(''+
								'<p>'+ dataJSON.groups +'</p>'+
								'<p>'+ dataJSON.titles +'</p>'+
								'<p>'+ dataJSON.authors +'</p>'+
								'<p>'+ dataJSON.readpages +'</p>'+
								'<p>'+ dataJSON.datefinished +'</p>'+
								'<p>'+ dataJSON.rating +'</p>'+
								'<p>'+ dataJSON.category +'</p>'+
								'<p>'+ dataJSON.favs +'</p>'+
								'<p>'+ dataJSON.note +'</p>'
							).appendTo('#dataload');
							console.log("JSON Works!");
							console.log(json);
						}
					}
				});
			return false;
		};
		
		//XML
		var getXML = function() {
			$('.datapark').empty();
			$('#dataload').empty();
			$('<h4>').html("XML Test Data").appendTo('#dataload');
				$.ajax({
					url: 'xhr/xmldata.xml',
					type: 'GET',
					dataType: 'xml',
					success: function(xml){
						$(xml).find('book').each(function(){
							var groups = $(this).find('groups').text();
							var titles = $(this).find('titles').text();
							var authors = $(this).find('authors').text();
							var readpages = $(this).find('readpages').text();
							var datefinished = $(this).find('datefinished').text();
							var rating = $(this).find('rating').text();
							var category = $(this).find('rating').text();
							var favs = $(this).find('favs').text();
							var note = $(this).find('note').text();
							$('<div class="datapark" id=type_'+ groups +'"></div').html(
								'<p>'+ "Title:  "+ titles +'</p>'+
								'<p>'+ "Author:  "+ authors +'</p>'+
								'<p>'+ "Pages:  "+ readpages +'</p>'+
								'<p>'+ "Date Finished:  "+ datefinished +'</p>'+
								'<p>'+ "Rating:  "+ rating +'</p>'+
								'<p>'+ "Category:  "+ category +'</p>'+
								'<p>'+ "Favorites:  "+ favs +'</p>'+
								'<p>'+ "Note:  "+ note +'</p>'
								).appendTo('#dataload');
						});
						console.log("XML Works!");
						console.log(xml);
					}
				});
				return false;
		};
		
		//CSV
		var getCSV = function() {
			$('.datapark').empty();
			$('#dataload').empty();
			$('<h4>').html("CSV Test Data").appendTo('#dataload');
				$.ajax({
					url:  'xhr/csvdata.csv',
					type: 'GET',
					dataType: 'text',
					success: function(csv){
						var info = csv.split('\n');
						for (var i=1, j=info.length; i<j; i++){
							var foo = info[i];
							var item = foo.split(',');
							var book = $(''+'<div class="datapark">'+
								'<p>'+ 'Group:  '+ item[0]+'</p>'+
								'<p>'+ 'Title:  '+ item[1] +'</p>'+
								'<p>'+ 'Author:  '+ item[2] +'</p>'+
								'<p>'+ 'Pages:  '+ item[3] +'</p>'+
								'<p>'+ 'Date Finished:  '+ item[4] +'</p>'+
								'<p>'+ 'Rating:  '+ item[5] +'</p>'+
								'<p>'+ 'Category:  '+ item[6] +'</p>'+
								'<p>'+ 'Favorite:  '+ item[7] +'</p>'+
								'<p>'+ 'Note:  '+ item[8] +'</p>'+
								'</div>'
								).appendTo('#dataload');
						}
						console.log("CSV Works!");
						console.log(csv);
					}
				});
				return false;
		};
		
		if(type === 'JSON') {
			getJSON();
		} else if(type === 'XML') {
			getXML();
		} else if(type === 'CSV') {
			getCSV();
		}
		
	};
	
	
	// On 'pageinit' Event Listeners
	$('.reveal').hide();
	$('#navbar_additems_alt').hide();
	$('.hide').hide();
	
	// Click Events Listeners
	$('.form_footer .viewall').click(function() {revealToggle();});
	$('.reset').click(function() {clearForm();});
	$('#load_JSON').on('click', function() {loadData('JSON');});
	$('#load_XML').on('click', function() {loadData('XML');});
	$('#load_CSV').on('click', function() {loadData('CSV');});
});