import React from 'react'

function RecommendationCard({ courseRecommends }) {

  const [recommends, setRecommends] = React.useState(courseRecommends);

  const handleIgnore = id => setRecommends(recommends.filter(r => r.id !== id));

  return (
    <ul className='recommendation-card-links'>
        { recommends.length ? recommends.map(courseRecommend => 
            <li key={courseRecommend.id}>
              <div className='recommendation-card-container'>
                <div className='recommendation-card-details'>
                  <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>{ courseRecommend.recommendationNote }</span> <br />
                </div>
                <div className='recommendation-card-thumb'>
                  <img alt='recommendation_thumb' src={ courseRecommend.thumbPath } style={{ borderRadius: "10px", zIndex: "10" }} />
                </div>
                <div className='recommendation-card-footer'>
                  <span onClick={() => handleIgnore(courseRecommend.id)} style={{ cursor: "pointer", fontWeight: "bold", backgroundColor: "black", color: "white", padding: "5px", paddingLeft: "15px", paddingRight: "15px", borderRadius: "5px" }}>Ignore</span> <br />
                </div>
            </div>
          </li>
        ) : <div>No recommendations for now :)</div>}
    </ul>
  )
}

export default RecommendationCard