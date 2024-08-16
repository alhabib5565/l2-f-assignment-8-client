"use client";
import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MySelect from "@/components/form/MySelect";
import MySelectWithWatch from "@/components/form/MySelectWithWatch";
import MyModal from "@/components/modal/MyModal";
import { useGetDistrictOptions } from "@/hooks/locationOptionHook/useGetDistrictOptions";
import { useGetDivisionOptions } from "@/hooks/locationOptionHook/useGetDivisionOptions";
import { useGetUnionOptions } from "@/hooks/locationOptionHook/useGetUnionOption";
import { useGetUpazilaOptions } from "@/hooks/locationOptionHook/useGetUpazilaOptions";
import { useGetMeQuery, useUpdateUserMutation } from "@/redux/api/user.api";
import { Box, Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TEditLocationModalOpen = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const defaultValues = {
  division: "",
  district: "",
  Upazila: "",
  union: "",
  area: "",
};

const EditLocationModal = ({
  setOpen,
  open,
  userId,
}: TEditLocationModalOpen) => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const { divisionOptions, divisionLoading } = useGetDivisionOptions();
  const { districtOptions, districtLoading } = useGetDistrictOptions(division);
  const { upazilaOptions, upazilaLoading } = useGetUpazilaOptions(district);
  const { unionOptions, unionLoading } = useGetUnionOptions(upazila);

  const [updateUserInfo, { isLoading: updating }] = useUpdateUserMutation();

  const onSubmit = async (value: FieldValues) => {
    console.log(value);
    const response = (await updateUserInfo({ data: value, id: userId })) as any;
    if (response?.data?.success) {
      toast.success(response?.data?.message || "Successful");
      setOpen(false);
    } else {
      toast.error(response?.error?.message || "Failed");
    }
  };

  return (
    <MyModal title="Edit Location" open={open} setOpen={setOpen}>
      <MyForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <MySelectWithWatch
              disabled={divisionLoading}
              onValueChange={setDivision}
              name="userLocation.division"
              label="Division"
              options={divisionOptions || []}
            />
          </Grid>

          <Grid item xs={6}>
            <MySelectWithWatch
              disabled={!division || districtLoading}
              onValueChange={setDistrict}
              name="userLocation.district"
              label="District"
              options={districtOptions || []}
            />
          </Grid>
          <Grid item xs={6}>
            <MySelectWithWatch
              onValueChange={setUpazila}
              disabled={!district || upazilaLoading}
              label="Upazila"
              name="userLocation.upazila"
              options={upazilaOptions || []}
            />
          </Grid>

          <Grid item xs={6}>
            <MySelect
              disabled={!upazila || unionLoading}
              name="userLocation.union"
              label="Union"
              options={unionOptions}
            />
          </Grid>

          <Grid item xs={12}>
            <MyInput label="Area" name="userLocation.area" type="text" />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Button disabled={updating} type="submit">
            Save
          </Button>
        </Box>
      </MyForm>
    </MyModal>
  );
};

export default EditLocationModal;
