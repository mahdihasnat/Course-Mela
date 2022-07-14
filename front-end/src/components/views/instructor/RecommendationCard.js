import React from 'react'

function RecommendationCard({ courseRecommend }) {
  return (
    <div className='recommendation-card-container'>
        <div className='recommendation-card-details'>
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{ courseRecommend.recommendationNote }</span> <br />
        </div>
        <div className='recommendation-card-thumb'>
          <img alt='recommendation_thumb' src={ courseRecommend.thumbPath } style={{ borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", zIndex: "100" }} />
        </div>
        <div className='recommendation-card-footer'>
          <span style={{ fontWeight: "bold", backgroundColor: "black", color: "white", padding: "5px", paddingLeft: "15px", paddingRight: "15px", borderRadius: "5px" }}>Ignore</span> <br />
        </div>
    </div>
  )
}

export default RecommendationCard