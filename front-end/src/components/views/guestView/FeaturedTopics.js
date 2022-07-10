import React from 'react'
import FeaturedTopicDetails from './FeaturedTopicDetails'

const topics = [
    {
        id: 1,
        subject: "Physics",
        chapters: [
            {
                id: 1,
                title: "Work and Power",
                students: 372
            },
            {
                id: 2,
                title: "Thermodynamics-2",
                students: 236
            },
            {
                id: 3,
                title: "Vectors",
                students: 153
            },
        ]
    },
    {
        id: 2,
        subject: "Chemistry",
        chapters: [
            {
                id: 1,
                title: "Organic-3",
                students: 1002
            },
            {
                id: 2,
                title: "Redox-1.2",
                students: 646
            },
            {
                id: 3,
                title: "Laboratory",
                students: 78
            },
        ]
    },
    {
        id: 3,
        subject: "Biology",
        chapters: [
            {
                id: 1,
                title: "Chemical Bonds",
                students: 602
            },
            {
                id: 2,
                title: "Transcriptomics",
                students: 556
            },
        ]
    },
    {
        id: 4,
        subject: "Maths",
        chapters: [
            {
                id: 1,
                title: "Integration",
                students: 1553
            },
            {
                id: 2,
                title: "Trigonometry-5",
                students: 850
            },
            {
                id: 3,
                title: "Probability",
                students: 738
            },
        ]
    },
]

function FeaturedTopics() {
  return (
    <div style={{ marginTop: "20px" }}>
        <span className='courselist-title'>Featured topics by category</span>
        <ul className='featured-topics'>
            { topics.map(topic => 
                <li key={ topic.id }><FeaturedTopicDetails subject={topic.subject} chapters={topic.chapters} /></li>    
            ) }
        </ul>
    </div>
  )
}

export default FeaturedTopics