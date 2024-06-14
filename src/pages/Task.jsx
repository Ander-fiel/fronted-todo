import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import taskService from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

function Task() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  const modalRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    const getTask = async () => {
      const response = await taskService.getTask(id);
      setTitle(response.title);
      setDescription(response.description);
      setPreview(response.image);
      const input = inputRef.current;
      const url = await fetch(response.image); // Cargar la imagen desde la URL
      const blob = await url.blob(); // Obtener el Blob de la respuesta
      const file = new File([blob], response.title, {
        type: blob.type,
      });
      const fileList = new DataTransfer();
      fileList.items.add(file);
      input.files = fileList.files;
      setImage(file);
    };
    getTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, description, image };
    const response = await taskService.updateTask(data, id);

    console.log(response);
    if (response.status != 200) return;

    toast("Tarea actualizada");
    navigate("/");
  };
  return (
    <FormContainer ref={modalRef} onSubmit={handleSubmit}>
      <FormHeader>
        <span>Editando tarea</span>
      </FormHeader>
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
      <img
        height={200}
        style={{ objectFit: "cover" }}
        src={
          preview && typeof preview !== "string"
            ? URL.createObjectURL(preview)
            : preview
        }
        alt="Preview"
      />
      <FileInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(e.target.files[0]);
          setPreview(e.target.files[0]);
        }}
        required
      />
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
}

export default Task;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const FormContainer = styled.form`
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  max-width: 400px;
  margin: auto;
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
