// Mannekenpix le Belge — le cuisinier des Titans !
// MINT Team, 2012.

var Common = require('./common')
Common.xmppAccount = {jid: process.env.MANNEKENPIX_JID, password: process.env.MANNEKENPIX_PASSWORD}
require('./issues')
require('./lunches')
require('./announces')
require('./clients')

Common.start()