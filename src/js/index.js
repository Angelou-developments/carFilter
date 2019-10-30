import CarFilter from "./CarFilter";

function component() {
	let elements = document.querySelectorAll(".js-car-layout");
	if (elements.length == 0) return;

    for (let i = 0; i < elements.length; i++) {
		new CarFilter(elements[i]);
    }
}

component();