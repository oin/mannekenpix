require('datejs')
require('./common')
Common.issueDatabase = require('dirty')('./data/issues.db')

Issue = {
	tag: null,
	id: null,
	date: null,
	by: null,
	fixed: false,
	fixedBy: null,
	fixedDate: null,
	message: null
}

Common.nextIssueId = function(tag) {
	var issues = Common.issuesFor(tag)
	return issues.length
}

Common.issuesFor = function(tag) {
	var x = Common.issueDatabase.get(tag)
	if(typeof(x) == 'undefined')
		return []
	return x
}

Common.issue = function(tag, id) {
	var issues = Common.issuesFor(tag)
	var found = null
	issues.forEach(function(i) {
		if(found === null)
			if(i.id === id)
				found = i
	})
	if(found != null)
		return found
	return Issue.spawn({ date: Date.today().toString("dddd dd MMMM"), tag: tag, id: id })
}

Common.saveIssue = function(x) {
	var issues = Common.issuesFor(x.tag)
	var found = false
	for(var i=0; !found && i<issues.length; i++) {
		if(issues[i].id === x.id) {
			issues[i] = x
			found = true
		}
	}
	if(!found)
		issues.unshift(x)
	return Common.issueDatabase.set(x.tag, issues)
}

Common.issueTags = function() {
	var tags = []
	Common.issueDatabase.forEach(function(tag, issues) {
		tags.unshift(tag)
	})
	return tags
}