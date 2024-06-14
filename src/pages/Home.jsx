import { FaPlusCircle } from "react-icons/fa";
import styled from "styled-components";
import { TaskModal } from "../components/TaskModal";
import { useState } from "react";
import { TaskTable } from "../components/TaskTable";

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <TaskModal
          setTasks={setTasks}
          tasks={tasks}
          setShowModal={setShowModal}
        />
      )}
      <HomeContainer>
        <AddTaskGroup>
          <button type="button" onClick={handleAddTask}>
            Agregar <FaPlusCircle style={{ marginLeft: "5px" }} />
          </button>
        </AddTaskGroup>
        <hr />
        <TaskTable setTasks={setTasks} tasks={tasks} />
      </HomeContainer>
    </>
  );
}

const HomeContainer = styled.div`
  margin: 0;
  padding: 20px;

  hr {
    border: 2px solid lightgray;
  }
`;

const AddTaskGroup = styled.div`
  label {
    display: block;
    font-size: 36px;
    font-weight: 500;
  }

  button {
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #0c95f0;
    color: #fff;
    font-weight: 500;
    border: none;
    box-shadow: 0 1px 3px 0.1px rgba(0, 0, 0, 0.5);
    transition: all 0.2s;
  }

  button:hover {
    transform: translateY(1px);
  }
`;
