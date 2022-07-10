import React from 'react'
import Carousel from '../../helper/Carousel'

const courses = [
    { id: 1, title: "Motion-2.0", teacher: "Hussain Mahbub", rating: 4.3, price: 150, discount: 0, thumbPath: require('../../../assets/coursethumb3.png') },
    { id: 2, title: "Statics", teacher: "Aminul Islam", rating: 4.0, price: 350, discount: 75, thumbPath: require('../../../assets/coursethumb2.png') },
    { id: 3, title: "Thermodynamics", teacher: "Jahangir Kabir", rating: 4.5, price: 100, discount: 0, thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 4, title: "Organic", teacher: "Jahangir Kabir", rating: 4.6, price: 100, discount: 30, thumbPath: require('../../../assets/coursethumb4.png') },
]


function Tron() {
  return (
    <div>
        <Carousel courses={courses} />
    </div>
  )
}

export default Tron