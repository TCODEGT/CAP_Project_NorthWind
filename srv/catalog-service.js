const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');
	this.on('READ', Products, request => {

		const LOG = cds.log('sql');
		LOG.info ('LOG.info: : Products - Read');
		LOG.error ('LOG.error: : Products - Read');

		console.log('CONSOLE.log : Products - Read');
		return service.tx(request).run(request.query);
		
	});
});