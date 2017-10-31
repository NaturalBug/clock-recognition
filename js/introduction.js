var hourHand;
var hourHandDown;
var minuteHand;
var minuteHandDown;
var preAngle = 0;
var angle;

// Here we use the 'official name' (introductionState) when defining the state
var introductionState = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.P2JS);

		var gameBackground = game.add.sprite(0, 0, 'fontCoverLarge');
		 //gameBackground.tint = 0x808080;

		var sideBar = game.add.sprite(0, 0, 'sideBar');
		sideBar.scale.setTo(300 / sideBar.width, game.world.height / sideBar.height);
		//sideBar.tint = 0x808080;

		var questionBackground = game.add.sprite(game.world.width * 0.625, 
			game.world.height * 0.15, 'questionBackground');
		questionBackground.scale.setTo(1.25, 1.25);
		questionBackground.anchor.setTo(0.5, 0.5);
		//questionBackground.tint = 0x808080;

		var question = game.add.text(game.world.width * 0.6125, 
			game.world.height * 0.2125, '04:15', {font: 'bold 75px Arial', 
			fill: '#D35400'});
		question.anchor.setTo(0.5, 0.5);;
		//question.tint = 0x808080;

		var clock = game.add.sprite(game.world.width * 0.6125, 
			game.world.height * 0.625, 'clock');
		clock.scale.setTo(0.9, 0.9);
		clock.anchor.setTo(0.5, 0.5);
		//clock.tint = 0x808080;

		//this.point = new Phaser.Point();

		minuteHand = game.add.sprite(game.world.width * 0.61375,
			game.world.height * 0.625, 'minuteHandSmall');
		minuteHand.anchor.setTo(0.55, 0.955);
		minuteHand.inputEnabled = true;
		minuteHand.events.onInputDown.add(function() {minuteHandDown = true});
		minuteHand.events.onInputUp.add(adjustClock, this);
		/*minuteHand.inputEnabled = true;
		minuteHand.input.enableDrag();*/
		
		hourHand = game.add.sprite(game.world.width * 0.61375, 
			game.world.height * 0.625, 'hourHandSmall');
		hourHand.anchor.setTo(0.5, 0.92);
		hourHand.inputEnabled = true;
		hourHand.events.onInputDown.add(function() {hourHandDown = true});
		hourHand.events.onInputUp.add(adjustClock, this);

		var enterButton = game.add.button(game.world.width * 0.9, 
			game.world.height * 0.9, 'enterButton', enterOnClick, this, 0, 
			1);
		enterButton.scale.setTo(1.25, 1.25);
		enterButton.anchor.setTo(0.5, 0.5);
		//enterButton.inputEnabled = false;
		//enterButton.tint = 0x808080;
		
		/*
		var levelText = game.add.text(20, 10, 'Level', 
			{font: 'bold 40px Arial', fill: '#FFC300'});
		levelText.tint = 0x808080;
		*/
		var levelText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.1, 'levelText');
		levelText.scale.setTo(0.5, 0.5);
		levelText.anchor.setTo(0.5, 0.5);
		var level = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.2, '1', {font: 'bold 50px Arial', 
			fill: '#FFC300'});
		level.anchor.setTo(0.5, 0.5);
		//level.tint = 0x808080;
		
		/*
		var timeText = game.add.text(20, 110, 'TIME', 
			{font: 'bold 40px Arial', fill: '#FFC300'});
		timeText.tint = 0x808080;
		*/
		var remainingTimeText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.3, 'remainingTimeText');
		remainingTimeText.scale.setTo(0.5, 0.5);
		remainingTimeText.anchor.setTo(0.5, 0.5);
		var remainingTime = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.4, '0', {font: 'bold 50px Arial', 
			fill: '#FFC300'});
		remainingTime.anchor.setTo(0.5, 0.5);
		//remainingTime.tint = 0x808080;

		var scoreText = game.add.sprite(game.world.width * 0.1125, 
			game.world.height * 0.5, 'scoreText');
		scoreText.scale.setTo(0.5, 0.5);
		scoreText.anchor.setTo(0.5, 0.5);
		var score = game.add.text(game.world.width * 0.1125, 
			game.world.height * 0.6, '0', {font: 'bold 50px Arial', 
			fill: '#FFC300'});
		score.anchor.setTo(0.5, 0.5);

		var howToPlayButton = game.add.button(game.world.width * 0.1125, 
			game.world.height * 0.8, 'howToPlayButton', howToPlayOnClick, 
			this, 0, 1);
//		howToPlayButton.scale.setTo(0.9, 0.9);
		howToPlayButton.anchor.setTo(0.5, 0.5);
		//howToPlayButton.inputEnabled = false;
		//howToPlayButton.tint = 0x808080;

		/*
		var closeVoiceButton = game.add.button(15, 345, 'closeVoiceButton',
			closeVoiceOnClick, this, 0, 1);
		closeVoiceButton.scale.setTo(0.7, 0.7);
		closeVoiceButton.inputEnabled = false;
		closeVoiceButton.tint = 0x7B7D7D;

		var skipButton = game.add.button(15, 470, 'skipButton', skipOnClick, 
			this, 0, 1);
		skipButton.scale.setTo(0.7, 0.7);
		*/
	},

	update: function() {
		var p = game.input.activePointer;
		if (!p.isDown) {
			hourHandDown = false;
			minuteHandDown = false;
		} else if (hourHandDown) {
			angle = Phaser.Math.angleBetween(p.x, p.y, hourHand.x, 
				hourHand.y);
			hourHand.rotation = -angle;
			minuteHand.rotation = -angle * 12;
		} else if (minuteHandDown) {
			angle = Phaser.Math.angleBetween(p.x, p.y, minuteHand.x,
				minuteHand.y);
			minuteHand.rotation = -angle;
/*
			if (angle < 0) {
				if (preAngle < 0)
					hourHand.angle = hourHand.angle - (angle - preAngle) * 30 / Phaser.Math.PI2;
				else
					hourHand.angle = hourHand.angle + (angle + preAngle) * 30 / Phaser.Math.PI2;
			} else {
				if (preAngle > 0)
					hourHand.angle = hourHand.angle - (angle - preAngle) * 30 / Phaser.Math.PI2;
				else
					hourHand.angle = hourHand.angle + (angle + preAngle) * 30 / Phaser.Math.PI2;
			} 
*/			
			if (angle > 0) {
				if (preAngle > 0) { // correct
					hourHand.rotation = Math.floor(hourHand.angle / 30) * 
						Phaser.Math.PI2 / 12 + (Phaser.Math.PI2 - angle) 
						/ 12;
				} else {
					if (angle > 3) { // clockwise
						hourHand.rotation = Math.floor(hourHand.angle / 30) 
							* Phaser.Math.PI2 / 12 + 
							(Phaser.Math.PI2 - angle) / 12;
					} else { 
						hourHand.rotation = Math.floor(hourHand.angle / 30) 
							* Phaser.Math.PI2 / 12 - angle / 12;
					}
				}
			} else {
				if (preAngle > 0) {
					if (angle < 0 && angle > -3) { // clockwise
						hourHand.rotation =
							Math.floor(hourHand.angle / 30 + 1) * 
							Phaser.Math.PI2 / 12 - angle / 12;
					} else {
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
	},

	render: function() {
			game.debug.text('hourHand angle: ' + hourHand.angle, 256, 128);
			game.debug.text('minuteHand angle: ' + minuteHand.angle, 256, 160);
			game.debug.text('angle: ' + angle + ', preAngle: ' + preAngle, 256, 192);
			game.debug.text('time: ' + (hourHand.angle >= 0 ? 
				Math.floor(hourHand.angle / 30) : 
				Math.floor((hourHand.angle + 360) / 30)) + ':' + 
				(minuteHand.angle >= 0 ? Math.floor(minuteHand.angle / 6) :
				Math.floor((minuteHand.angle + 360) / 6)), 256, 224);
			game.debug.text('Clockwise: ' + isClockwise, 256, 256);
			game.debug.text('hourHand rotation: ' + hourHand.rotation, 256, 288);
	}
};

function howToPlayOnClick() {

}
/*
function closeVoiceOnClick() {

}

function skipOnClick() {

}
*/
function enterOnClick() {

}

function adjustClock() {
	var minuteTimes = Math.floor(minuteHand.angle / 30);
			
			if (minuteHand.angle - 30 * minuteTimes <= 
				30 * (minuteTimes + 1) - minuteHand.angle) {
				minuteHand.angle = minuteTimes * 30;
			} else {
				minuteHand.angle = (minuteTimes + 1) * 30;
			}

			var hourTimes = Math.floor(hourHand.angle / 30);
			if (minuteHand.angle > 0)
				hourHand.angle = hourTimes * 30 + minuteHand.angle / 12;
			else {
				if (minuteHand.angle == 0 && 
					hourHand.angle - 30 * hourTimes <= 
					30 * (hourTimes + 1) - hourHand.angle) {
					hourHand.angle = hourTimes * 30 + minuteHand.angle / 12;	
				} else {
					hourHand.angle = (hourTimes + 1) * 30 + 
						minuteHand.angle / 12;
				}
			}	
}