$(function() {
  $.get('./content.json', function(data) {
  	$('#about').html(data.about);
  	$('#ordering').find('div').html(data.ordering);
  	$('.instagram').attr('href', data.links.instagram);
  	$('.twitch').attr('href', data.links.twitch);
  	$('.youtube').attr('href', data.links.youtube);
  	$('.email').attr('href', data.links.email);
  });
  $.get('./folio.json', function(data) {
  	var tpl = $('#card-template').html();
  	for(g=0;g<data.galleries.length;g++) {
  		var gallery = data.galleries[g];
  		console.log(gallery);
  		var name = $('<h3>').addClass('text-center').text(gallery.name);
  		var container = $('<div>').addClass('row');
  		for(i=0;i<gallery.images.length;i++) {
  			var card = tpl;
  			var image = gallery.images[i];
  			card = card.replace('{{src}}', 'src="./folio/' + gallery.folder + '/' + image.image +'"');
  			card = card.replace('{{title}}', image.title);
  			card = card.replace('{{description}}', image.description);
  			container.append(card);
  		}
  		$('#gallery').append(name);
  		$('#gallery').append(container);
  		if(g < data.galleries.length-1) {
	  		$('#gallery').append('<br><br>');
	  	}
  	}
  });

  $('body').on('click', '#gallery a', function(e) {
  	e.preventDefault();
  	var img = $(this).find('img').clone();
  	var title = img.attr('alt');
  	var description = img.attr('longdesc');
  	$('#gallery-modal').find('.modal-title').text(title);
  	$('#gallery-modal').find('.modal-body p').text(description);
  	$('#gallery-modal').find('.modal-body img').prop('src', img.prop('src'));
  	$('#gallery-modal').modal('show');
  });
});