import Cookies from 'js-cookie';
import './navBar.js';

console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

init();

function init() {
	window.addEventListener('load', function () {
		initContactForm();
		checkCookieConsent();
	});
}

// ----- Contact form -----
function initContactForm() {
	let contactFormLinks = document.getElementsByClassName("contactLink");

	for (let i = 0; i < contactFormLinks.length; i++) {
		contactFormLinks[i].onclick = function () {
			overlayContactForm();
			return false;
		}
	}

	let contactForm = document.getElementById("contactForm");
	// stopPropagation to stop the contact form from disappearing if the form is clicked
	contactForm.addEventListener('click', function (e) {
		e.stopPropagation();
	});
	setupFormSubmission(contactForm);
}

function overlayContactForm() {
	const contactFormDiv = document.getElementById("contactFormDiv");

	contactFormDiv.onclick = function () {
		closeContactForm();
	}
	contactFormDiv.style.display = "block";

	// On mobile, prevent scrolling
	if (window.innerWidth < 768) {
		const html = document.getElementsByTagName('html')[0];
		html.setAttribute('style', 'overflow: hidden !important');
	}
}

function closeContactForm() {
	const contactFormDiv = document.getElementById("contactFormDiv");
	contactFormDiv.style.display = "none";
	document.body.style = "";

	const html = document.getElementsByTagName('html')[0];
	html.setAttribute('style', 'overflow: auto !important');
}

function setupFormSubmission(form) {
	const result = document.getElementById('result');

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		object.access_key = "d8cb0be5-68b2-4c0c-91e7-4f9f4a13e9ea";
		object.replyto = object.email;
		const json = JSON.stringify(object);
		result.innerText = "Please wait...";
		result.style.display = "block";

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		})
			.then(async (response) => {
				let json = await response.json();
				if (response.status == 200) {
					result.innerText = "Your message has been sent!";
				} else {
					console.log(response);
					result.innerText = json.message;
				}
				form.reset();
				setTimeout(() => {
					result.style.display = "none";
					closeContactForm();
				}, 3000);
			})
			.catch(error => {
				console.log(error);
				result.innerText = "Something went wrong!";
				setTimeout(() => {
					result.style.display = "none";
				}, 3000);
			});
	});
}

// ----- Cookies -----
function checkCookieConsent() {
	const cookieConsent = document.getElementById('cookieConsent');
	const acceptCookiesButton = document.getElementById('acceptCookiesButton');
	const declineCookiesButton = document.getElementById('declineCookiesButton');

	if (Cookies.get('cookieConsent') === undefined) {
		cookieConsent.style.display = 'block';

		acceptCookiesButton.addEventListener('click', function () {
			Cookies.set('cookieConsent', 'true', { expires: 365 });
			cookieConsent.style.display = 'none';
			cookiesAllowed();
		});

		declineCookiesButton.addEventListener('click', function () {
			// As per GDPR, we may ask the user again in 1 year
			Cookies.set('cookieConsent', 'false', { expires: 365 });
			cookieConsent.style.display = 'none';
		});

	} else if (Cookies.get('cookieConsent') === 'true') {
		cookiesAllowed();
	}
}

// Setup Google analytics if cookies are allowed
function cookiesAllowed() {
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}

	gtag("consent", "default", {
		ad_storage: "denied",
		analytics_storage: "granted",
	});

	gtag("js", new Date());
	gtag("config", "G-9K4WW3ECLR");
}
