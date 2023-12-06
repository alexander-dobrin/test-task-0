import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { onInput } from "../../helpers/getFormatedInput";

import { Table } from "../Table";
import scss from "./Form.module.scss";
import { Loader } from "./loader";

const url = "http://localhost:3000/users";
let controller = new AbortController();

export const Form = () => {
  const [err, setErr] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Неверный e-mail" }),
    number: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    if (isRequestSent) {
      controller.abort();
      controller = new AbortController();
    }

    setIsRequestSent(true);
    setIsLoaded(false);

    const fetchData = {
      ...data,
      number: Number(data.number.replace(/\D/g, "")) || null,
    };

    if (!fetchData.number) {
      delete fetchData.number;
    }

    setErr(null);

    const { signal } = controller;

    fetch(`${url}?${new URLSearchParams(fetchData)}`, {
      method: "GET",
      signal,
    })
      .then((res) => res.json())
      .then((users) => {
        setIsLoaded(true);
        setUsers(users);
        setIsRequestSent(false);
      })
      .catch(() => {
        setIsLoaded(false);
        setIsRequestSent(false);
      });
  };

  return (
    <div>
      <form noValidate className={scss.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={scss.title}>FORM</h1>
        <div className={scss.input_group}>
          <label htmlFor="email">Email:</label>
          <input
            className={scss.input}
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className={scss.error}>{errors.email?.message}</p>
          )}
        </div>
        <div className={scss.input_group}>
          <label htmlFor="number">Number:</label>
          <input
            className={scss.input}
            id="number"
            type="text"
            inputMode="numeric"
            {...register("number")}
            onChange={(e) => {
              setValue("number", onInput(e));
            }}
          />
          {errors.number?.message && (
            <p className={scss.error}>{errors.number?.message}</p>
          )}
        </div>
        {err?.message && (
          <p className={scss.errorResponse}>
            Status: {err.status}
            <br />
            Message: {err.message}
          </p>
        )}
        <button className={scss.button}>SEND</button>
      </form>
      <div>
        {isLoaded ? (
          <Table users={users} />
        ) : isRequestSent ? (
          <Loader />
        ) : undefined}
      </div>
    </div>
  );
};
