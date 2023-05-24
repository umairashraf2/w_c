document.addEventListener("DOMContentLoaded", function () {
	const inputImage = document.getElementById("inputImage");
	const image = document.getElementById("image");
	const croppedImage = document.getElementById("croppedImage");
	const crop = document.getElementById("crop");
	const width = document.getElementById("width-input");
	const height = document.getElementById("height-input");
	const verticalCheckbox = document.getElementById("verticalCheckbox");
	const horizontalCheckbox = document.getElementById("horizontalCheckbox");
	const verticalRotate = document.getElementById("verticalRotate");
	const horizontalRotate = document.getElementById("horizontalRotate");
	const preview = document.getElementById("preview");
	const demo1 = document.getElementById("demo1");
	const dwn = document.getElementById("dwn");
	const dwn2 = document.getElementById("dwn2");
	const grayscaleToggle = document.getElementById("grayscale-toggle");
	const previewImg = document.getElementById("preview-img");
	const closeModal = document.getElementById("close-modal");
	const y = document.getElementById("showContainer");
	// const images = document.querySelectorAll(".card img");
	// console.log(imadges.src);
	const images = document.querySelectorAll(".product--box");
	// const cropperImg = document.getElementById("cropper-img");
	const cropperModal = document.getElementById("cropper-modal");
	const cropperModalObject = new bootstrap.Modal(
		document.getElementById("cropper-modal")
	);
	let cropper;

	images.forEach(function (img) {
		img.addEventListener("click", function () {
			image.src = img.getElementsByTagName("img")[0].srcset;
			console.log(img.getElementsByTagName("img")[0], image.srcset);
			cropperModalObject.show();

			if (cropper) {
				cropper.destroy();
			}

			cropper = new Cropper(image, {
				viewMode: 2,
				autoCropArea: 1,

				crop: function (event) {
					demo1.innerHTML =
						"Width: " +
						Math.round(event.detail.width / 37) +
						"cm," +
						" Height: " +
						Math.round(event.detail.height / 37) +
						"cm";
				},
			});
		});
	});
	closeModal.addEventListener("click", function () {
		cropperModalObject.hide();
	});
	cropperModal.addEventListener("hidden.bs.modal", function (event) {
		if (cropper) {
			cropper.destroy();
		}
	});

	inputImage.addEventListener("change", (e) => {
		console.log("123");
		const file = e.target.files[0];
		if (file.size > 5 * 1024 * 1024) {
			// 5 MB in bytes
			alert("Please upload an image smaller than 5 MB.");
			return;
		}
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				image.src = e.target.result;
				if (cropper) cropper.destroy();
				cropper = new Cropper(image, {
					viewMode: 1,
					autoCropArea: 1,
					// aspectRatio: 1,
					// viewMode: 1,
					// autoCropArea: 1,
					// cropBoxMovable: false,
					// cropBoxResizable: false,
					// zoomOnTouch: false,
					// zoomOnWheel: false,
					// background color
					// aspectRatio: NaN,
					crop: function (event) {
						demo1.innerHTML =
							"<strong>Width:</strong> " +
							Math.round(event.detail.width) +
							"px" +
							" <strong>Height:</strong> " +
							Math.round(event.detail.height) +
							"px";
					},
				});
			};
			reader.readAsDataURL(file);
		}
	});

	function updateAspectRatio() {
		const cropBoxData = cropper.getCropBoxData();

		if (this.id === "width-input") {
			cropBoxData.width = parseInt(this.value) * 37.7952755906;
			console.log(cropBoxData.width / 37.7952755906);
		} else if (this.id === "height-input") {
			cropBoxData.height = parseInt(this.value) * 37.7952755906;
		}
		console.log(cropBoxData);

		cropper.setCropBoxData(cropBoxData);
	}

	width.addEventListener("input", updateAspectRatio);
	height.addEventListener("input", updateAspectRatio);

	verticalCheckbox.addEventListener("change", () => {
		if (verticalCheckbox.checked) {
			cropper.scaleY(-1);
		} else {
			cropper.scaleY(1);
		}
	});

	horizontalCheckbox.addEventListener("change", () => {
		if (horizontalCheckbox.checked) {
			cropper.scaleX(-1);
		} else {
			cropper.scaleX(1);
		}
	});

	verticalRotate.addEventListener("click", () => {
		cropper.rotate(-90);
	});

	horizontalRotate.addEventListener("click", () => {
		cropper.rotate(90);
	});

	document
		.getElementById("customRange1")
		.addEventListener("input", function () {
			// Get the zoom value from the input range
			const zoomValue = parseFloat(this.value);
			console.log(zoomValue);
			// Zoom in or out using Cropper.js's zoom method
			cropper.zoomTo(zoomValue);
			// Move canvas to the top-left corner
		});

	document
		.getElementById("fit-button")
		.addEventListener("click", function () {
			// Fit the image to the crop box
			cropper.reset();

			// Get the crop box data
			const cropBoxData = cropper.getCropBoxData();

			// Do something with the crop box data
			console.log(cropBoxData);
		});

	grayscaleToggle.addEventListener("change", function () {
		console.log(this.checked);
		i = document.querySelectorAll(".cropper-container img")[1];
		console.log(i);

		if (this.checked) {
			i.classList.add("grayscale");
			croppedImage.classList.add("grayscale");
			previewImg.classList.add("grayscale");
		} else {
			i.classList.remove("grayscale");
			croppedImage.classList.remove("grayscale");
			previewImg.classList.remove("grayscale");
		}
	});
	function showPreview() {
		if (y.style.display === "none") {
			y.style.display = "block";
			const croppedCanvas = cropper.getCroppedCanvas();
			const croppedImageURL = croppedCanvas.toDataURL("image/jpg");
			dwn2.href = croppedCanvas.toDataURL("image/jpg");
			// Update the live preview
			previewImg.src = croppedImageURL;
			image.addEventListener("crop", function () {
				const croppedCanvas = cropper.getCroppedCanvas();
				const croppedImageURL = croppedCanvas.toDataURL("image/jpg");
				dwn2.href = croppedCanvas.toDataURL("image/jpg");

				// Update the live preview
				previewImg.src = croppedImageURL;
			});
		} else {
			y.style.display = "none";
		}
	}
	document
		.getElementById("showPreview")
		.addEventListener("change", function () {
			if (this.checked) {
				showPreview();
			} else {
				y.style.display = "none";
			}
		});
	//hide y again click

	crop.addEventListener("change", () => {
		if (preview.style.display === "none") {
			console.log("clicked crop");
			let canvas = cropper.getCroppedCanvas();
			croppedImage.src = canvas.toDataURL("image/jpg");
			dwn.href = canvas.toDataURL("image/jpg");
			preview.style.display = "block";
		} else {
			preview.style.display = "none";
		}
	});
});
