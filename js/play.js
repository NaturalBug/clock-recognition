var questionHour;
var questionMinute;
var question;
var hourHand;
var hourHandDown;
var minuteHand;
var minuteHandDown;
var enterButton;
var explanationWindow;
var closeButton;
var currentLevel = 1;
var remainingTime;
var currentScore = 0;
var howToPlayButton;
var levelTimeLimits = [120, 120, 90, 90, 90, 60, 60, 60, 45, 40];
var prepareTimer;
var gameTimer;
var countdownTimer;
var preAngle = 0;
var angle;
var currentHour;
var currentMinute;

// Here we use the 'official name' (playState) when defining the state
var playState = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCED);

		// main 
		var gameBackground = game.add.sprite(0, 0, 'fontCoverLarge');

		var questionBackground = game.add.sprite(game.world.width * 0.625, 
			game.world.height * 0.15, 'questionBackground');
		questionBackground.scale.setTo(0.8, 0.8);
		questionBackground.anchor.setTo(0.5, 0.5);

		questionHour = game.rnd.integerInRange(1, 12);
		var questionMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
		questionMinute = game.rnd.pick(questionMinutes);
		question = game.add.text(game.world.width * 0.6125, 
			game.world.height * 0.2125, '', {font: 'bold 75px Arial', 
			fill: '#D35400'});
		question.anchor.setTo(0.5, 0.5);;

		var clock = game.add.sprite(game.world.width * 0.6125, 
			game.world.height * 0.625, 'clock');
		clock.scale.setTo(0.9, 0.9);
		clock.anchor.setTo(0.5, 0.5);

		minuteHand = game.add.sprite(game.world.width * 0.61375,
			game.world.height * 0.625, 'minuteHandSmall');
		minuteHand.scale.setTo(1.2, 1.2);
		minuteHand.anchor.setTo(0.55, 0.955);
		minuteHand.inputEnabled = true;
		minuteHand.events.onInputDown.add(function() {minuteHandDown = true});
		minuteHand.events.onInputUp.add(adjustClock, this);
		
		hourHand = game.add.sprite(game.world.width * 0.61375, 
			game.world.height * 0.625, 'hourHandSmall');
		hourHand.scale.setTo(1.2, 1.2);
		hourHand.anchor.setTo(0.5, 0.92);
		hourHand.inputEnabled = true;
		hourHand.events.onInputDown.add(function() {hourHandDown = true});
		hourHand.events.onInputUp.add(adjustClock, this);

		enterButton = game.add.button(game.world.width * 0.85, 
			game.world.height * 0.9, 'enterButton', enterOnClick, this, 0, 
			1);
		enterButton.scale.setTo(1.25, 1.25);
		enterButton.anchor.setTo(0.5, 0.5);
		enterButton.input.enabled = false;

		// left side
		var sideBar = game.add.sprite(0, 0, 'sideBar');
		sideBar.scale.setTo(300 / sideBar.width, game.world.height / 
			sideBar.height);

		var levelText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.1, 'levelText');
		levelText.scale.setTo(0.5, 0.5);
		levelText.anchor.setTo(0.5, 0.5);
		var level = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.2, currentLevel, {font: 'bold 50px Arial', 
			fill: '#FFC300'});
		level.anchor.setTo(0.5, 0.5);
		
		var remainingTimeText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.3, 'remainingTimeText');
		remainingTimeText.scale.setTo(0.5, 0.5);
		remainingTimeText.anchor.setTo(0.5, 0.5);
		remainingTime = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.4, levelTimeLimits[currentLevel - 1], 
			{font: 'bold 50px Arial', fill: '#FFC300'});
		remainingTime.anchor.setTo(0.5, 0.5);
	
		var scoreText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.5, 'scoreText');
		scoreText.scale.setTo(0.5, 0.5);
		scoreText.anchor.setTo(0.5, 0.5);
		var score = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.6, (currentScore == 0 ? '0' : currentScore)
			, {font: 'bold 50px Arial', fill: '#FFC300'});
		score.anchor.setTo(0.5, 0.5);		

		howToPlayButton = game.add.button(game.world.width * 0.1125, 
			game.world.height * 0.8, 'howToPlayButton', howToPlayOnClick, 
			this, 0, 1);
		howToPlayButton.anchor.setTo(0.5, 0.5);
		howToPlayButton.input.enabled = false;

		// explanation
		explanationWindow = game.add.sprite(game.world.width * 0.625, 
			game.world.height * 0.525, 'explanationWindow');
		explanationWindow.scale.setTo(0.75, 0.75);
		explanationWindow.anchor.setTo(0.5, 0.5);
		explanationWindow.visible = false;

		closeButton = game.add.button(game.world.width * 0.88125, 
			game.world.height * 0.2625, 'closeButton', closeOnClick, this, 
			0, 1);
		closeButton.scale.setTo(0.8, 0.8)
		closeButton.anchor.setTo(0.5, 0.5);
		closeButton.input.enabled = false;
		closeButton.visible = false;

		prepareTimer = game.time.create();
		gameTimer = game.time.create();
		countdownTimer = prepareTimer.add(Phaser.Timer.SECOND * 3, 
			function() {
				prepareTimer.stop();
				question.text = (questionHour < 10 ? '0' + questionHour : 
				questionHour) + ':' + (questionMinute < 10 ? '0' + 
				questionMinute : questionMinute);

				countdownTimer = gameTimer.add(Phaser.Timer.SECOND * 
				levelTimeLimits[currentLevel - 1], loseDisplay, this);
				gameTimer.start();

				enterButton.input.enabled = true;
				howToPlayButton.input.enabled = true;
			}, this);
		prepareTimer.start();
	},

	update: function() {
		if (prepareTimer.running) {
			question.text = Math.round((countdownTimer.delay - 
				prepareTimer.ms) / 1000);
		}

		if (gameTimer.running) { // update remaining time
			remainingTime.text = 
				Math.round((countdownTimer.delay - gameTimer.ms) / 1000);
		}

		// update clock
		var p = game.input.activePointer;
		if (!p.isDown) {
			hourHandDown = false;
			minuteHandDown = false;
		} else if (hourHandDown) {
			angle = Phaser.Math.angleBetween(p.x, p.y, hourHand.x, hourHand.y);
			hourHand.rotation = -angle;
			minuteHand.rotation = -angle * 12;
		} else if (minuteHandDown) {
			angle = Phaser.Math.angleBetween(p.x, p.y, minuteHand.x, minuteHand.y);
			minuteHand.rotation = -angle;

			if (angle > 0) { // left side
				if (preAngle > 0) {
					hourHand.rotation = Math.floor(hourHand.angle / 30) * 
						Phaser.Math.PI2 / 12 + (Phaser.Math.PI2 - angle) 
						/ 12;
				} else {
					if (angle > Phaser.Math.PI2 / 4) { // clockwise
						hourHand.rotation = Math.floor(hourHand.angle / 30) 
							* Phaser.Math.PI2 / 12 + 
							(Phaser.Math.PI2 - angle) / 12;
					} else { // counterclockwise  
						hourHand.rotation = Math.floor(hourHand.angle / 30) 
							* Phaser.Math.PI2 / 12 - angle / 12;
					}
				}
			} else { // right side
				if (preAngle > 0) {
					if (angle < 0 && angle > -Phaser.Math.PI2 / 4) { // clockwise
						hourHand.rotation =
							Math.floor(hourHand.angle / 30 + 1) * 
							Phaser.Math.PI2 / 12 - angle / 12;
					} else { // counterclockwise
						hourHand.rotation =
							Math.floor(hourHand.angle / 30) * 
							Phaser.Math.PI2 / 12 - angle / 12;
					}	
				} else {
					hourHand.rotation = 
						Math.floor(hourHand.angle / 30) * 
						Phaser.Math.PI2  / 12 - angle / 12;
				}
			}
			
			preAngle = angle;
		}
	}/*,

	render: function() {
			game.debug.text('hourHand angle: ' + hourHand.angle, 256, 128);
			game.debug.text('minuteHand angle: ' + minuteHand.angle, 256, 160);
			game.debug.text('angle: ' + angle + ', preAngle: ' + preAngle, 256, 192);
			game.debug.text('time: ' + (hourHand.angle >= 0 ? 
				Math.floor(hourHand.angle / 30) : 
				Math.floor((hourHand.angle + 360) / 30)) + ':' + 
				(minuteHand.angle >= 0 ? Math.floor(minuteHand.angle / 6) :
				Math.floor((minuteHand.angle + 360) / 6)), 256, 224);
			game.debug.text('hourHand rotation: ' + hourHand.rotation, 256, 256);
	}*/
}

function adjustClock() {
	var minuteTimes = Math.floor(minuteHand.angle / 30);			
	if (minuteHand.angle - 30 * minuteTimes <= 30 * (minuteTimes + 1) - 
		minuteHand.angle) {
		minuteHand.angle = minuteTimes * 30;
	} else {
		minuteHand.angle = (minuteTimes + 1) * 30;
	}

	var hourTimes = Math.floor(hourHand.angle / 30);
	if (minuteHand.angle > 0)
		hourHand.angle = hourTimes * 30 + minuteHand.angle / 12;
	else {
		if (minuteHand.angle == 0 && hourHand.angle - 30 * hourTimes <= 30 * 
			(hourTimes + 1) - hourHand.angle) {
			hourHand.angle = hourTimes * 30 + minuteHand.angle / 12;	
		} else {
			hourHand.angle = (hourTimes + 1) * 30 + minuteHand.angle / 12;
		}
	}	
}

function howToPlayOnClick() {
	explanationWindow.visible = true;
	closeButton.visible = true;
	closeButton.input.enabled = true;
	howToPlayButton.input.enabled = false;
	enterButton.input.enabled = false;
	gameTimer.pause();
}

function closeOnClick() {
	explanationWindow.visible = false;
	closeButton.visible = false;
	closeButton.input.enabled = false;
	howToPlayButton.input.enabled = true;
	enterButton.input.enabled = true;
	gameTimer.resume();
}

function enterOnClick() {
	currentHour = (hourHand.angle < 0 ? 
		Math.floor((hourHand.angle + 360) / 30) : 
		Math.floor((hourHand.angle) / 30));
	currentMinute = (minuteHand.angle < 0 ? 
		(minuteHand.angle + 360) / 6 : minuteHand.angle / 6);

	if (currentHour == 0)
		currentHour = 12;

	howToPlayButton.input.enabled = false;
	enterButton.input.enabled = false;
	if (currentHour == questionHour && currentMinute == questionMinute) {
		// store the using time
		gameTimer.stop();

		if (currentLevel < 10) {
			var passBackground = game.add.sprite(game.world.width * 0.6125, 
				game.world.height * 0.625, 'passBackground');
			passBackground.scale.setTo(0.8, 0.8);
			passBackground.anchor.setTo(0.5, 0.5);

			var correctTimeText = game.add.sprite(game.world.width * 0.6125, 
				game.world.height * 0.625, 'correctTimeText');
			correctTimeText.scale.setTo(1.25, 1.25);
			correctTimeText.anchor.setTo(0.5, 0.5);
			correctTimeText.visible = false;

			var nextLevelText = game.add.button(game.world.width * 0.6125, 
				game.world.height * 0.8, 'nextLevelText', nextLevelOnClick);
			nextLevelText.scale.setTo(1.25, 1.25);
			nextLevelText.anchor.setTo(0.5, 0.5);
			nextLevelText.input.enabled = false;
			nextLevelText.visible = false;

			var shackNextLevelTextCenter = game.add.tween(nextLevelText).to(
				{angle: 0}, 50, Phaser.Easing.Bounce.Out);
			shackNextLevelTextCenter.onComplete.add(function() {
				nextLevelText.input.enabled = true});

			var shackNextLevelTextRight = game.add.tween(nextLevelText).to(
				{angle: 30}, 100, Phaser.Easing.Bounce.Out);
			shackNextLevelTextRight.onComplete.add(function() {
				shackNextLevelTextCenter.start()});

			var shackNextLevelTextLeft = game.add.tween(nextLevelText).to(
				{angle: -30}, 50, Phaser.Easing.Bounce.Out);
			shackNextLevelTextLeft.onComplete.add(function() {
				shackNextLevelTextRight.start()});

			var shackCorrectTimeTextCenter = 
				game.add.tween(correctTimeText).to({angle: 0}, 50, 
					Phaser.Easing.Bounce.Out);	
			shackCorrectTimeTextCenter.onComplete.add(function() {
				nextLevelText.visible = true;
				shackNextLevelTextLeft.start();
			});

			var shackCorrectTimeTextRight = 
				game.add.tween(correctTimeText).to({angle: 30}, 100, 
					Phaser.Easing.Bounce.Out);
			shackCorrectTimeTextRight.onComplete.add(function() {
				shackCorrectTimeTextCenter.start()});

			var shackCorrectTimeTextLeft = 
				game.add.tween(correctTimeText).to({angle: -30}, 50, 
					Phaser.Easing.Bounce.Out);
			shackCorrectTimeTextLeft.onComplete.add(function() {
				shackCorrectTimeTextRight.start()});

			var scalePassBackground = 
				game.add.tween(passBackground.scale).to({x:1.25, y:1.25}, 
					500, Phaser.Easing.Bounce.Out, true);
			scalePassBackground.onComplete.add(function() {
				correctTimeText.visible = true;
				shackCorrectTimeTextLeft.start();
			});
		} else { // pass all
			var winMinuteHand = game.add.sprite(game.world.width * 0.61375, 
				game.world.height * 0.95, 'minuteHandLarge');
			winMinuteHand.anchor.setTo(0.55, 0.955);

			var winHourHand = game.add.sprite(game.world.width * 0.61375, 
				game.world.height * 0.95, 'hourHandLarge');
			winHourHand.anchor.setTo(0.5, 0.92);

			var congregationPassText = 
				game.add.sprite(game.world.width * 0.6125, 
					game.world.height * 0.6, 'congregationPassText');
			congregationPassText.scale.setTo(0.65, 0.65);
			congregationPassText.anchor.setTo(0.5, 0.5);
			congregationPassText.alpha = 0;

			var rotateWinMinuteHandRight = game.add.tween(winMinuteHand).to(
				{angle:50}, 100, Phaser.Easing.Linear.None, true, 1000);

			var rotateWinHourHandLeft = game.add.tween(winHourHand).to(
				{angle:-50}, 100, Phaser.Easing.Linear.None, true, 1000);

			var fadeIncongregationPassText = 
				game.add.tween(congregationPassText).to({alpha:1}, 100, 
					Phaser.Easing.Linear.None, true, 1000);
		}
	} else {
		loseDisplay(1);
	}
}

function nextLevelOnClick() {
	currentLevel++;
	currentScore += 10;
	game.state.start('play');
}

function replayOnClick() {
	game.state.start('play');
}

function loseDisplay(isEnterDown) {
	gameTimer.stop();

	enterButton.visible = false;

	var loseText = game.add.sprite(game.world.width * 0.6125, 0, 'loseText');
	loseText.scale.setTo(0.85, 0.85);
	loseText.anchor.setTo(0.5, 0.5);

	var loseTextBackground = game.add.sprite(game.world.width * 0.6125, 
		game.world.height * 0.911, 'loseTextBackground');
	loseTextBackground.scale.setTo(0.6, 0.6);
	loseTextBackground.anchor.setTo(0.5, 0.5);

	var currentTime = game.add.text(game.world.width * 0.81875, 
		game.world.height * 0.9, '', {font: 'bold 75px Arial', 
		fill: '#D35400'});
	currentTime.anchor.setTo(0.5, 0.5);

	var replayText = game.add.button(game.world.width * 0.825, 
		game.world.height * 0.775, 'replayText', replayOnClick);
	replayText.scale.setTo(1.25, 1.25);
	replayText.anchor.setTo(0.5, 0.5);
	replayText.alpha = 0;
	replayText.input.enabled = false;
	replayText.visible = false;

	if (!isEnterDown) {
		currentHour = (hourHand.angle < 0 ? 
			Math.floor((hourHand.angle + 360) / 30) : 
			Math.floor((hourHand.angle) / 30));
		currentMinute = (minuteHand.angle < 0 ? 
			(minuteHand.angle + 360) / 6 : minuteHand.angle / 6);
	}
	
	currentTime.text = (currentHour < 10 ? '0' + currentHour : 
		currentHour) + ':' + (currentMinute < 10 ? '0' + currentMinute : 
		currentMinute);

	var fadeInReplayText = game.add.tween(replayText).to(
		{alpha:1}, 100, Phaser.Easing.Linear.None);
	fadeInReplayText.onComplete.add(function() {
		replayText.input.enabled = true});

	var fallLoseText = game.add.tween(loseText).to(
		{y:game.world.height * 0.5}, 500, Phaser.Easing.Bounce.Out, true);
	fallLoseText.onComplete.add(function() {
		replayText.visible = true;
		fadeInReplayText.start();
	});
}