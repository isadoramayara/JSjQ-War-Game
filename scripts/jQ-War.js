$(document).ready(function () {


    var used_cards = new Array();
    var player_cards = new Array();
    var slick_cards = new Array();

	function card(name, suit, value, trump) {
        this.name = name;
        this.suit = suit;
        this.value = value;
        this.trump = trump;
    }

    var deck = [
		new card('Ace', 'Hearts', 11, 142),
		new card('Two', 'Hearts', 2, 22),
		new card('Three', 'Hearts', 3, 32),
		new card('Four', 'Hearts', 4, 42),
		new card('Five', 'Hearts', 5, 52),
		new card('Six', 'Hearts', 6, 62),
		new card('Seven', 'Hearts', 7, 72),
		new card('Eight', 'Hearts', 8, 82),
		new card('Nine', 'Hearts', 9, 92),
		new card('Ten', 'Hearts', 10, 102),
		new card('Jack', 'Hearts', 10, 112),
		new card('Queen', 'Hearts', 10, 122),
		new card('King', 'Hearts', 10, 132),
		new card('Ace', 'Diamonds', 11, 141),
		new card('Two', 'Diamonds', 2, 21),
		new card('Three', 'Diamonds', 3, 31),
		new card('Four', 'Diamonds', 4, 41),
		new card('Five', 'Diamonds', 5, 51),
		new card('Six', 'Diamonds', 6, 61),
		new card('Seven', 'Diamonds', 7, 71),
		new card('Eight', 'Diamonds', 8, 81),
		new card('Nine', 'Diamonds', 9, 91),
		new card('Ten', 'Diamonds', 10, 101),
		new card('Jack', 'Diamonds', 10, 111),
		new card('Queen', 'Diamonds', 10, 121),
		new card('King', 'Diamonds', 10, 131),
		new card('Ace', 'Clubs', 11, 143),
		new card('Two', 'Clubs', 2, 23),
		new card('Three', 'Clubs', 3, 33),
		new card('Four', 'Clubs', 4, 43),
		new card('Five', 'Clubs', 5, 53),
		new card('Six', 'Clubs', 6, 63),
		new card('Seven', 'Clubs', 7, 73),
		new card('Eight', 'Clubs', 8, 83),
		new card('Nine', 'Clubs', 9, 93),
		new card('Ten', 'Clubs', 10, 103),
		new card('Jack', 'Clubs', 10, 113),
		new card('Queen', 'Clubs', 10, 123),
		new card('King', 'Clubs', 10, 133),
		new card('Ace', 'Spades', 11, 144),
		new card('Two', 'Spades', 2, 24),
		new card('Three', 'Spades', 3, 34),
		new card('Four', 'Spades', 4, 44),
		new card('Five', 'Spades', 5, 54),
		new card('Six', 'Spades', 6, 64),
		new card('Seven', 'Spades', 7, 74),
		new card('Eight', 'Spades', 8, 84),
		new card('Nine', 'Spades', 9, 94),
		new card('Ten', 'Spades', 10, 104),
		new card('Jack', 'Spades', 10, 114),
		new card('Queen', 'Spades', 10, 124),
		new card('King', 'Spades', 10, 134)
	];


	// MY CODE //

	$('#pHand').append('<div class="pImg"></div>');
	$('#cHand').append('<div class="sImg"></div>');

	// -------- ///
	let playerName = null;
	var playerScore = 0;
	var slickScore = 0;
	var rand = 0;

	function giveCards(){

		// If is the second deal in middle game that the user is doing
		if(deck.length === 0){

			// Filling deck again
			for(i=0; i < player_cards.length; i++){
				deck.push(player_cards[i]);
			};
			for(i=0; i < slick_cards.length; i++){
				deck.push(slick_cards[i]);
			};
			for(i=0; i < used_cards.length; i++){
				deck.push(used_cards[i]);
			};

			// Cleaning arrays
			player_cards.splice(0,player_cards.length);
			slick_cards.splice(0,slick_cards.length);
			used_cards.splice(0,used_cards.length);
		
		};

		// Shuffle and give cards
		for(i=0; i<26; i++){
			rand = (Math.random() * deck.length * 1);
			player_cards.push(deck.splice(rand,1)[0]);
		};
		
		for(i=0; i<26; i++){
		 	slick_cards.push(deck.splice(0,1)[0]);
		};

		// Cleaning score, cards, and counting
		playerScore = 0;
		slickScore = 0;
		$(".pImg").empty();
		$(".sImg").empty();
		$('#pScore').text(playerScore);
		$('#cScore').text(slickScore);
		$('#cardCount').text(player_cards.length);

	}

	// Write player's name
	function writeName(){

			playerName = prompt("Please, enter your name:","");
		
			if(playerName === ""){
				alert("Invalid input.");
				writeName();

			}else if (playerName === null){
				alert("The player needs a name to start the deal.");

			}else{
				$('.pName').text(playerName);
			}

	}

	// Start to pull and compare the cards
	function playGame(){

		$(".pImg").empty();
		$(".sImg").empty();

		var playercard = Math.floor(Math.random() * player_cards.length);
		var slickcard = Math.floor(Math.random() * slick_cards.length);

		$('<img>').attr('src','images/' + player_cards[playercard].suit + '/' + player_cards[playercard].name + '.jpg').appendTo('.pImg')
				.hide()
                .fadeIn("slow")
                .delay("500");

		$('<img>').attr('src','images/' + slick_cards[slickcard].suit + '/' + slick_cards[slickcard].name + '.jpg').appendTo('.sImg')
				.hide()
                .fadeIn("slow")
                .delay("500");

		if(player_cards[playercard].trump > slick_cards[slickcard].trump){

			playerScore += player_cards[playercard].value + slick_cards[slickcard].value;

		}else{

			slickScore += player_cards[playercard].value + slick_cards[slickcard].value;
					
		}

		used_cards.push(player_cards.splice(playercard,1)[0]);
		used_cards.push(slick_cards.splice(slickcard,1)[0]);

		$('#pScore').text(playerScore);
		$('#cScore').text(slickScore);
		$('#cardCount').text(player_cards.length);

	}

	// calling the winner
	function winner(){

		$(".pImg").empty();
		$(".sImg").empty();

		if(playerScore > slickScore){

			$('<img>').attr('src','images/other/check.png')
				.attr({ 'width':'200px',
						'height':'300px',
						'overflow':'hidden'})
				.appendTo('.pImg')
				.hide()
                .fadeIn("slow")
                .delay("500");

			$('<img>').attr('src','images/other/x.png')
				.attr({ 'width':'200px',
						'height':'300px',
						'overflow':'hidden'})
				.appendTo('.sImg')
				.hide()
                .fadeIn("slow")
                .delay("500");

		}else{

			$('<img>').attr('src','images/other/x.png')
				.attr({ 'width':'200px',
						'height':'300px',
						'overflow':'hidden'})
				.appendTo('.pImg')
				.hide()
                .fadeIn("slow")
                .delay("500");

			$('<img>').attr('src','images/other/check.png').appendTo('.sImg')
			.attr({ 'width':'200px',
					'height':'300px',
					'overflow':'hidden'})
				.hide()
                .fadeIn("slow")
                .delay("500");
		}	

	}

		// NEW PLAYER BUTTON
		$('#newPlayer').click(function(){

			writeName();

			if (playerName !== null && playerName !== ""){ giveCards();	}
				
		});

		// DEAL BUTTON
		$('#deal').click(function(){

			// If player name is empty or not

			if(playerName !== null){
				giveCards();

			} else {		
				writeName();
				if(playerName !== null){ giveCards(); }
			}

		});

		// PLAY BUTTON
		$('#play').click(function(){

			switch (true){

				case playerName == "" || playerName == null:
					alert("Please, start a deal before starting to play!");
					break;

				case player_cards.length === 0 && used_cards.length === 0:
					alert("You need to start a deal before play!");
					break;

				default:
					
					if(used_cards.length < 52){
						
						playGame();

					}else{
					
						winner();

					}

			}

	})


});
