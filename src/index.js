#! /usr/bin/env node
'use strict';

const puppeteer = require('puppeteer');
const USAGE = "\n\nUsage:\n\twhatsapp-cli \"Contact\" \"Message\"\n\nNote: Double quotation marks are needed for multiple words and special characters";
const argv = process.argv;

if (argv.length != 4) {
	console.error("Please provide the name of a WhatsApp contact and the message." + USAGE);
	process.exit(-1);
}

if (argv[3].length == 0) {
	console.error("Please provide a non-empty message." + USAGE);
	process.exit(-1);
}

const NAME = argv[2];
const MESSAGE = argv[3];

(async () => {
	const findContact = async () => {
		return page.evaluate((name) => {
			const chatTitles = document.querySelectorAll(".chat-title");
			for (let i = 0; i < chatTitles.length; ++i) {
				if (chatTitles[i].innerText === name) {
					return i;
				}
			}
			return null;
		}, NAME);
	};

	const textMessage = async (index) => {
		if (index !== null) {
			page.$$(".chat-title")
				.then((chatTitles) => {
					chatTitles[index].click();
				})
				.then(() => {
					page.waitForSelector(".pluggable-input-body").then(() => {
						page.$(".pluggable-input-body").then((input) => {
							input.click().then(() => {
								page.type(MESSAGE);
								page.$(".compose-btn-send").then((send) => {
									setTimeout(function () {
										setTimeout(function () {
											browser.close();
										}, 100);
									}, 500);
									send.click().then(() => {
									});
								})
							});
						});
					});
				})
				.catch((error) => { });
		} else {
			console.error(NAME + " is not in your list. You may need to start the first conversation manually.");
			browser.close();
		}
	}

	const browser = await puppeteer.launch({
		headless: false,
		userDataDir: './.user/',
	});
	const page = await browser.newPage();
	page.waitForSelector(".chat-title")
		.then(() => {
			findContact().then(textMessage);
		});
	page.on('load', () => {
		page.evaluate(() => {
			if (window.localStorage.getItem("WASecretBundle") === null) {
				console.log("Please login to your WhatsApp account for the first time using the automatically launch browser (it could be launched in the background.).\nAfter a successful login, you will not be required to login again!")
			}
		});
	});
	page.on("console", console.log);
	await page.goto('https://web.whatsapp.com', {
		networkIdleTimeout: 5000,
		waitUntil: 'networkidle',
		timeout: 3000000
	});
})();
