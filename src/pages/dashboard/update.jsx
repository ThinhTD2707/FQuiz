import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Select,
  Avatar,
  Typography,
  Tabs,
  Input,
  Checkbox,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  BookmarkIcon,
  TrashIcon,
  CloudArrowUpIcon
} from "@heroicons/react/24/outline";

import { number } from "prop-types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { linkWithCredential } from "firebase/auth";
import { async } from "@firebase/util";
import Modal from './modal';
export function Update() {
  // const [formValues, setFormValues] = useState([{ titleQuestion: "", answer1: "", answer2: "" }])
  // const isoTime = currentTime.toISOString();
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }
  const universitiesList = [
    'FPT',
    'UEH',
    'BKU',
    'HBU',
    'HUTECH',
    'SGU',
    'UMP',
    'HCMUE',
    'NLS',
    'UTC',
    'HCMUTE'
  ];
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const categoriesList = [
    'Math',
    'Literature',
    'History',
    'Physics',
    'Chemistry',
    'Art',
    'Engineering',
    'Chinese',
    'English',
    'Technology',
    'Music',
    'Physical Education'];
  const accessToken = localStorage.getItem('token');
  const headerAxios = {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'accept': '*/*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    }
  };
  const [selectedCategories, setSelectedCategories] = useState("");


  const [course, setCourse] = useState(
    {
      category: "",
      description: "",
      name: "",
      questions: [
        {
          content: "",
          answerOption: "",
          answers: [
            {
              content: "",
              correct: true
            }
          ],
          updatedAt: ""
        }
      ],
      status: true,
      university: ""
    });


  function deleteQuestion(index) {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }

  function deleteAnswer(questionIndex, answerIndex) {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  }


  const handleNameChange = (event) => {
    setCourse({
      ...course,
      name: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setCourse({
      ...course,
      description: event.target.value,
    });
  };

  const handleCategoriesChange = (event) => {
    const value = event.target.value;
    setCourse(prevCourse => ({ ...prevCourse, category: event.target.value }));
  };
  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value); // update the selected university state based on the selected option value
    setCourse((prevState) => ({ ...prevState, university: event.target.value })); // update the course state with the selected university value
  };
  const handleStatusChange = (event) => {
    setCourse({
      ...course,
      status: event.target.checked,
    });
  };

  const addQuestionAndAnswer = () => {
    const newQuestion = {
      content: "",
      answerOption: "",
      answers: [
        {
          content: "",
          correct: false
        }
      ],
      updatedAt: ""
    };
    const newQuestions = [...course.questions, newQuestion];
    setCourse({
      ...course,
      questions: newQuestions
    });
  };

  const handleAnswerCorrectChange = (questionIndex, answerIndex) => {
    const newQuestions = [...course.questions];
    newQuestions[questionIndex].answers[answerIndex].correct =
      !newQuestions[questionIndex].answers[answerIndex].correct;
    setCourse({ ...course, questions: newQuestions });
  };

  function deleteQuestion(index) {
    setCourse(prevState => {
      const newQuestions = [...prevState.questions];
      newQuestions.splice(index, 1);
      return { ...prevState, questions: newQuestions };
    });
  }

  function deleteAnswer(questionIndex, answerIndex) {
    setCourse(prevState => {
      const newQuestions = [...prevState.questions];
      const question = { ...newQuestions[questionIndex] };
      const newAnswers = [...question.answers];
      newAnswers.splice(answerIndex, 1);
      question.answers = newAnswers;
      newQuestions[questionIndex] = question;
      return { ...prevState, questions: newQuestions };
    });
  }



  // console.log(course.category);
  const [param, setParam] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getCourseApi = () => {
      axios.get(
        `http://18.143.173.183:8080/course/getCourse/${id}`,
        headerAxios
      )
        .then(res => setCourse(res.data))
        .catch(err => console.log(err));
    };
    console.log('dem')
    getCourseApi();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resq = await axios.post(`http://18.143.173.183:8080/course/editCourse/${id}`,
        course, headerAxios
      );
      toast.success('Update Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      console.error(error);
    }
  }

  console.log(course);

  return (
    <div>
      <div>
        <Card className="max-w overflow-hidden rounded-md">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 rounded-none bg-light-blue-900 flex flex-row justify-between items-center"
          >
            <Typography variant="h3" color="white" className="p-3 text-white">
              UPDATE A QUIZ
            </Typography>
            <Button onClick={handleOpenModal}>Delete</Button>
      {modalOpen && <Modal onClose={handleCloseModal} />}
          </CardHeader>
          <CardBody >
            <div className="flex flex-col pb-3">
              <Typography className="font-bold">Title</Typography >
              <Input value={course.name} onChange={handleNameChange} placeholder="Enter a title, like Biology - chappter 4"></Input>
              <Typography className="font-bold">Description</Typography >
              <Input value={course.description} onChange={handleDescriptionChange} placeholder="Add a description"></Input>
              <Typography className="font-bold">Choose categories</Typography >
              <div class="relative h-10 w-72 min-w-[200px]">
                <select
                  onChange={handleCategoriesChange}
                  class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                  {categoriesList.map((category) => (
                    <option key={category} value={course.category}>
                      {category}
                    </option>
                  ))}
                </select>
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Select university
                </label>
              </div>
            </div>
            <Typography className="font-bold">Time Setting</Typography>
            <div className="flex gap-28">
              <div>
                <p>Time limit</p>
                <Input className=" lg:w-80" placeholder="Enter time limit"></Input>
                <p>University</p>
                <div class="relative h-10 w-72 min-w-[200px]">
                  <select value={selectedUniversity}
                    onChange={handleUniversityChange}
                    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-red-500 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50">
                    {universitiesList.map((university) => (
                      <option key={university} value={course.university}>
                        {university}
                      </option>
                    ))}
                  </select>
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Select university
                  </label>
                </div>
              </div>
              <div >
                <span>Price for quizz</span>
                <Input className=" lg:w-80" placeholder="50.000"></Input>
                <Checkbox checked={course.status} onChange={handleStatusChange} label="Privacy" />
              </div>
            </div>
            {course.questions.map((question, questionIndex) => (
              <Card className="mt-5 rounded-none" key={questionIndex}     >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none bg-light-blue-900 flex flex-row justify-between px-4">
                  <Typography variant="h3" color="white" className="p-3 text-white">Question {questionIndex + 1} </Typography>
                  {
                    questionIndex ?
                      <Button className="bg-transparent " onClick={() => deleteQuestion(questionIndex)}><TrashIcon className=" inline-block h-6 w-6" /></Button>
                      : null
                  }
                </CardHeader>

                <CardBody className="flex flex-col gap-4"  >
                  <Input name="titleQuestion" value={question.content}
                    onChange={(event) => {
                      const newQuestions = [...course.questions];
                      newQuestions[questionIndex].content = event.target.value;
                      setCourse({ ...course, questions: newQuestions });
                    }}
                    label="Question" size="lg" />

                  {/* Answer */}
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex flex-row justify-between ">
                      <div className="relative flex w-full max-w-[24rem]">
                        <Input type={Text} value={answer.content}
                          onChange={(event) => {
                            const newQuestions = [...course.questions];
                            newQuestions[questionIndex].answers[answerIndex].content =
                              event.target.value;
                            setCourse({ ...course, questions: newQuestions });
                          }}
                          name={"answer2" + (answerIndex + 1)} label={"Answer " + (answerIndex + 1)} size="lg" />
                        <Checkbox checked={answer.correct}
                          onChange={() =>
                            handleAnswerCorrectChange(questionIndex, answerIndex)
                          } defaultChecked />
                      </div>
                      {
                        answerIndex ?
                          <Button className=" " onClick={() => deleteAnswer(questionIndex, answerIndex)}><TrashIcon className=" inline-block h-6 w-6" /></Button>
                          : null
                      }
                    </div>
                  ))}

                  <Button onClick={() => {
                    const newQuestions = [...course.questions];
                    const newAnswer = { content: "", correct: false };
                    newQuestions[questionIndex].answers.push(newAnswer);
                    setCourse({ ...course, questions: newQuestions });
                  }}>Add more answer</Button>
                </CardBody>
              </Card>
            ))}

          </CardBody>
          <CardFooter>
            <Button fullWidth onClick={() => addQuestionAndAnswer()}>Add one more question</Button>
            <div className="flex flex-row mt-5 gap-5">
              <Button color="red" fullWidth >Cancel</Button>
              <Button variant="gradient" className="flex items-center gap-3" fullWidth onClick={handleSubmit}>
                <CloudArrowUpIcon strokeWidth={2} className="h-5 w-5" /> Upload Files
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
export default Update;