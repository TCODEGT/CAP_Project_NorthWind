const cds = require('@sap/cds');
const my_libraries = require('./library/Functions');

module.exports = cds.service.impl(async function () {





    /************************
	***GET SKILLS FROM SSFF** 
	*************************/

	const { cust_suggested_skills } = this.entities;
	const service3 = await cds.connect.to('SSFFDEV2CustSkills');
	this.on('READ', cust_suggested_skills, request => {
		const LOG2 = cds.log('sql2');
		LOG2.info ('Cust_suggested_skills -READ request.query: '+ request.query);
		return service3.tx(request).run(request.query);
		
	});


    /************************
	***GET USERS FROM SSFF** 
	*************************/

	const { User } = this.entities;
	const service2 = await cds.connect.to('SSFFDEV2User');
	this.on('READ', User, request => {
		const LOG2 = cds.log('sql2');
		LOG2.info ('SSFFDEV2User -READ request.query: '+ request.query);
		return service2.tx(request).run(request.query);
		
	});

	
    /******************************
	***GET PRODUCTS FROM NORTHWIND** 
	********************************/

	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');

	this.on('READ', Products, request => {
		
		const LOG = cds.log('sql');
		LOG.info ('LOG.info: : Products - Read');
		//LOG.error ('LOG.error: : Products - Read');

		//console.log('CONSOLE.log : Products - Read');
		return service.tx(request).run(request.query);
		
	});

    /******************************
	***GET SUPPLIERS FROM NORTHWIND** 
	********************************/

	const { Suppliers } = this.entities;
	this.on('READ', Suppliers, request => {
        //const LOG = cds.log('sql');
		//LOG.info ('LOG.info: : Suppliers XXX- Read');
		return service.tx(request).run(request.query);
		
	});

	/***********************************
	*******FUNCTION AND ACTIONS********** 
	************************************/

	this.on('getInfo', async (req) => {
        //return JSON.stringify("hola");
		console.log("Log: getInfo");
		return "Data from Main JS";
    });

	this.on('getInfo_from_library', async (req) => {
		return my_libraries.getData();
    });

	this.on('getInfoUser_from_library', async (req) => {
		return "Data from Main JS";
		//return my_libraries.getDataUser(req);
    });

	this.on('getVariableEntorno', async (req) => {

		const myVaraibleEntorno = process.env.miVariableEntorno || "false"
       	return myVaraibleEntorno;
    });

	this.on('getLabelFromi18n', async (req) => {

	//	const locale = req.user.sap-locale;
	//	req.user.sap-locale;
	//	const bundle = new TextBundle('../i18n/i18n', 'en_GB');
	//	let texto= bundle.getText('milabeli18n');

       	return "MILABEL";  
    });


	
	



});