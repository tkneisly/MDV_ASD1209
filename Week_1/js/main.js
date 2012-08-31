// Week 1
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

// Initialize #newItem page
$('#newItem').on('pageinit', function(){
	
	
	var storeData = function(key) {

		// Find value of Flip Switch 'Favorite'
		var getSliderValue = function () {
			if (favorite[0].value === "on") {
				favoriteValue = "Yes";
			} else {
				favoriteValue = "No";
			}
		};

		// Find value of Radios
		var getSelectedRadio = function () {
			var radios = $('input:radio[name=genre]:nth(0)');
			//document.forms[0].genre;
			for (var i=0; i < radios.length; i++) {
				if (radios[i].checked) {
					genreValue = radios[i].value;
					genreChecked = radios[i];
				}
			}
		};
		bookForm.validate();

		if(bookForm.valid()) {
			var id = Math.floor(Math.random()*100000001);
		} else {
			id = key;
		}

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
	}

	var clearForm = function () {
		
		var clearSelectedRadio = function() {
			var chkRadios = $('input:radio[name=genre]:nth(0)');
			for (var i=0; i < chkRadios.length; i++) {
				if (chkRadios[i].checked) {
					$(chkRadios).attr('checked',false).checkboxradio('refresh');
				}
			}
			console.log(chkRadios);
		}

		var clearElements = function() {
			$('#Science-Fiction').attr('checked',false).checkboxradio('refresh');
			$('#Fantasy').attr('checked',false).checkboxradio('refresh');
			$('#Thriller').attr('checked',false).checkboxradio('refresh');
			$('#Classic').attr('checked',false).checkboxradio('refresh');
			$('#Periodical').attr('checked',false).checkboxradio('refresh');
			$('#Non-Fiction').attr('checked',false).checkboxradio('refresh');
		}
		clearElements();
		$('clearall').click();
	}


	bookForm.validate({
		// Fires if invalid values are detected in required fields
		invalidHandler: function(form, validator){
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
			//clearForm('#addItem');
		}
	})
	
	$('.reset').click(function() {
		clearForm;
	})
	
	$('.viewall').click(function() {
		// showData;
		alert("No data to display");	
	})
	
	
});