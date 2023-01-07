const express = require('express');
const controllers = require('../controller/controllers');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');
const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

////////////////////////////////////////////

router.get('/', breadcrumbs.Middleware(), (req, res) => {
	res.render('index', { breadcrumbs: req.breadcrumbs });
});

router.get('/product-page', async (req, res) => {
	try {
		let results = await controllers.getAll();
		res.json(results);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

//
//
// Accessing the new database
//
//

router.get(
	'/product-page/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let camInfo = {};
			let movement = {};
			let camFeatures = {};
			let camFeaturesConcat = {};
			let audioVideo = {};
			let physical = {};
			let power = {};
			let certs = {};

			camInfo = await dbQuery.getAllInfo(req);
			movement = await dbQuery.getMovement(req);
			camFeaturesConcat = await dbQuery.getConcatFeatures(req);
			allFeatures = await dbQuery.getAllFeatures(req);
			audioVideo = await dbQuery.getAV(req);
			physical = await dbQuery.getPhysical(req);
			power = await dbQuery.getPower(req);
			certs = await dbQuery.getCerts(req);

			camInfo = camInfo[0];
			movement = movement[0];
			camFeatures = camFeatures[0];
			camFeaturesConcat = camFeaturesConcat[0];
			audioVideo = audioVideo[0];
			physical = physical[0];
			power = power[0];
			certs = certs[0];

			// var dataObj = {};

			// dataObj.camInfo = camInfo;
			// dataObj.movement = movement;
			// dataObj.allFeatures = camFeatures;
			// dataObj.camFeaturesConcat = camFeaturesConcat;
			// dataObj.audioVideo = audioVideo;
			// dataObj.physical = physical;
			// dataObj.power = power;
			// dataObj.certs = certs;

			// movement = controllers.removeFirst(movement);

			allFeatures = controllers.removeFirst(allFeatures);
			movement = controllers.removeProductCode(movement);
			physical = controllers.removeProductCode(physical);
			audioVideo = controllers.removeProductCode(audioVideo);
			power = controllers.removeProductCode(power);
			certs = controllers.removeProductCode(certs);

			noConcat = controllers.removeProp(allFeatures, `features_concat`);
			noConcat = noConcat[0];

			let allInfoKeys = controllers.listAllKeys(camInfo);
			let allMovementKeys = controllers.listAllKeys(movement);
			let allFeatureKeys = controllers.listAllKeys(noConcat);
			let allAvKeys = controllers.listAllKeys(audioVideo);
			let allPhysKeys = controllers.listAllKeys(physical);
			let allPowerKeys = controllers.listAllKeys(power);
			let allCertsKeys = controllers.listAllKeys(certs);

			let deadInfoKeys = controllers.filterDead(camInfo);
			let deadMovementKeys = controllers.filterDead(movement);
			let deadFeaturekeys = controllers.filterDead(noConcat);
			let deadAvKeys = controllers.filterDead(audioVideo);
			let deadPhysicalKeys = controllers.filterDead(physical);
			let deadPowerKeys = controllers.filterDead(power);
			let deadCertsKeys = controllers.filterDead(certs);

			let allInfoVals = controllers.listAllVals(camInfo);
			let allMovementVals = controllers.listAllVals(movement);
			let allFeaturesVals = controllers.listAllVals(noConcat);
			let allAvVals = controllers.listAllVals(audioVideo);
			let allPhysVals = controllers.listAllVals(physical);
			let allPowerVals = controllers.listAllVals(power);
			let allCertsVals = controllers.listAllVals(certs);

			let newInfoKeys = [];
			let newMovementKeys = [];
			let newFeaturesOnlyKeys = [];
			let newAvKeys = [];
			let newPhysKeys = [];
			let newPowerKeys = [];
			let newCertsKeys = [];

			newInfoKeys = allInfoKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadInfoKeys.length; i++) {
					if (value === deadInfoKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newMovementKeys = allMovementKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadMovementKeys.length; i++) {
					if (value === deadMovementKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newFeaturesOnlyKeys = allFeatureKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadFeaturekeys.length; i++) {
					if (value === deadFeaturekeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newAvKeys = allAvKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadAvKeys.length; i++) {
					if (value === deadAvKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPhysKeys = allPhysKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysicalKeys.length; i++) {
					if (value === deadPhysicalKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newCertsKeys = allCertsKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadCertsKeys.length; i++) {
					if (value === deadCertsKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newInfoVals = [];
			let newMovementVals = [];
			let newFeaturesOnlyVals = [];
			let newAvVals = [];
			let newPhysVals = [];
			let newPowerVals = [];
			let newCertsVals = [];
			let constDeadVals = ['*', 'n/a', ''];

			newInfoVals = allInfoVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newMovementVals = allMovementVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newFeaturesOnlyVals = allFeaturesVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newAvVals = allAvVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newCertsVals = allCertsVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalInfo = {};
			let finalMovement = {};
			let finalFeatures = {};
			let finalAV = {};
			let finalPhys = {};
			let finalPower = {};
			let finalCerts = {};

			finalInfo = Object.fromEntries(
				newInfoKeys.map((a, i) => [a, newInfoVals[i]])
			);

			finalMovement = Object.fromEntries(
				newMovementKeys.map((a, i) => [a, newMovementVals[i]])
			);

			finalFeatures = Object.fromEntries(
				newFeaturesOnlyKeys.map((a, i) => [a, newFeaturesOnlyVals[i]])
			);

			finalAV = Object.fromEntries(newAvKeys.map((a, i) => [a, newAvVals[i]]));

			finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);

			finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);

			finalCerts = Object.fromEntries(
				newCertsKeys.map((a, i) => [a, newCertsVals[i]])
			);

			let featuresArray = [];
			let movementArray = [];
			let avArray = [];
			let physArray = [];
			let powerArray = [];
			let certsArray = [];

			Object.values(finalFeatures).forEach(val => {
				featuresArray.push(val);
			});
			Object.values(finalMovement).forEach(val => {
				movementArray.push(val);
			});
			Object.values(finalAV).forEach(val => {
				avArray.push(val);
			});
			Object.values(finalPhys).forEach(val => {
				physArray.push(val);
			});

			Object.values(finalPower).forEach(val => {
				powerArray.push(val);
			});

			Object.values(finalCerts).forEach(val => {
				certsArray.push(val);
			});

			function isArrayEmpty(array) {
				let constError = 'No Data Available';
				if (array.length < 1) {
					array.push(constError);
				} else {
					array = array;
				}
			}

			// console.log(Object.entries(finalMovement).length);
			// res.send(finalMovement);
			// return
			// // isArrayEmpty()

			let finalObj = {};

			finalObj.info = finalInfo;
			finalObj.movement = finalMovement;
			finalObj.features = finalFeatures;
			finalObj.AV = finalAV;
			finalObj.physical = finalPhys;
			finalObj.power = finalPower;
			finalObj.certs = finalCerts;

			// res.send(finalInfo.description);
			// return;

			// console.log(allFeatures.length);

			// res.send(finalObj);

			// return;
			// console.log(av.length);

			res.render('product-pages/main-prod-page', {
				data: finalObj,
				av: finalAV,
				movement: finalMovement,
				physical: finalPhys,
				power: finalPower,
				certs: finalCerts,
				features: featuresArray,
				breadcrumbs: req.breadcrumbs
			});
		} catch (e) {
			console.log(e);
			return res.render('index');
		}
	}
);

// more product routes

router.get(
	'/products/cctv/cctv-transmission/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let info = await dbQuery.getData(
				'SELECT * FROM `eth_info` WHERE product_code = ?',
				[req.params.product_code]
			);
			let features = await dbQuery.getData(
				'SELECT * FROM `ethernet_features` WHERE product_code = ?',
				[req.params.product_code]
			);
			let interface = await dbQuery.getData(
				'SELECT * FROM `ethernet_interface` WHERE product_code = ?',
				[req.params.product_code]
			);
			let eth_interface = await dbQuery.getData(
				'SELECT * FROM `ethernet_eth_interface` WHERE product_code = ?',
				[req.params.product_code]
			);
			let led = await dbQuery.getData(
				'SELECT * FROM `ethernet_led` WHERE product_code = ?',
				[req.params.product_code]
			);
			let onboard = await dbQuery.getData(
				'SELECT * FROM `ethernet_onboard` WHERE product_code = ?',
				[req.params.product_code]
			);
			let physical = await dbQuery.getData(
				'SELECT * FROM `ethernet_physical` WHERE product_code = ?',
				[req.params.product_code]
			);
			let power = await dbQuery.getData(
				'SELECT * FROM `ethernet_power` WHERE product_code = ?',
				[req.params.product_code]
			);

			// features = features[0];
			interface = interface[0];
			eth_interface = eth_interface[0];
			led = led[0];
			onboard = onboard[0];
			physical = physical[0];
			power = power[0];

			let noConcat = controllers.removeProp(features, `features_concat`);

			noConcat = controllers.removeFirst(noConcat);

			noConcat = noConcat[0];

			// keys

			let allFeatureKeys = controllers.listAllKeys(noConcat);
			let allInterfaceKeys = controllers.listAllKeys(interface);
			let allEthInterfaceKeys = controllers.listAllKeys(eth_interface);
			let allLedKeys = controllers.listAllKeys(led);
			let allOnboardKeys = controllers.listAllKeys(onboard);
			let allPhysicalKeys = controllers.listAllKeys(physical);
			let allPowerKeys = controllers.listAllKeys(power);

			// dead keys

			let deadFeaturekeys = controllers.filterDead(noConcat);
			let deadInterfaceK = controllers.filterDead(interface);
			let deadEthInterfaceK = controllers.filterDead(eth_interface);
			let deadLedKeys = controllers.filterDead(led);
			let deadOnboardKeys = controllers.filterDead(onboard);
			let deadPhysicalKeys = controllers.filterDead(physical);
			let deadPowerKeys = controllers.filterDead(power);

			// new keys

			let newFeaturesOnlyKeys = allFeatureKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadFeaturekeys.length; i++) {
					if (value === deadFeaturekeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newInterfaceKeys = allInterfaceKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadInterfaceK.length; i++) {
					if (value === deadInterfaceK[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newEthKeys = allEthInterfaceKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadEthInterfaceK.length; i++) {
					if (value === deadEthInterfaceK[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newLedKeys = allLedKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadLedKeys.length; i++) {
					if (value === deadLedKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOBKeys = allOnboardKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadOnboardKeys.length; i++) {
					if (value === deadOnboardKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysKeys = allPhysicalKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysicalKeys.length; i++) {
					if (value === deadPhysicalKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// values

			let allFeatureVals = controllers.listAllVals(noConcat);
			let allInterfaceVals = controllers.listAllVals(interface);
			let allIntEthVals = controllers.listAllVals(eth_interface);
			let allLedVals = controllers.listAllVals(led);
			let allOBVals = controllers.listAllVals(onboard);
			let allPowerVals = controllers.listAllVals(power);
			let allPhysVals = controllers.listAllVals(physical);
			let constDeadVals = ['*', 'n/a', ''];

			// new vals

			let newFeaturesOnlyVals = allFeatureVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newIntVals = allInterfaceVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newEthIntVals = allIntEthVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newLedVals = allLedVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOBVals = allOBVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalInterface = Object.fromEntries(
				newInterfaceKeys.map((a, i) => [a, newIntVals[i]])
			);

			let finalEthInt = Object.fromEntries(
				newEthKeys.map((a, i) => [a, newEthIntVals[i]])
			);

			let finalLED = Object.fromEntries(
				newLedKeys.map((a, i) => [a, newLedVals[i]])
			);

			let finalOB = Object.fromEntries(newOBKeys.map((a, i) => [a, newOBVals[i]]));

			let finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);
			let finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);

			let finalObj = {};

			// res.send(finalInterface)
			// return

			finalObj.info = info;
			finalObj.features = newFeaturesOnlyVals;
			finalObj.interface = finalInterface;
			finalObj.ethInt = finalEthInt;
			finalObj.LED = finalLED;
			finalObj.OB = finalOB;
			finalObj.physical = finalPhys;
			finalObj.power = finalPower;

			// res.send(finalEthInt)
			// return

			res.render('product-pages/ethernet-product-page', {
				data: finalObj,
				features: newFeaturesOnlyVals,
				interface: finalInterface,
				ethInt: finalEthInt,
				OB: finalOB,
				LED: finalLED,
				phys: finalPhys,
				power: finalPower,
				breadcrumbs: req.breadcrumbs,
		})

		} catch (e) {
			console.log(e);
			return res.render('index');
		}
	}
);

router.get('/contact-us', breadcrumbs.Middleware(), (req, res) => {
	res.render('contact', { breadcrumbs: req.breadcrumbs });
});

router.get('/layout', (req, res) => {
	res.render('layout');
});

router.get('/docker-test', (req, res) => {
	res.send('<h1>WORKING  </h1>');
});

router.get('/about', breadcrumbs.Middleware(), (req, res) => {
	res.render('about', { breadcrumbs: req.breadcrumbs });
});

// router.get('/marine', breadcrumbs.Middleware(), (req, res) => {
// 	res.render('marine', { breadcrumbs: req.breadcrumbs });
// });

router.get('/marine', breadcrumbs.Middleware(), async (req, res) => {
	try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "marine" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
	}

	res.render('marine', {
		data: data,
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/law-enforcement', (req, res) => {
	res.render('law');
});

router.get('/parking', (req, res) => {
	res.render('parking');
});

router.get('/security', breadcrumbs.Middleware(), (req, res) => {
	res.render('security', { breadcrumbs: req.breadcrumbs });
});

router.get('/hazardous-areas', breadcrumbs.Middleware(), async (req, res) => {
	try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "hazardous" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
	}

	res.render('hazardous-areas', {
		data: data,
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/products', breadcrumbs.Middleware(), (req, res) => {
	res.render('product-category', {
		breadcrumbs: req.breadcrumbs
	});
});

// CCTV categories
//
//
//

router.get('/products/cctv', breadcrumbs.Middleware(), (req, res) => {
	res.render('cctv', { breadcrumbs: req.breadcrumbs });
});

router.get('/products/cctv/cameras', breadcrumbs.Middleware(), (req, res) => {
	res.render('cameras', { breadcrumbs: req.breadcrumbs });
});

//  CAMERA HOUSINGS PAGE

router.get(
	'/products/cctv/camera-housings',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM `housings_info`';
			data = await dbQuery.genericQuery(sqlQuery);

			res.render('camera-housings', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// ////////////////

// ////////////////

router.get(
	'/products/cctv/cctv-recording-analytics',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = "SELECT * FROM nvr_info WHERE `monitor_type` != 'station' ";
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('cctv-recording', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// router.get('/products/cctv/cctv-analytics', (req, res) => {
// 	res.render('cctv-analytics');
// });

router.get('/products/cctv/...', breadcrumbs.Middleware(), async (req, res) => {
	try {
		let data = {};
		let sqlQuery = 'SELECT * FROM ...';
		data = await dbQuery.genericQuery(sqlQuery);
		// res.send(data);
		// return;
		res.render('...', {
			data: data,
			breadcrumbs: req.breadcrumbs
		});
	} catch (error) {
		console.log(error);
	}
});

router.get(
	'/products/cctv/cctv-accessories',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM acc_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('cctv-accessories', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

router.get(
	'/products/cctv/cctv-recording-analytics/storage',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM nvr_disk_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('nvr-disk', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

router.get(
	'/products/cctv/security-management-software',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('management-software', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/cctv/cctv-transmission',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let ethData = {};
			let cableData = {};
			ethData = await dbQuery.genericQuery('SELECT * FROM eth_info');
			cableData = await dbQuery.genericQuery('SELECT * FROM cables_all');

			res.render('cctv-transmission', {
				ethData: ethData,
				cableData: cableData,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// marine cables

router.get(
	'/products/cctv/marine-grade-cables',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM nvr_disk_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('nvr-disk', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

//  Marine Category Route

router.get('/marine-categories', breadcrumbs.Middleware(), (req, res) => {
	res.render('marine-categories', { breadcrumbs: req.breadcrumbs });
});

//
//
//
//
// camera categories routes
//
//
//
//
//

router.get('/products/cctv/cameras/', breadcrumbs.Middleware(), (req, res) => {
	res.render('cameras', { breadcrumbs: req.breadcrumbs });
});

router.get(
	'/products/cctv/cameras/prison-cell',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('prison-cell', { breadcrumbs: req.breadcrumbs });
	}
);

// Marine Camera Product Route
router.get(
	'/products/cctv/cameras/marine-cameras',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery =
				'SELECT `product_name`, `product_code`, image FROM info WHERE category = "marine" ';
			data = await dbQuery.genericQuery(sqlQuery);

			res.render('marine-cameras', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			consolee.log(error);
		}
	}
);

router.get(
	'/products/cctv/cameras/hazardous-environment',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			var data = {};
			var sqlQuery = 'SELECT *_link FROM info WHERE category = "hazard" ';
			data = await dbQuery.genericQuery(sqlQuery);
		} catch (error) {
			consolee.log(error);
		}

		res.render('hazardous-areas', {
			data: data,
			breadcrumbs: req.breadcrumbs
		});
	}
);

router.get(
	'/products/cctv/cameras/thermal-cameras',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('thermal-cameras', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/cctv/cameras/commercial',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('commercial-cameras', { breadcrumbs: req.breadcrumbs });
	}
);

//
//
//
//

router.get('/products/camera-collection', breadcrumbs.Middleware(), (req, res) => {
	res.render('cameras-collection', { breadcrumbs: req.breadcrumbs });
});

router.get('/products/access-control', breadcrumbs.Middleware(), (req, res) => {
	res.render('access', { breadcrumbs: req.breadcrumbs });
});

// READERS COLLECTION
router.get(
	'/products/access-control/readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('readers-collection', { breadcrumbs: req.breadcrumbs });
	}
);

// READERS CATERGORY PAGES
router.get(
	'/products/access-control/readers/proximity-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('proximity-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/qr',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('qr-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/bluetooth-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('bluetooth-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/poe-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('poe-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/fingerprint-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('fingerprint-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/pin-keypad-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('pin-keypad-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/universal-proximity-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('universal-proximity', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/readers/facial-recognition-readers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('facial-recognition-readers', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/door-controllers',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('door-controllers-collection', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/wireless-locks',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('wireless-locks', { breadcrumbs: req.breadcrumbs });
	}
);

// router.get('/products/access-control/wireless-locks', (req, res) => {
// 	res.render('wireless-locks');
// });

router.get(
	'/products/access-control/access-control-software',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('access-control-software-collection', {
			breadcrumbs: req.breadcrumbs
		});
	}
);

router.get(
	'/products/access-control/anpr',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('anpr', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/anpr/anpr-cameras',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('anpr-cameras', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/anpr/anpr-software',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('anpr-software', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/anpr/anpr-signage',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('anpr-signage', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/access-control/anpr/vehicle-counting',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('vehicle-counting', { breadcrumbs: req.breadcrumbs });
	}
);

router.get(
	'/products/interview-recorders',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('interview-recorders', { breadcrumbs: req.breadcrumbs });
	}
);

router.get('/products/visitor-management', breadcrumbs.Middleware(), (req, res) => {
	res.render('visitor-management', { breadcrumbs: req.breadcrumbs });
});

router.get('/products/panic-alarms', breadcrumbs.Middleware(), (req, res) => {
	res.render('panic-alarms', { breadcrumbs: req.breadcrumbs });
});

router.get('/contact', breadcrumbs.Middleware(), (req, res) => {
	res.render('contact', { breadcrumbs: req.breadcrumbs });
});

router.get('/frequently-asked', breadcrumbs.Middleware(), (req, res) => {
	res.render('faq', { breadcrumbs: req.breadcrumbs });
});

router.get('/sell', breadcrumbs.Middleware(), (req, res) => {
	res.render('sell', { breadcrumbs: req.breadcrumbs });
});

router.get('/terms-conditions', breadcrumbs.Middleware(), (req, res) => {
	res.render('terms', { breadcrumbs: req.breadcrumbs });
});

// SERVICES ROUTES

router.get('/services', breadcrumbs.Middleware(), (req, res) => {
	res.render('services-collection', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/system-design', breadcrumbs.Middleware(), (req, res) => {
	res.render('system-design-build', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/service-support', breadcrumbs.Middleware(), (req, res) => {
	res.render('service-support', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/installations', breadcrumbs.Middleware(), (req, res) => {
	res.render('installations', { breadcrumbs: req.breadcrumbs });
});

router.get(
	'/services/cctv-alarm-monitoring',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('cctv-alarm-monitoring', { breadcrumbs: req.breadcrumbs });
	}
);

router.get('/services/training', breadcrumbs.Middleware(), (req, res) => {
	res.render('training', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/consultancy', breadcrumbs.Middleware(), (req, res) => {
	res.render('consultancy', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/risk', breadcrumbs.Middleware(), (req, res) => {
	res.render('risk-assessment', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/risk/security-risk', breadcrumbs.Middleware(), (req, res) => {
	res.render('security-risk', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/risk/fire-risk', breadcrumbs.Middleware(), (req, res) => {
	res.render('fire-risk', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/site-maintenance', breadcrumbs.Middleware(), (req, res) => {
	res.render('site-maintenance', { breadcrumbs: req.breadcrumbs });
});

// resources routes

router.get('/resources', breadcrumbs.Middleware(), (req, res) => {
	res.render('resources', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/datasheets', breadcrumbs.Middleware(), (req, res) => {
	res.render('datasheets', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/gallery', breadcrumbs.Middleware(), (req, res) => {
	res.render('gallery', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/knowledge', breadcrumbs.Middleware(), (req, res) => {
	res.render('knowledge-centre', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/tools', breadcrumbs.Middleware(), (req, res) => {
	res.render('tools', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/press', breadcrumbs.Middleware(), (req, res) => {
	res.render('press', { breadcrumbs: req.breadcrumbs });
});

module.exports = router;
