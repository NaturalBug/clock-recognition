// Here we use the 'official name' (loadState) when defining the state
var loadState = {
	preload: function() {
		game.load.image('loading', 'assets/loading.png');
		game.load.image('whiteBackground', 'assets/white_background.png');	
	},

	create: function() {
		var whiteBackground = game.add.sprite(0, 0, 'whiteBackground');
		whiteBackground.scale.setTo(game.world.width / whiteBackground.width,
			game.world.height / whiteBackground.height);

		var loading = 
			game.add.sprite(game.world.centerX, game.world.centerY, 
				'loading');
		loading.anchor.setTo(0.5, 0.5);
		this.loadingText = game.add.text(game.world.centerX, 
			game.world.height * 0.7, '', {font: '32px Arial'});
		this.loadingText.anchor.setTo(0.5, 0.5);

		// You can listen for each of these events from Phaser.Loader
   		game.load.onLoadStart.add(loadStart, this);
    	game.load.onFileComplete.add(fileComplete, this);
    	game.load.onLoadComplete.add(loadComplete, this);

		game.load.image('clock', 'assets/clock.png');
		game.load.image('clockRecognizationText', 
			'assets/clock_recognization_text.png');
		game.load.image('congregationPassText', 
			'assets/congregation_pass_text.png');
		game.load.image('correctTimeText', 'assets/correct_time_text.png');
		//game.load.image('emptySpace', 'assets/empty_space.png');
		//game.load.image('enterText', 'assets/enter_button(up).png');
		game.load.image('explanationWindow', 
			'assets/explanation_window.png');
		game.load.image('fontCoverLarge', 'assets/font_cover(large).png');
		game.load.image('fontCoverSmall', 'assets/font_cover(small).png');
		//game.load.image('goText', 'assets/go_text.png');
		game.load.image('hourHandLarge', 'assets/hour_hand(large).png');
		//game.load.image('hourHandMiddle', 'assets/hour_hand(middle).png');
		game.load.image('hourHandSmall', 'assets/hour_hand(small).png');
		game.load.image('levelText', 'assets/level_text.png');
		game.load.image('loseText', 'assets/lose_text.png');
		game.load.image('loseTextBackground', 
			'assets/lose_text_background.png');
		game.load.image('minuteHandLarge', 'assets/minute_hand(large).png');
		/*
		game.load.image('minuteHandMiddle', 
			'assets/minute_hand(middle).png');
		*/
		game.load.image('minuteHandSmall', 'assets/minute_hand(small).png');
		game.load.image('nextLevelText', 'assets/next_level_text.png');
		//game.load.image('oneText', 'assets/one_text.png');
		game.load.image('passBackground', 'assets/pass_background.png');
		//game.load.image('pointer', 'assets/pointer.png');
		game.load.image('questionBackground', 
			'assets/question_background.png');
		game.load.image('remainingTimeText', 
			'assets/remaining_time_text.png');
		game.load.image('replayText', 'assets/replay_text.png');
		game.load.image('scoreText', 'assets/score_text.png');
		game.load.image('sideBar', 'assets/side_bar.png');
		/*
		game.load.image('threeText', 'assets/three_text.png');
		game.load.image('totalFinalScoreTable', 
			'assets/total_final_score_table.png');
		game.load.image('twoText', 'assets/two_text.png');
		*/

		game.load.spritesheet('closeButton', 'assets/close_button.png', 41, 
			41);
		/*
		game.load.spritesheet('closeVoiceButton', 
			'assets/close_voice_button.png', 182, 183);
		*/
		game.load.spritesheet('enterButton', 'assets/enter_button.png', 111, 
			86);
		/*
		game.load.spritesheet('giveUpButton', 'assets/give_up_button.png', 
			182, 183);
		*/
		game.load.spritesheet('howToPlayButton', 
			'assets/how_to_play_button.png', 182, 183);
		/*
		game.load.spritesheet('newGameButton', 
			'assets/new_game_button.png', 182, 183);
		*/
		game.load.spritesheet('nextLevelButton', 
			'assets/next_level_button.png', 182, 183);
		/*
		game.load.spritesheet('onceAgainButton', 
			'assets/once_again_button.png', 203, 203);
		game.load.spritesheet('replayButton', 'assets/replay_button.png', 
			182, 183);
		game.load.spritesheet('skipButton', 'assets/skip_button.png', 
			182, 200);
		*/
		game.load.spritesheet('startButton', 'assets/start_button.png', 
			184, 184);
		/*
		game.load.spritesheet('startButton2', 'assets/start_button2.png', 
			182, 184);
		game.load.spritesheet('totalFinalScoreButton', 
			'assets/total_final_score_button.png', 182, 183);
		game.load.spritesheet('useVoiceButton', 
			'assets/use_voice_button.png', 184, 183);

		game.load.audio('introduction1', 'assets/introduction1.mp3');
		game.load.audio('introduction2', 'assets/introduction2.mp3');
		game.load.audio('introduction3', 'assets/introduction3.mp3');
		game.load.audio('introduction4', 'assets/introduction4.mp3');
		*/

		game.load.start();
	}
};

 function loadStart() {
	this.loadingText.setText("Loading ...");
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
	this.loadingText.setText("Loading......" + progress + "%");
}

function loadComplete() {
	game.state.start('menu');
}

