// Mannekenpix le Belge — le cuisinier des Titans !
// MINT Team, 2012.

var Common = require('./common')
Common.xmppAccount = {jid: process.env.MANNEKENPIX_JID, password: process.env.MANNEKENPIX_PASSWORD}
require('./issues')
require('./lunches')
require('./announces')
require('./clients')

process.on('uncaughtException', function(err) {
	console.error(err)
	consol.error("Had an uncaught exception. Restarting...")
	run()
})

function run() {
	Common.start()
}

run()
