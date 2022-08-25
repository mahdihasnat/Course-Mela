export const getPayableAmountForACourse = (course) => {
	console.log({ course });
	return (
		course.coursePricing.subsFee *
		(1 - course.coursePricing.offPercent / 100)
	);
};

export const getTotalAmountForAllCourses = (cartCourses) => {
	console.log({ cartCourses });
	return cartCourses.reduce((acc, course) => {
		return acc + getPayableAmountForACourse(course);
	}, 0);
};

export const getTotalAmountWithPromo = (cartCourses, promoCode) => {
	console.log({ cartCourses, promoCode });

	let totalAmount = getTotalAmountForAllCourses(cartCourses);
	var downValue = 0;
	if (promoCode) {
		switch (promoCode.promoType) {
			case "PERCENTAGE":
				downValue = (totalAmount * promoCode.value) / 100;

				break;
			case "FIXED":
				downValue = promoCode.value;
				break;
			default:
				console.log("promoType not underStood");
				downValue = 0;
		}
		if (totalAmount >= promoCode.minimumPrice) {
			downValue = Math.min(downValue, promoCode.maximumDiscount);
		} else downValue = 0;
	}
	return totalAmount - downValue;
};
