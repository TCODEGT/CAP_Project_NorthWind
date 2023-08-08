const cds = require('@sap/cds');
const my_libraries = require('./library/Functions');
const log = require('cf-nodejs-logging-support');
log.setLoggingLevel("info");





module.exports = cds.service.impl(async function () {


	/************************
	***GET SKILLS FROM SSFF** 
	*************************/

	const { cust_suggested_skills } = this.entities;
	const service3 = await cds.connect.to('SSFFDEV2CustSkills');
	this.on('READ', cust_suggested_skills, request => {
		const LOG2 = cds.log('sql2');
		LOG2.info('Cust_suggested_skills -READ request.query: ' + request.query);
		log.info("Hello World");
		return service3.tx(request).run(request.query);
	});

	/*this.before('CREATE', cust_suggested_skills, request => {
	//	const data_request = req.data;
		console.log('Cust_suggested_skills - CREARE BEFORE request.query: ');
	//	return "OK BEFORE CREATE"; //service3.tx(request).run(request.query);
	});*/

	this.on('CREATE', cust_suggested_skills, request => {
	//	const data_request = req.data;
	console.log('Cust_suggested_skills - CREATE ON request.query: ');
		return "OK ON CREATE"; //service3.tx(request).run(request.query);
	});

	//this.on('CREATE', cust_suggested_skills, my_libraries.createDataPickList);


	/************************
	***GET USERS FROM SSFF** 
	*************************/

	const { User } = this.entities;
	const service2 = await cds.connect.to('SSFFDEV2User');
	this.on('READ', User, request => {
		const LOG2 = cds.log('sql2');
		LOG2.info('SSFFDEV2User -READ request.query: ' + request.query);
		return service2.tx(request).run(request.query);

	});


	/******************************
	***GET PRODUCTS FROM NORTHWIND** 
	********************************/

	const { Products } = this.entities;
	const service = await cds.connect.to('NorthWind');

	this.on('READ', Products, request => {

		const LOG = cds.log('sql');
		LOG.info('LOG.info: : Products - Read');
		//LOG.error ('LOG.error: : Products - Read');

		console.log('CONSOLE.log : Products - Read');
		return service.tx(request).run(request.query);

	});

	this.after('READ',Products, (each)=>{
		console.log("Check:" + Products);
		console.log("Productos AFTER READ ONE BY ONE event:" + each.ID);
		//modificamos el valor de lo que obtenemos
		each.Name = each.ID + ":field from logic custom";
	  })

	/******************************
	***GET SUPPLIERS FROM NORTHWIND** 
	********************************/

	const { Suppliers } = this.entities;
	this.on('READ', Suppliers, request => {
		//const LOG = cds.log('sql');
		//LOG.info ('LOG.info: : Suppliers XXX- Read');
		return service.tx(request).run(request.query);

	});

	/*this.after('READ', Suppliers, request => {
		console.log("Suppliers AFTER READ ALLS event");
	});

   */



	/*this.after('READ', Suppliers, (Suppliers) => {
		console.log("DATOS"+Suppliers);
		console.log("Suppliers ONLY ONCE"); //log onlye once for all entries
		for (let each of Suppliers) {
			console.log("Suppliers ONLY BY ONE");  //logic per row
			each.Location = each.ID + ":field from logic custom";
		}
		Suppliers.push({ID:"ID3",Name:"Name3"}); //add row
	})*/








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

	this.on('getJWT', async (req) => {
		return my_libraries.getJWT(req);
	});

	this.on('getDatafromUser', async (req) => {
		return my_libraries.getDatafromUser(req);
	});

	this.on('layoutValidation', (req) => {
		const { batch } = req.data;
		console.log(batch);
		req.reply('SUCCESS');
	});

	/*this.on('createDataPickList', async (req) => {
		return my_libraries.createDataPickList(req);
	});*/

	this.on('createDataPickListFunctions', async (req) => {
		return my_libraries.createDataPickList(req,'function');
	});

	this.on('createDataPickListActions', async (req) => {
		return my_libraries.createDataPickList(req,'action');
	});

	this.on('deleteDataPickListActions', async (req) => {
		return my_libraries.deleteDataPickList(req,'action');
	});

	this.on('deleteDataPickListFunctions', async (req) => {
		return my_libraries.deleteDataPickList(req,'function');
	});

	this.on('getDataPickListFunctions', async (req) => {
		return my_libraries.getDataPickList(req);
	});





});