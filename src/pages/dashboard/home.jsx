import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Checkbox,
  Button
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

import UseAuth from "../../config/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export function Home() {
  const currentUser = UseAuth();
  const navitage = useNavigate();
  const handleClick = (e) => {
    navitage(`/dashboard/update/${e}`);
  }
  // console.log(currentUser);
  const [course, setCourse] = useState();
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState({
    answerList: []
  });

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


  useEffect(() => {
    const getAllCourseApi = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/course/getCourses`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'accept': '*/*',

            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
          }
        }
      )
        .then(res => setCourse(res.data))
        .catch(err => console.log(err));
    };
    getAllCourseApi();
  }, []);

  useEffect(() => {
    const getAllCourseApi = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/course/getQuestion/19`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'accept': '*/*',

            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
          }
        }
      )
        .then(res => setQuestion(res.data))
        .catch(err => console.log(err));
    };
    getAllCourseApi();
  }, []);


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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resq = await axios.post('http://18.143.173.183:8080/answer/result/19',
      answer
        ,
          headerAxios
      );
      console.log(resq);
      // navitage("/dashboard/update")
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-2">
        {/* {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))} */}
        {course && course.map((item) => (
          <div className="flex flex-col bg-gray-50 shadow-xl p-3 gap-2" onClick={() => handleClick(item.id)}>
            <div className="font-bold text-xl">{item.name}
            </div>
            <div>{item.description}</div>
            <div>{item.university}, {item.category}</div>
          </div>
        ))}

        
        <div className="flex flex-row-reverse gap-5">
          <Card className="w-[30%] overflow-hidden h-fit">
            <CardHeader
              floated={false}
              shadow={false}
              className="mt-4 ">
              <Typography variant="h5" color="blue-gray">
                List questions
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-row flex-wrap p-2 gap-2">
              <Button size="sm" >1</Button>
              <Button size="sm" >2</Button>
              <Button size="sm" >3</Button>
              <Button size="sm" >4</Button>
              <Button size="sm" >5</Button>
              <Button size="sm" >6</Button>
              <Button size="sm" >7</Button>
              <Button size="sm" >8</Button>
              <Button size="sm" >9</Button>
              <Button size="sm" >10</Button>
            </CardBody>
          </Card>
          {/* do quiz */}
          {question && question.map((test, index) => (
          <Card className="w-full overflow-hidden " key={index}>
            <CardHeader
              floated={false}
              shadow={false}
              className="mt-4 "
            >
              <Typography variant="h4" color="blue-gray">
                Question {index + 1 }
              </Typography>
            </CardHeader>
            <CardBody className="">
              <Typography variant="h5" color="blue-gray">
                {test.content}
              </Typography>
              {test.answers.map((answer, answerIndex) => (
              <div className="flex flex-col text-lg" key={answerIndex}>
                <Checkbox   key={answer.id}
                label={answer.content}
                value={answer.id}
                onChange={handleCheckboxChange}  />
              </div>
              ))}
              
            </CardBody>
          </Card>
          ))}
          <Button onClick={handleSubmit}>check grade</Button>
        </div>





      </div>
      {/* <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}
      {/* <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                  key === 0 ? "" : "-ml-2.5"
                                }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div> */}
    </div>
  );
}

export default Home;
