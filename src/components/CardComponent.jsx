import { EllipsisVertical } from "lucide-react";
import React from "react";

export default function CardComponent({projectName,dueDate,des,progress}) {
  const getProgressStyle = () =>{
    switch(Number(progress)){
      case 25 :
        return {
          width: "25%",
          barColor: "bg-custom-pink",
          textColor: "text-custom-pink",
        };
      case 50 : 
      return {
        width: "50%",
        barColor: "bg-custom-yellow-500",
        textColor: "text-custom-yellow-500",
      }
      case 75 :
        return {
          width: "75%",
          barColor: "bg-custom-carrot",
          textColor: "text-custom-carrot",
        };
      case 100 : 
      return {
        width : "100%",
        barColor:"bg-custom-sky-blue",
        textColor:"text-custom-sky-blue",
      }
      default :
      return {
        width: "0%",
        barColor: "bg-gray-200",
        textColor: "text-custom-sky-blue",
      };
    }
  } ;

  const progressStyle = getProgressStyle();

  const dayLeft = () => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due -today; 
    const diffDays = Math.ceil(diffTime/(1000 * 60 * 60  * 24));
    return diffDays > 0 ? `${diffDays} day${diffDays === 1? "" : "s"} left`:"Overdue";
  }

  return (
    <div>
      <div className="max-w-sm p-6 bg-white rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between mb-5">
          {/* date */}
          <p className={`font-medium ${progressStyle.textColor}`}>{dueDate}</p>
          <EllipsisVertical size={20} color="#374957" />
        </div>

        <h5 className="capitalize mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {projectName}
        </h5>
        <p className="line-clamp-2 mb-3 font-normal text-justify text-gray-400 dark:text-gray-400">
          {des
            ? des
            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos ratione incidunt amet ducimus. Error,"}
        </p>

        {/* progress bar */}
        <div className="w-full flex justify-between font-medium mb-1">
          <p>Progress</p>
          <p>{progress}%</p>
        </div>
        <div className="relative mb-5 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className={`${progressStyle.barColor} h-2.5 rounded-full`}
          style={{width:progressStyle.width}}
          ></div>

        </div>

        {/* deadline */}
        <div className="flex justify-end">
          <p className="font-medium bg-light-gray py-2 px-4 rounded-lg max-w-40 text-center">
            {dayLeft()}
          </p>
        </div>
      </div>
    </div>
  );
}
