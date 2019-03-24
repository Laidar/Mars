$(document).ready(function() {
	$(".photos__item").on("click", function() {
		let imgPath = $(this).find("img").attr("src")
		let imgId = $(this).attr("data-id")

		$(".popup").find("img").attr("src", imgPath)
		$(".popup").attr("data-id", imgId)
		$(".popup").addClass("popup_active")

		$(".popup__navigate-item").removeClass("popup__navigate-item_disabled")
		if (imgId == $(".photos__item").length) {
			$(".popup__navigate-item_next").addClass("popup__navigate-item_disabled")
		}
		if (imgId == 1) {
			$(".popup__navigate-item_prev").addClass("popup__navigate-item_disabled")
		}
		// $("body").css({overflow: "hidden"})
	})

	$(".popup__close").on("click", function() {
		$(".popup").removeClass("popup_active")
	})
	
	$(".popup__navigate-item_next").on("click", function () {
		if (!$(this).hasClass("popup__navigate-item_disabled")) {
			navigatePhotos("next")
		}
	})
	$(".popup__navigate-item_prev").on("click", function() {
		if (!$(this).hasClass("popup__navigate-item_disabled")) {
			navigatePhotos("prev")
		}
	})

	$(".photos__items").slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		responsive: [
			{
				breakpoint: 769,
				settings: {
					arrows: false
				}
			  },
			{
			  breakpoint: 540,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
				arrows: false
			  }
			}
		]
	})


	$(".popup__img").on("click", function() {
		$(".popup__img").toggleClass("popup__img_big")
		$("body").toggleClass("body-hidden")
		$(".popup-container").toggleClass("popup-container_big")
		$(".popup__close").toggleClass("popup__close_hidden")
		$(".popup__navigate").toggleClass("popup__navigate_hidden")
	})

	// $('.popup__img img').draggable({ containment:".popup", scroll:false });
})

function navigatePhotos(nav) {
	
	let imgList = []
	let currentImgId = $(".popup").attr("data-id")

	$(".photos__item").each(function() {
		imgList.push([$(this).attr("data-id"), $(this).find("img").attr("src")])
	})

	$(".popup__navigate-item").removeClass("popup__navigate-item_disabled")

	if (nav == "next") {
		currentImgId = parseInt(currentImgId) + 1
	} else {
		currentImgId = parseInt(currentImgId) - 1
	}
	
	// if (currentImgId == imgList.length) {
	if (currentImgId == 10) {
		$(".popup__navigate-item_next").addClass("popup__navigate-item_disabled")
	}
	if (currentImgId == 1) {
		$(".popup__navigate-item_prev").addClass("popup__navigate-item_disabled")
	}

	$.each(imgList, function(index,value) {
		if (value[0] == currentImgId) {
			let nextImgId = parseInt(value[0])
			let nextImgSrc = value[1]
			
			$(".popup").find("img").attr("src", nextImgSrc)
			$(".popup").attr("data-id", nextImgId)
			return
		}
	})

}