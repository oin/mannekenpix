var RepoCommand = require('../command').spawn({
	name: 'repo',
	description: "Donne des infos sur le repository",
	execute: function() {
		this.say("Ben... Vas-y toi-même ! http://interaction.lille.inria.fr/scm/hg-mint")
	}
})

module.exports = RepoCommand