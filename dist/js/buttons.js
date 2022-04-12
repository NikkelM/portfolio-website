export function initContactForm() {
	let contactFormLink = document.getElementById("contactLink");

	contactFormLink.onclick = function() {
		overlayContactForm();
		return false;
	}

	let contactForm = document.getElementById("contactForm");
	// stopPropagation to stop the whole contact form from disappearing if the form is clicked
	contactForm.addEventListener('click', function(e) {
		e.stopPropagation();
	})
}

function overlayContactForm() {
  document.getElementById("contactFormDiv").onclick = function() {
		document.getElementById("contactFormDiv").style.display = "none";
		document.body.style = "";
	}
  document.getElementById("contactFormDiv").style.display = "block";
	document.body.style = "overflow: hidden;";
}