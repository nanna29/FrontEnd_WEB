import React, { useState, Fragment } from "react";
import "./Schedulecalendarcomponents.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CalendarIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";



// className함수는 여러 개의 클래스 이름들을 받아들이고, 조건에 따라 필터링하여 결합한 문자열을 반환함
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Schedulecalendarcomponents = () => {

  // 일정 데이터를 받는 부분_해당 내용들은 예시
const [meetings,setMeetings] = useState([
  {
    id: 1,
    name: "티밍 전체 대면 회의 - 중구 퇴계로",
    dailyscrum: "00교양 조별 과제",
    startDatetime: "2023-08-11T13:00",
    endDatetime: "2023-08-13T14:30",
    project_color: "#d79ac3",
  },
  {
    id: 2,
    name: "티밍 전체 대면 회의 - 중구 퇴계로",
    dailyscrum: "00교양 조별 과제",
    startDatetime: "2023-08-11T13:00",
    endDatetime: "2023-08-13T14:30",
    project_color: "#d79ac3",
  },
  {
    id: 3,
    name: "티밍 전체 대면 회의 - 중구 퇴계로",
    dailyscrum: "00교양 조별 과제",
    startDatetime: "2023-08-11T13:00",
    endDatetime: "2023-08-13T14:30",
    project_color: "#d79ac3",
  },
  {
    id: 4,
    name: "프로젝트 회의",
    dailyscrum: "티밍 회의",
    startDateTime: "2023-08-13T14:00",
    endDateTime: "2023-08-15T16:30",
    project_color: "#FFD008",
  },
  {
    id: 5,
    name: "티밍 전체 대면 회의 - 송파구 퇴계로",
    dailyscrum: "00교양 조별 과제",
    startDatetime: "2023-08-11T13:00",
    endDatetime: "2023-08-13T14:30",
    project_color: "#FFD008",
  },
  {
    id: 6,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2023-08-18T09:00",
    endDatetime: "2023-08-20T11:30",
  },
]);

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today); //selectDay상태와 setCount 함수를 선언
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  //useState 함수를 호출하여 초기 상태값을 설정, today변수에 저장된 현재 날짜를 초기 상태로 사용함
  //currentMonth는 현재의 상태값을, setCurrentMonth는 상태값을 업데이트하는 함수를 가리킨다
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  let selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const handleDelete = (meetingId) => {
    const updatedMeetings = meetings.filter((meeting) => meeting.id !== meetingId);
    setMeetings(updatedMeetings);
  };

  return (
    <div className="SchedulecalendarApp pt-10">
      <div className="Calendartxt">
        <FontAwesomeIcon icon={faHouse} />
        &#62;일정 달력
      </div>
      <div className="mx-auto md:max-w-4xl mt-10">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div className="md:pr-8 border border-gray-300 calendarblock bg-white">
            {/*  < 날짜 > 앞뒤로 이동하는 부분 */}
            <div className="flex items-center justify-center mt-5 ml-10">
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 -mr-30 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <h2 className="font-semibold text-blue-900">
                {format(firstDayCurrentMonth, "MMMM")}
              </h2>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-30 -mr-1.5  flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-blue-500 ml-10">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm ml-10">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    "py-1.5"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && "text-white bg-blue-500",
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "text-red-500",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-blue-900",
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-gray-400",
                      isEqual(day, selectedDay) && isToday(day) && "bg-red-500",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-gray-900",
                      !isEqual(day, selectedDay) && "hover:bg-gray-200",
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                      "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                    )}
                  >
                    <time dateTime={format(day, "yyyy-MM-dd")}>
                      {format(day, "d")}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                    {meetings.some((meeting) =>
                      isSameDay(parseISO(meeting.startDatetime), day)
                    ) && (
                      <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-10 ">
            <h2 className="font-semibold scheduletitle mt-5">
              {" "}
              <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                {format(selectedDay, "yyy.MM.dd")}
              </time>
            </h2>
            {/* 일정 리스트 */}
            <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500 max-h-80 overflow-y-auto">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting
                    meeting={meeting}
                    key={meeting.id}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p>등록된 일정이 없습니다</p>
              )}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

function Meeting({ meeting,onDelete }) {
  let startDateTime = parseISO(meeting.startDatetime);
  let endDateTime = parseISO(meeting.endDatetime);

  // project_color 값을 가져와서 스타일로 적용
  const colorStyle = {
    backgroundColor: meeting.project_color,
  };

  return (
    <div className="schedulecomponents ">
      <li className="flex items-center border border-white-300 mb-2 bg-white px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-10 hover:bg-gray-10">
        {/* flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100 */}
        <div className="colorbar" style={colorStyle}></div>
        <div className="flex-auto">
          <div className="flex">
            <div className="content text-black-900">{meeting.name}</div>
            <FontAwesomeIcon
              className="delete"
              icon={faXmark}
              onClick={() => onDelete(meeting.id)}
            />
          </div>

          <div className="contentdateperiod mt-0.5">
            <time dateTime={meeting.startDatetime}>
              {format(startDateTime, "yyy.MM.dd")}
            </time>{" "}
            ~{" "}
            <time dateTime={meeting.endDatetime}>
              {format(endDateTime, "yyy.MM.dd")}
            </time>
          </div>
          <div className="flex">
            <div className="contentdescription">{meeting.dailyscrum}</div>
            <div className="contenttimeperiod" style={colorStyle}>
              <div className="timeperiod">
                <time dateTime={meeting.startDatetime}>
                  {format(startDateTime, "H:mm")}
                </time>{" "}
                -{" "}
                <time dateTime={meeting.endDatetime}>
                  {format(endDateTime, "H:mm")}
                </time>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
