import React, { useEffect, useRef, useState } from "react";
import { Form, Image } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";

import addTaskFigure from "../assets/add-task-figure.png";
import taskService from "../services/taskService";

export const TaskModal = ({ setShowModal, setTasks, tasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const modalRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  function handleShowModal() {
    setShowModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, image };
    try {
      const response = await taskService.addTask(data);
      setTasks([...tasks, response]);
      setTitle("");
      setDescription("");
      inputRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormOverlay>
      <FormContainer ref={modalRef} onSubmit={handleSubmit}>
        <FormHeader>
          <span>Agregando tarea</span>
          <FaTimes size={24} onClick={handleShowModal} />
        </FormHeader>
        <Image
          src={addTaskFigure}
          height={200}
          width={200}
          style={{ margin: "auto", borderRadius: "50%", objectFit: "fill" }}
        />
        <Input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <FileInput
          type="file"
          ref={inputRef}
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <Button type="submit">Enviar</Button>
      </FormContainer>
    </FormOverlay>
  );
};

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  svg {
    cursor: pointer;
  }
`;
const FormOverlay = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  height: calc(100% - 56px);
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 100;
`;

const FormContainer = styled.form`
  position: relative;
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 400px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 6px 0.2px gray;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileInput = styled(Form.Control)`
  margin-bottom: 10px;
`;
