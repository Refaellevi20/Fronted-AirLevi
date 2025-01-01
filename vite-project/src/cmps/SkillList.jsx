import React from 'react';

const skills = [
  "React",
  "Angular",
  "Vue",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "MongoDB",
  "MongoAtlas",
  "SQL"
]

export function SkillList() {
  return (
    <ul className="skills-list">
      {skills.map((skill, index) => (
        <li key={index} className="skill-item">{skill}</li>
      ))}
    </ul>
  )
}

