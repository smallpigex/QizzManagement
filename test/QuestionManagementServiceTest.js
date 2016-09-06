var expect = require("chai").expect;
var service = require("../src/server/service/QuestionManagementService.js");

describe("test", function () {
	describe("add", function () {
		var svc = new service();
		var expectValue = {
			message: 'success'
		}
		svc.add(JSON.parse('{"_id":"","answer":"test","question":"test","correctOption":"test","badOption1":"test","badOption2":"test","badOption3":"test"}')
		, function (actual) {
			console.log(actual);
			expect(actual).to.deep.equal(expectValue);
		});
		
	})
})