import { ChangeEvent, Dispatch, ReactElement } from "react";
import { useFormik } from "formik";
import FormField from "./FormField";
import FormTextarea from "./FormTextarea";
import { formValuesTypes } from "@/app/create/page";

type ProjectFormProps = {
  formValues: formValuesTypes;
  setFormValues: Dispatch<React.SetStateAction<formValuesTypes>>;
};

export default function ProjectForm({
  formValues,
  setFormValues,
}: ProjectFormProps): ReactElement {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value }: { name: string; value: string } = e.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formik = useFormik({
    initialValues: formValues,
    onSubmit: () => {
      console.log(formValues);
    },
  });

  return (
    <div className="card w-[95%] md:w-[90%] lg:w-1/2 bg-gray-900 shadow-xl m-2">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="card-body">
          <FormField
            label="Project Name"
            inputName="projectName"
            inputType="text"
            placeholder="My project"
            isRequired={true}
            handleChange={handleChange}
          />
          <FormField
            label="Background Image"
            inputName="bannerImage"
            inputType="url"
            placeholder="https://myproject.org/logo.png"
            isRequired={false}
            handleChange={handleChange}
          />
          <FormTextarea
            label="Description"
            inputName="description"
            placeholder="Use this field to describe your project as detailed as you need"
            handleChange={handleChange}
          />
          <FormField
            label="Link"
            inputName="link"
            inputType="url"
            placeholder="https://myproject.org/"
            isRequired={false}
            handleChange={handleChange}
          />
          <div className="flex flex-col md:flex-row md:my-6 gap-2">
            <FormField
              label="Start date"
              inputName="startDate"
              inputType="date"
              placeholder=""
              isRequired={true}
              handleChange={handleChange}
            />
            <FormField
              label="End date"
              inputName="endDate"
              inputType="date"
              placeholder=""
              isRequired={true}
              handleChange={handleChange}
            />
          </div>
          <FormTextarea
            label="Scope Tags"
            inputName="scopeTags"
            placeholder="Scope tags separated by commas, e.g.: ReFi,Web3"
            handleChange={handleChange}
          />
          <FormTextarea
            label="Contributors"
            inputName="contributors"
            placeholder="Addresses, names or pseudonyms of the contributors separated by commas, e.g.: 0xAddress1,John Doe,Rookiecol"
            handleChange={handleChange}
          />
        </div>

        <div className="card-actions justify-center">
          <button type="submit" className="btn bg-green400 border-none mb-5">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
