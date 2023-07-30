const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

	const { User } = this.entities;
	const service2 = await cds.connect.to('SSFFDEV2User');
	this.on('READ', User, request => {
		const LOG2 = cds.log('sql2');
		LOG2.info ('SSFFDEV2User -READ request.query: '+ request.query);
		return service2.tx(request).run(request.query);
		
	});

	

	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');

	this.on('READ', Products, request => {
		
		const LOG = cds.log('sql');
		LOG.info ('LOG.info: : Products - Read');
		//LOG.error ('LOG.error: : Products - Read');

		//console.log('CONSOLE.log : Products - Read');
		return service.tx(request).run(request.query);
		
	});

	const { Suppliers } = this.entities;
	this.on('READ', Suppliers, request => {
        //const LOG = cds.log('sql');
		//LOG.info ('LOG.info: : Suppliers XXX- Read');
		return service.tx(request).run(request.query);
		
	});



	



});