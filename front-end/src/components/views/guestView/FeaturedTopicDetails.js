import React from 'react'

function FeaturedTopicDetails({ subject, chapters }) {
  return (
    <div style={{ paddingTop: "15px" }}>
        <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{ subject }</span>
        <ul style={{ padding: "0px", listStyleType: "none" }}>
            { chapters.map(chapter => 
                <li key={chapter.id}  style={{ paddingTop: "10px" }}>
                    <span style={{ paddingTop: "10px", fontSize: "1.05rem", textDecoration: "underline" }}>{chapter.title}</span>
                    <br />
                    <span style={{ fontSize: "0.9rem", opacity: "0.6" }}>{chapter.students} students</span>
                </li>
            ) }
        </ul>
    </div>
  )
}

export default FeaturedTopicDetails