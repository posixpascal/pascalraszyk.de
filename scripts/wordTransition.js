define(function(){
	'use strict';

	var wordTransition = function(container, words){
		// delay between each word
		var DELAY = 1200;
		// how much time to spent on individual chars.
		var TYPE_DELAY = 250;


		var cycleWord = function(index){
			// remove current word char by char
			var currentWord = container.innerHTML;
			var wordIndex = index;

			var removeChars = function(word, next){
				if (word.length === 0) {
					return next();
				}
				word = word.substring(0, word.length - 1);
				container.innerHTML = word;
				setTimeout(removeChars, TYPE_DELAY, word, next);
			};

			var typeWord = function(currentWord, cb, index){
				var chars = currentWord.length;
				if (typeof index === 'undefined'){ 
					index = 1; 
				}

				if (index > chars){ return cb(); }
				var word = currentWord.substring(0, index++);
				container.innerHTML = word;
				setTimeout(typeWord, TYPE_DELAY, currentWord, cb, index);

			};

			var nextWordIfReady = function(){
				var word = words[wordIndex++];
				if (typeof word === 'undefined') { // limit reached.
					wordIndex = 1; 
					word = words[wordIndex];
				}

				typeWord(word, function(){
					setTimeout(cycleWord, DELAY, wordIndex);
				});
			};


			removeChars(currentWord, nextWordIfReady);
			
		
			
		};

		cycleWord(0);
			

	};

	return wordTransition;
});