import React, { useEffect, useState } from "react";
import {
    Typography,
    Alert,
    Card,
    CardHeader,
    CardBody,
    Checkbox,
    Button
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import UseAuth from "../../config/UseAuth";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export function Test() {
    const accessToken = localStorage.getItem('token');
    const { id } = useParams();
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
    const [answer, setAnswer] = useState({
        answerList: []
    });
    const [course, setCourse] = useState();
    const [question, setQuestion] = useState();
    const [grade, setGrade] = useState();

    useEffect(() => {
        const getAllCourseApi = () => {
            const token = localStorage.getItem('token');
            axios.get(
                `http://18.143.173.183:8080/course/getQuestion/${id}`,
                headerAxios
            )
                .then(res => setQuestion(res.data))
                // .then(res => setCourse(res.data))
                .catch(err => console.log(err));
        };
        getAllCourseApi();
    }, []);

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        const value = e.target.value;
        if (isChecked) {
            setAnswer({
                ...answer,
                answerList: [...answer.answerList, value]
            });
        } else {
            setAnswer({
                ...answer,
                answerList: answer.answerList.filter((item) => item !== value)
            });
        }
    };

    console.log(answer)

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const resq = await axios.post(`http://18.143.173.183:8080/answer/result/${id}`,
            answer,
            headerAxios
        );
        console.log(resq);
        setGrade(resq.data)
    } catch (error) {
        console.error(error);
    }
}


    return (
        <>
            <div className="mt-12">
                <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
                    <div className="flex flex-row-reverse gap-5 w-full">
                        {/* List question */}
                        {grade ? (
                            <Card className="w-[30%] overflow-hidden h-fit">
                                <CardHeader floated={false} shadow={false} className="mt-4">
                                    <Typography variant="h6" color="blue-gray">
                                        Your Score
                                    </Typography>
                                </CardHeader>
                                <CardBody className="flex flex-row flex-wrap p-4">
                                    <Typography color="blue" variant="h2">{grade}</Typography>
                                </CardBody>
                            </Card>
                        ) : null}


                        {/* do quiz */}



                        <div className="w-full flex flex-col gap-5">
                            {question && question.map((test, index) => (
                                <Card className="w-full overflow-hidden " key={index}>
                                    <CardHeader
                                        floated={false}
                                        shadow={false}
                                        className="mt-4 "
                                    >
                                        <Typography variant="h4" color="blue-gray">
                                            Question {index + 1}
                                        </Typography>
                                    </CardHeader>
                                    <CardBody className="">
                                        <Typography variant="h5" color="blue-gray">
                                            {test.content}
                                        </Typography>
                                        {test.answers.map((answer, answerIndex) => (
                                            <div className="flex flex-col text-lg" key={answerIndex}>
                                                <Checkbox
                                                    label={answer.content}
                                                    value={answer.id}
                                                    onChange={handleCheckboxChange} />
                                            </div>
                                        ))}
                                    </CardBody>
                                </Card>
                            ))}

                            <Button onClick={handleSubmit}>check grade</Button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Test;