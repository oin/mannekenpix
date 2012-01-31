var Command = require('../command')
var CoucouCommand = Command.spawn({
	name: 'coucou',
	description: "Présente-toi avant de profiter de mes services",
	willTellName: false,
	run: function(args) {
		if(this.willTellName) {
			this.detach()
			var name = args.join(' ')
			var info = this.client.getInfo()
			info['nick'] = name
			this.client.setInfo(info)
			this.client.state = KnownState.spawn()
			this.client.state.init(this.client)
			this.say("Salut, " + name + ", moi c'est Mannekenpix le Belge, cuisinier des Titans !")
			this.say("Pour savoir ce que tu peux me demander, écris help.")
		} else {
			Command.run.call(this, args) // super.run(args)
		}
	},
	execute: function() {
		this.say("Donne-moi ton nom complet.")
		this.willTellName = true
		this.attach()
	},
	help: function() {
		this.say("Dis-moi coucou, puis donne-moi ton nom (ne te trompe pas, c'est irréversible). Tu pourras ensuite profiter de mes services.")
	}
})

module.exports = CoucouCommand