const sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let sentenceIndex = 0;
let letterIndex = 0;
let currentSentence = sentences[sentenceIndex];
let currentLetter = currentSentence[letterIndex];
let numberOfMistakes = 0;
let numberOfWords = 54;
let keyCount = 0;
let startTime;
let endTime;

$('#sentence').text(currentSentence);
$('#target-letter').text(currentLetter);

$('#keyboard-upper-container').hide();

$('body').keydown(e => {
	if (e.which === 16) {
			$('#keyboard-upper-container').show();
			$('#keyboard-lower-container').hide();
	}
});

$('body').keyup(e => {
	if (e.which === 16) {
		$('#keyboard-upper-container').hide();
		$('#keyboard-lower-container').show();
	}
	$('.highlight').removeClass('highlight');
});

$('body').keypress(e => {
	$('#' + e.which).addClass('highlight');

	if (keyCount === 0) {
		startTime = Date.now();
		keyCount++;
	}

	if (e.which === currentLetter.charCodeAt(0)) {
		$('#feedback').append('<span class="glyphicon glyphicon-ok-circle glyphicon-ok" aria-hidden="true"></span>');
	} else {
		$('#feedback').append('<span class="glyphicon glyphicon-remove-circle glyphicon-remove" aria-hidden="true"></span>');
		numberOfMistakes++;
	}
	
	letterIndex++;
	currentLetter = currentSentence[letterIndex];
	$('#yellow-block').css('margin-left', '+=17.5px');

	if (sentenceIndex >= sentences.length - 1 && letterIndex >= currentSentence.length) {
		let endTime = Date.now();
		let minutes = (endTime - startTime) / 60000;
		let wpm = Math.floor(numberOfWords / minutes - 2 * numberOfMistakes);
		$('#yellow-block').hide();
		$('#sentence').empty();
		$('#feedback').empty();
		$('#target-letter').empty();
		$('body').off('keypress');
		Swal.fire({
			title: '<strong>Game Over!</strong>',
			type: 'info',
			html:
				`Typing Speed: ${wpm} words/min`,
			showCloseButton: false,
			showCancelButton: false,
			focusConfirm: false,
			confirmButtonText:
				'Play Again?',
			confirmButtonAriaLabel: 'Play Again?',
		})
		$('button').click(() => window.location.reload());
	} else if (letterIndex >= currentSentence.length) {
		sentenceIndex++;
		currentSentence = sentences[sentenceIndex];
		$('#sentence').text(currentSentence);
		letterIndex = 0;
		currentLetter = currentSentence[letterIndex];
		$('#target-letter').text(currentLetter);
		$('#yellow-block').css('margin-left', '-15px');
		$('#feedback').empty();
	}
	
	if (currentLetter === ' ') {
		$('#target-letter').text('<space>');
	} else {
		$('#target-letter').text(currentLetter);
	}
});