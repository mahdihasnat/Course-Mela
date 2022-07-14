import React from 'react'
import RecommendationCard from './RecommendationCard'

const courseRecommends = [
    { id: 1, recommendationNote: "User Skipping", thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 2, recommendationNote: "Maybe Outdated?", thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 3, recommendationNote: "Decreasing Subscribers", thumbPath: require('../../../assets/coursethumb1.png') },
    { id: 4, recommendationNote: "Too Complicated?", thumbPath: require('../../../assets/coursethumb1.png') },
]

function Recommendations() {
  return (
    <div className='instr-recommendations'>
        <span className='courselist-title' style={{ margin: "25px", fontSize: "1.5rem", fontSize: "1.7rem", fontWeight: "bold", marginTop: "20px", textShadow: "1px 1px orange" }}>Recommendations</span>
        
        <ul className='recommendation-card-links'>
            { courseRecommends.map(course => 
                <li key={course.id}><RecommendationCard courseRecommend={course} /></li>
            ) }
        </ul>
    </div>
  )
}

export default Recommendations