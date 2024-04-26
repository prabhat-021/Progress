import React from "react";
import CardH1 from "./CardH1"
import CardH2 from "./cardH2";


import missionQualityImage from '../../assets/herosectionimages/mission.svg';
import visionQualityImage from '../../assets/herosectionimages/vision.svg';
import universityImage from '../../assets/herosectionimages/university.svg';
import parentsImage from '../../assets/herosectionimages/parents.svg';

import hatImg from '../../assets/herosectionimages/hat.svg';
import notesImg from '../../assets/herosectionimages/notes.svg';
import studentImg from '../../assets/herosectionimages/student.svg';
import cupImg from '../../assets/herosectionimages/cup.svg';
import Navbar from "../../components/Navbar/NavbarNew";

function About() {
  const card1text = "Choosing a college is one of the most important decisions in life. We aim to become the best education portal, providing an interactive interface and reliable content. Our goal is to make it easier for students to decide which college is right for them.";

  const card2text = "We want to empower students with knowledge so they can choose the best path for themselves. CollegeSearch has been created to help students make smarter decisions about their future careers and which college to attend. ";

  const card3text = "CollegeSearch offers a unique platform that focuses on providing high-quality leads to help colleges attract highly motivated candidates. Our website uses advanced algorithms to organize data into multiple levels, giving our clients access to highly specific and active databases";

  const card4text = "The website is designed to help parents find the best institute for their children. It has a filter page that lets you sort colleges based on their ranking, fees, and cutoff scores. Our team of skilled data analysts presents information in an interactive way, making it easier for you to make informed decisions..";



  return (
    <>
      <Navbar />
      <div className="font-sans text-sm font-normal leading-13 text-gray-700  bg-white overflow-x-hidden ">
        <div className='min-h-screen	box-border block font-sans isolate'>
          <div className='bg-neutral-50 overflow-x-hidden	w-full	box-border block font-sans isolate'>
            <div className='pt-10 w-full  box-border block pr-1 pl-1 isolate'>
              <div className='mx-auto pl-14 pr-10 mb-3 box-border block isolate leading-10 w-11/12'>
                <p className=' text-5xl text-red-400	font-bold pt-4 mt-0 mb-4'>CollegeSearch.com</p>
                <p className='mt-0 mb-4 box-border bloack my-4 isolate font-normal text-2xl text-gray-800 text-opacity-90 leading-10 '> is a thorough search engine for students, parents, and education industry participants seeking information on higher education in India and abroad. It provides concise and relevant data on colleges and universities, making it a reliable source for those making decisions about higher education.</p>
              </div>
            </div>
            <div className='pt-4 w-4/5 mr-auto ml-auto box-border block pr-1 pl-1 isolate'>
              <div className="-mr-4 -ml-4 box-border isolate flex flex-wrap ">
                <CardH1 imageUrl={missionQualityImage} title={"our mission"} text={card1text} />
                <CardH1 imageUrl={visionQualityImage} title={"our vision"} text={card2text} />

              </div>
            </div>
            <div className='w-4/5 text-base font-normal leading-normal text-gray-700 text-left font-din box-border px-4 mx-auto max-w-screen-xl mb-4'>
              <div className='text-base font-normal leading-normal text-gray-700 text-left font-roboto box-border mt-5 mb-5'>
                <h2 className='text-xl font-semibold leading-normal text-blue-700 text-center uppercase opacity-60 font-roboto box-border mb-4 mt-10'>college search for students</h2>
                <div></div>
              </div>
              <p className=" text-lg  tap-highlight-color-transparent font-normal text-gray-700 font-din box-border mt-0 text-center mb-6  leading-8 px-2.5">Students can use Collegedunia.com as one stop destination to search about their dream college, available courses, admission process and lots more interactive tools to simplify the process of finding alma-mater. The website has the repository of more than 20,000 colleges and 6000 courses categorized in different streams like Management, Engineering, Medical, Arts and much more. One can classify colleges on the basis of location, ranking, ratings, fees and cutoff for different competitive exams.</p>
            </div>
            <div className='pt-4 w-4/5 mr-auto ml-auto box-border block pr-1 pl-1 isolate'>
              <div className="-mr-4 -ml-4 box-border isolate flex flex-wrap ">
                <CardH1 imageUrl={universityImage} title={"COLLEGESEARCH FOR INSTITUTIONS"} text={card3text} />
                <CardH1 imageUrl={parentsImage} title={"COLLEGESEARCH FOR PARENTS"} text={card4text} />
              </div>
            </div>
            <div className="text-sm font-normal leading-4 text-gray-700 font-din box-border bg-white pt-10 mb-6">
              <h1 className="text-size-adjust-100 tap-highlight-color-transparent font-din font-semibold box-border mt-0 mb-1.5 leading-4 text-center uppercase text-blue-700 opacity-60 text-2xl">We are on track to make significant progress.</h1>

              <div className="text-sm font-normal leading-4 text-gray-700 font-din box-border pr-15 pl-15 mx-auto max-w-1130 mt-10">
                <div className="flex align-item:center box-border w-4/5 mx-auto">
                  <CardH2 imageUrl={hatImg} count={233} name={"colleges"} />
                  <CardH2 imageUrl={notesImg} count={255} name={"exam"} />
                  <CardH2 imageUrl={studentImg} count={567} name={"student"} />
                  <CardH2 imageUrl={cupImg} count={777} name={"coffie"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
