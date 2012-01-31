var FriteCommand = require('../command').spawn({
	name: 'frite',
	description: "Oh, mais c'est une fonction bien secrète, vois-tu !",
	hidden: true,
	execute: function() {
		this.say("Tu as bien plus à manger chez moi, voyons ! http://www.youtube.com/watch?v=W8v8otWH_ZE")
	}
})

module.exports = FriteCommand