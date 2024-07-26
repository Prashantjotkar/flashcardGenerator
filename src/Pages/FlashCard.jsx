import * as Yup from "yup";
import Alert from "../Components/Alert";
import NavBar from "../Components/NavBar";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { Form, Field, Formik, FieldArray, ErrorMessage } from "formik";
import { addFlashCard } from "../Redux/FlashCardReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const validateImage = ["image/jpeg", "image/jpg", "image/png", "image/svg"];
export default function FlashCard() {
  const dispatch = useDispatch();

  const formData = useSelector((state) => state.flashcard.formData);
  const addMoreTermS = (values, moreTerm) => {
    moreTerm.insert(values.term.length + 1, {
      termName: "",
      termDefinition: "",
      termImage: "",
    });
  };

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const submitForm = (values) => {
    dispatch(addFlashCard(values));
    toast.success("FlashCard Created Successfully", {
      theme: "colored",
      pauseOnFocusLoss: false,
    });
  };

  //validation schema
  const validationSchema = Yup.object({
    groupName: Yup.string()
      .min(3, "Group name must be min 3 character.")
      .max(20, "Group name must be between 3 - 20 character.")
      .required("Required!"),
    groupDescription: Yup.string()
      .min(20, "Description should be min 20 characters")
      .max(300, "Description allowed only upto 300 characters")
      .required("Required!"),

    term: Yup.array(
      Yup.object({
        termName: Yup.string()
          .min(3, "Term name must be min 3 characters")
          .max(20, "Term name must be within 20 characters")
          .required("Required!"),
        termDefinition: Yup.string()
          .min(20, "Defination should be min 20 characters")
          .max(500, "Defination conatin only upto 500 characters")
          .required("Required!"),
      })
    ),
  });

  return (
    <div className="min-h-screen bg-gray-200">
      <NavBar />
      <ToastContainer />

      <Formik
        initialValues={formData} // Use formData from Redux store
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm({ values: "" });
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form>
            <div
              className="space-y-12 w-3/5 bg-orange-300"
              style={{ marginLeft: "20%", height: "40vh" }}
            >
              <div className="border-b border-stone-950 pb-5">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 ml-5 mt-5">
                    <label
                      htmlFor="Group"
                      className="block text-sm font-large font-bold leading-6 text-gray-900"
                    >
                      Create Group*
                    </label>
                    <div className="mt-2">
                      <Field
                        className=" block w-full bg-gray-200 text-gray-700 border-2 border-gray-200 h-8 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        name="groupName"
                        id="groupName"
                        type="text"
                        placeholder="Group Name"
                      ></Field>
                      <ErrorMessage name="groupName">
                        {(emsg) => <div className="text-red-600 ">{emsg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="col-span-5 ml-5">
                    <label
                      htmlFor="about"
                      className="block text-sm font-large  font-bold leading-6 text-gray-900"
                    >
                      Add Description
                    </label>
                    <div className="mt-2">
                      <Field
                        className=" block w-full h-30 bg-gray-200 text-gray-700 border-2 border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        as="textarea"
                        name="groupDescription"
                        id="groupDescription"
                        placeholder="Group Description... "
                      ></Field>
                      <ErrorMessage name="groupDescription">
                        {(emsg) => <div className="text-red-600 ">{emsg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* started second form div */}
            <div className=" w-3/5 mx-auto bg-orange-300 mt-7">
              <FieldArray
                name="term"
                render={(moreTerm) => (
                  <div className="flex-col overflow-hidden rounded-md">
                    {values.term &&
                      values.term.map((term, index) => (
                        <div
                          name="termsDiv"
                          className="relative flex-row flex-wrap w-full h-50 mt-10 border-gray-400 md:flex md:space-x-4"
                          key={index}
                        >
                          <div className="w-8 h-8 px-2 text-xl text-center text-white bg-gray-500 rounded-full ml-3 mt-7">
                            {index + 1}
                          </div>
                          <div className="flex flex-col">
                            {/*Its an input component for Termcard Name */}
                            <label htmlFor={`term.${index}.termName`}>
                              Enter Term*
                            </label>
                            <Field
                              className="p-2 text-sm text-gray-900 border border-gray-400 rounded-md w-50 md:w-72 inField bg-gray-50"
                              name={`term.${index}.termName`}
                              id={`term.${index}.termName`}
                              value={term.termName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Name"
                            ></Field>
                            {/* Its a component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termName`}>
                              {(emsg) => (
                                <div className="text-red-600 ">{emsg}</div>
                              )}
                            </ErrorMessage>
                          </div>

                          {/* It's an input component for term card definition */}
                          <div className="flex flex-col">
                            <label htmlFor={`term.${index}.termDefinition`}>
                              Enter Definition*
                            </label>
                            <Field
                              as="textarea"
                              className="w-full h-10 p-2 text-sm text-gray-700 transition-all duration-500 border border-gray-400 rounded-md resize-none inField focus:h-24 md:w-72 bg-gray-50 "
                              name={`term.${index}.termDefinition`}
                              id={`term.${index}.termDefinition`}
                              value={term.termDefinition}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              type="text"
                              placeholder="Term Definition..."
                            ></Field>
                            {/* Its a component to show error message for validation */}
                            <ErrorMessage name={`term.${index}.termDefinition`}>
                              {(emsg) => (
                                <div className="text-red-600 ">{emsg}</div>
                              )}
                            </ErrorMessage>
                          </div>

                          <div className="flex flex-col mt-6">
                            {/* input component for Termcard Image */}
                            {term.termImage ? (
                              <div className="flex ">
                                <img
                                  className="w-20 h-20 p-1 rounded-lg"
                                  src={term.termImage}
                                  alt=""
                                />
                                <MdCancel
                                  className="mr-5 text-lg cursor-pointer hover:text-red-600"
                                  onClick={() =>
                                    setFieldValue(`term.${index}.termImage`, "")
                                  }
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor={`term.${index}.termImage`}
                                className=" w-30 h-[20px] cursor-pointer px-3 mt-2 py-1 flex items-center justify-center rounded"
                              >
                                <span className="flex w-32 p-2 mx-auto  font-bold text-blue-700 transition-all ease-in-out border border-blue-700 rounded-lg shadow-md hover:-translate-y-px hover:bg-blue-700 hover:text-white ">
                                  Select Image
                                </span>
                              </label>
                            )}
                            {/* Input field for image upload */}
                            <div className="container  bg-stone-100 mx-auto mt-20 ">
                              <input
                                onClick={(event) => (event.target.value = null)} //selecting same image
                                onChange={(event) => {
                                  //event.preventDefault();
                                  //Validation on image

                                  if (
                                    event.target.files[0] &&
                                    !validateImage.includes(
                                      event.target.files[0].type
                                    )
                                  ) {
                                    setAlertType("red");
                                    setAlertMessage(
                                      "Invalid file format. Please upload a image (JPEG or PNG)."
                                    );
                                    setAlertVisible(true);
                                  } else if (
                                    event.target.files[0].size > 304800
                                  ) {
                                    setAlertType("red");
                                    setAlertMessage(
                                      "Image size is very Large ! Please Select Image size less than 300kb"
                                    );
                                    setAlertVisible(true);
                                  } else {
                                    const file = event.target.files[0];
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file);
                                    reader.onload = () => {
                                      setFieldValue(
                                        `term.${index}.termImage`,
                                        reader.result
                                      );
                                    };
                                  }
                                }}
                                className="hidden"
                                id={`term.${index}.termImage`}
                                name={`term.${index}.termImage`}
                                type="file"
                              />
                              {alertVisible && (
                                <Alert
                                  type={alertType}
                                  message={alertMessage}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            {/*Visible Delete btn in term if more than one */}
                            {values.term.length <= 1 ? null : (
                              <RiDeleteBinLine
                                className="text-[1.8em]    text-gray-500 m-2 cursor-pointer hover:text-red-600"
                                onClick={() => {
                                  moreTerm.remove(index);
                                  // toast.warn("Term Card Deleted !", {
                                  //   position: toast.POSITION.TOP_RIGHT,
                                  //   pauseOnFocusLoss: false,
                                  // });
                                }}
                              />
                            )}

                            {/* its an Edit button for edit a term  */}
                            {values.term.length <= 1 ? null : (
                              <label htmlFor={`term.${index}.termName`}>
                                <FiEdit className="text-[1.8em] text-gray-500 m-2 cursor-pointer hover:text-red-600" />
                              </label>
                            )}
                          </div>
                        </div>
                      ))}
                    <div
                      className="inline-block mt-4 mb-6 font-bold text-blue-700 cursor-pointer mx-7"
                      onClick={() => addMoreTermS(values, moreTerm)}
                    >
                      + Add More
                    </div>
                  </div>
                )}
              ></FieldArray>
            </div>
            <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
              <button
                type="submit"
                className="bg-red-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none"
              >
                Create Flashcard
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
