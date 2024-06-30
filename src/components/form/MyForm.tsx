"use client";
import React, { ReactNode, memo } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TMyFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TForm = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TMyFormConfig;

const MyForm = ({ children, onSubmit, defaultValues, resolver }: TForm) => {
  let formConfig: TMyFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default memo(MyForm);
