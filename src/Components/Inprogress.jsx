import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import png from "../Images/todo.png";
import plus from "../Images/Vector.png";
import "../App.css";

const Test = () => {
  const [turnOn, setTurnOn] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [display, setDisplay] = useState([]);
  const [data, setData] = useState([]);
  var descriptionRef = useRef("");
  var titleRef = useRef("");

  useLayoutEffect(() => {
    setData(JSON.parse(localStorage.getItem("Item")));
  }, []);

  useEffect(() => {
    localStorage.setItem("Item", JSON.stringify(data));
  });

  function progressData(index) {
    let check = [...data];
    check[index].pending = 0;
    check[index].inprogress = 1;
    setData(check);
  }

  function completeData(index) {
    let check = [...data];
    check[index].inprogress = 0;
    check[index].completed = 1;
    setData(check);
  }

  function saveData() {
    setTurnOn(!turnOn);
    let temp = {
      title: title,
      description: description,
      pending: 1,
      inprogress: 0,
      completed: 0,
    };
    setDisplay([...display, false]);
    setData([...data, temp]);
  }

  function showOption(index) {
    let check = [...display];
    check[index] = !check[index];
    setDisplay(check);
  }

  function deleteData(index) {
    setData(data.filter((value, number) => index !== number));
  }

  function modelOnOff() {
    setTurnOn(!turnOn);
  }

  return (
    <>
      <div className="flex ">
        <div className="flex mt-3">
          <div>
            <img src={png} alt="" />
          </div>
          <div className="text-heading text-5xl " style={{fontFamily:'Josefin Sans', fontWeight: "500"}}> To Do App</div>
        </div>
    
        <div className="flex mt-6 ml-64">
          <div style={{ fontFamily: "Josefin Sans", paddingTop: "5px" }}>
            Filter Bond:{" "}
          </div>
          <div className="flex mx-8 " >
            <Link to="/" style={{ textDecoration: "none" }}>
              <div
                className="btn1 border hover:bg-violet-600 rounded-full px-8 ml-3"
                >
                {" "}
                All
              </div>
            </Link>
            <Link to="/pending" style={{ textDecoration: "none" }}>
              <div className="btn1 border rounded-full px-8 ml-3 " >Pending</div>
            </Link>
            <Link to="/inprogress" style={{ textDecoration: "none" }}>
              <div className="btn1 border rounded-full px-8 ml-3 " style={{ backgroundColor: "black", color: "white" }}>InProgress</div>
            </Link>
            <Link to="/completed" style={{ textDecoration: "none" }}>
              <div className="btn1 border rounded-full px-8 ml-3 ">Completed</div>
            </Link>
            <div
              className="cursor-pointer border-2 relative"
              onClick={() => modelOnOff()}
              style={{
                marginLeft: "40px",
                padding: "0px 9px",
                height: "29px",
                display: "flex",
              }}
            >
              Create New Todo
              <span style={{ paddingLeft: "10px" , paddingTop:"4px" }}>
                <img src={plus} alt="" width={"15px"} height={"10px"} />
              </span>
            </div>
          </div>
        </div>
      </div>
     <div
        className="model absolute right-36 top-18 p-3 pl-6 w-72"
        style={{ display: turnOn ? "block" : "none" }}
      >
        <label style={{ fontFamily: "Josefin Sans" }}>Title</label>
        <br />
        <input
          style={{
            width: "230px",
            height: "35px",
            background: "#E5E5E5",
            paddingBottom: "20px",
          }}
          type="text"
          id="title"
          name="title"
          ref={titleRef}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <label style={{ fontFamily: "Josefin Sans" }}>Description</label>
        <br />
        <input
          style={{
            width: "230px",
            height: "35px",
            background: "#E5E5E5",
            paddingBottom: "20px",
          }}
          type="text"
          id="description"
          name="description"
          ref={descriptionRef}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <input
          style={{
            height: "33px",
            width: "230px",
            marginTop: "12px",
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
          }}
          type="submit"
          onClick={() => saveData()}
          value="Add"
        ></input>
      </div>
      <br />
      <span className="title" style={{ marginLeft: "70px" }}>
        In Progress
      </span>
      <div className="flex">
        <div>
          {data.map((e, index) => {
            if (e.inprogress === 1)
              return (
                <div className="flex flex-col flex-e w-56 ml-5 mt-5 p-2 pt-0 rounded-md bg-silver" key={index}>
                  <span
                    className="dots cursor-pointer relative"
                    onClick={() => showOption(index)}
                    style={{ color: "black", paddingLeft: "90%" }}
                  >
                    ...
                    <div
                      onClick={() => progressData(index)}
                      className="bg-white absolute top-1 right-8 px-1"
                      style={{display: display[index] ? "block" : "none" }}
                    >
                      Progress
                    </div>
                  </span>
                  <div>{e.description}</div>
                </div>
              );
          })}
        </div>
       
      </div>
    </>
  );
};

export default Test;
