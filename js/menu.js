// Here we use the 'official name' (menuState) when defining the state
var menuState = {
	create: function() {
		var fontCover = game.add.sprite(0, 0, 'fontCoverSmall');
		fontCover.scale.setTo(game.world.width / fontCover.width, 
			game.world.height / fontCover.height);
		var clockRecognizationText = 
			game.add.sprite(game.world.width * 0.6, game.world.height * 0.8, 
				'clockRecognizationText');
		clockRecognizationText.scale.setTo(0.9, 0.9);
		clockRecognizationText.anchor.setTo(0.5, 0.5);

		var startButton = game.add.button(game.world.width * 0.85, 
			game.world.height * 0.5, 'startButton', actionOnClick, this, 0, 1);
		//startButton.scale.setTo(0.9, 0.9);
		startButton.anchor.setTo(0.5, 0.5);
	}
};

function actionOnClick() {
	game.state.start('play');
}