import React from 'react'
import { Grid } from '@mui/material'
import { ListSlide, SlideDetail } from '../../component/presentation'
import { useState } from 'react'

const sampledata = [
  {
      "id": 1,
      "slide_question": "What is the best programming language?",
      "slide_listAnswer": [
          {
              "answer": "Python",
              "Count": 10
          },
          {
              "answer": "Java",
              "Count": 5
          },
          {
              "answer": "JavaScript",
              "Count": 3
          }
      ],
      "name": "Slide 1",
      "type": "multichoice"
  },
  {
      "id": 2,
      "slide_question": "Which mobile operating system do you prefer?",
      "slide_listAnswer": [
          {
              "answer": "Android",
              "Count": 8
          },
          {
              "answer": "iOS",
              "Count": 7
          },
          {
              "answer": "Other",
              "Count": 2
          }
      ],
      "name": "Slide 2",
      "type": "multichoice"
  },
  {
      "id": 3,
      "slide_question": "What is your favorite color?",
      "slide_listAnswer": [
          {
              "answer": "Blue",
              "Count": 12
          },
          {
              "answer": "Red",
              "Count": 6
          },
          {
              "answer": "Green",
              "Count": 4
          }
      ],
      "name": "Slide 3",
      "type": "multichoice"
  },
  {
      "id": 4,
      "slide_question": "Which genre of movies do you enjoy the most?",
      "slide_listAnswer": [
          {
              "answer": "Action",
              "Count": 9
          },
          {
              "answer": "Comedy",
              "Count": 8
          },
          {
              "answer": "Drama",
              "Count": 3
          }
      ],
      "name": "Slide 4",
      "type": "multichoice"
  },
  {
      "id": 5,
      "slide_question": "What is your preferred mode of transportation?",
      "slide_listAnswer": [
          {
              "answer": "Car",
              "Count": 6
          },
          {
              "answer": "Public transportation",
              "Count": 9
          },
          {
              "answer": "Bicycle",
              "Count": 2
          }
      ],
      "name": "Slide 5",
      "type": "multichoice"
  },
  {
      "id": 6,
      "slide_question": "Which type of music do you listen to the most?",
      "slide_listAnswer": [
          {
              "answer": "Pop",
              "Count": 7
          },
          {
              "answer": "Rock",
              "Count": 6
          },
          {
              "answer": "Hip-hop",
              "Count": 4
          }
      ],
      "name": "Slide 6",
      "type": "multichoice"
  },
  {
      "id": 7,
      "slide_question": "What is your favorite pet?",
      "slide_listAnswer": [
          {
              "answer": "Dog",
              "Count": 10
          },
          {
              "answer": "Cat",
              "Count": 6
          },
          {
              "answer": "Fish",
              "Count": 2
          }
      ],
      "name": "Slide 7",
      "type": "multichoice"
  },
  {
      "id": 8,
      "slide_question": "Which sports do you enjoy playing?",
      "slide_listAnswer": [
          {
              "answer": "Football",
              "Count": 9
          },
          {
              "answer": "Basketball",
              "Count": 5
          },
          {
              "answer": "Tennis",
              "Count": 3
          }
      ],
      "name": "Slide 8",
      "type": "multichoice"
  },
  {
      "id": 9,
      "slide_question": "What is your favorite season?",
      "slide_listAnswer": [
          {
              "answer": "Summer",
              "Count": 7
          },
          {
              "answer": "Spring",
              "Count": 5
          },
          {
              "answer": "Autumn",
              "Count": 4
          }
      ],
      "name": "Slide 9",
      "type": "multichoice"
  },
  {
      "id": 10,
      "slide_question": "Which type of books do you prefer?",
      "slide_listAnswer": [
          {
              "answer": "Fiction",
              "Count": 8
          },
          {
              "answer": "Non-fiction",
              "Count": 6
          },
          {
              "answer": "Sci-fi",
              "Count": 2
          }
      ],
      "name": "Slide 10",
      "type": "multichoice"
  }
]


const EditPresentationPage = () => {
  const [list, setList] = useState(sampledata)
  const [selected, setSelected] = useState(list[0])
  const updateSlide = (slide) => {
    const newList = list.map((item) => {
      if (item.id === slide.id) {
        return slide;
      }
      return item;
    });
    setList(newList);
    setSelected(slide);
  };

  return (
    <Grid container  sx={{ maxWidth: "100vw", m: 0, p: 0}}>
      <Grid item xs={12} md={3}
      >
      <ListSlide list={list} setList={setList} selected={selected} setSelected={setSelected}/>
      </Grid>
      <Grid item xs={12} md={9} >
        <SlideDetail slide={selected} setSlide={setSelected} updateSlide={updateSlide}/>
      </Grid>
    </Grid>

  )
}

export default EditPresentationPage