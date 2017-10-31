// Here we use the 'official name' (bootState) when defining the state
var bootState = {
	preload: function() {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	game.scale.pageAlignHorizontally = true;
    	game.scale.pageAlignVertically = true;

    	this.game.scale.setShowAll();
    	window.addEventListener('resize', function () {
    		this.game.scale.refresh();});
    	this.game.scale.refresh();
	},

	create: function() {
		game.state.start('load');
	}
}