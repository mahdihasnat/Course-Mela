
 export const getPayableAmountForACourse = (course) => {
    console.log({course})
    return course.coursePricing.subsFee * ( 1- course.coursePricing.offPercent/100);
}


export const getTotalAmountForAllCourses = (cartCourses) => {
    console.log({cartCourses})
    return cartCourses.reduce((acc, course) => {
        return acc + getPayableAmountForACourse(course);
    } , 0)
}