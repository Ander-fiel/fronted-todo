import React, { useEffect, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import taskService from "../services/taskService";
import { toast } from "react-toastify";

export const TaskTable = ({ tasks, setTasks }) => {
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timerFunction = () => {
      const timeout = setTimeout(() => {
        setPending(false);
      }, 2000);
      return () => clearTimeout(timeout);
    };
    const fetchTasks = async () => {
      const data = await taskService.fetchTasks();
      setTasks(data);
    };
    fetchTasks();
    timerFunction();
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      width: "400px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Imagen",
      cell: (row) => (
        <Image
          src={row.image}
          alt={row.title}
          height={100}
          width={100}
          onClick={() => handleZoom(row.image)}
        />
      ),
    },
    {
      name: "Actions",
      width: "200px",
      cell: (row) => (
        <div className="d-flex flex-row column-gap-2">
          <Button variant="warning" onClick={() => handleEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    navigate(`/task/${row.id}`);
  };

  const handleZoom = (image) => {
    window.open(image, "_blank", "width=800,height=600");
  };

  const handleDelete = async (row) => {
    const filteredTasks = tasks.filter((task) => task.id !== row.id);
    const response = await taskService.deleteTask(row.id);

    if (response.status != 200) return;

    toast(response.data.message);
    setTasks(filteredTasks);
  };

  return (
    <>
      <DataTable
        title="Task List"
        columns={columns}
        data={tasks}
        progressPending={pending}
        progressComponent={<Spinner animation="grow" variant="primary" />}
        pagination
      />
    </>
  );
};
