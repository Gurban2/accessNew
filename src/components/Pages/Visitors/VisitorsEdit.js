import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import WebcamCapture from "../../WebcamReact/WebcamCapture";
import { editVisitor } from "../../../store/reducers/visitorReducer";
import { toast } from "react-toastify";
import { Formik, Field, Form as FormikForm } from "formik";
import Breadcrumb from "../Breadcrumb";

import * as Yup from "yup";
import "./style.scss";

const VisitorsEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [photoPreview, setPhotoPreview] = useState(null);
  // const [useWebcam, setUseWebcam] = useState(false);

  const visitor = useSelector((state) =>
    state.visitors.find((visitor) => visitor.id === id)
  );

  // useEffect(() => {
  //   if (visitor) {
  //     setPhotoPreview(visitor.photo);
  //   }
  // }, [visitor]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    description: Yup.string().required("Description is required"),
    photo: Yup.mixed().required("Photo is required"),
  });

  // const handleCapture = (imageSrc, setFieldValue) => {
  //   setPhotoPreview(imageSrc);
  //   setFieldValue("photo", imageSrc);
  //   setUseWebcam(false);
  // };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(editVisitor({ id: visitor.id, data: values }));
    setSubmitting(false);
    toast.success("Visitor successfully edited");
    navigate("/visitors/all");
  };

  if (!visitor) {
    return <p>Visitor not found</p>;
  }

  return (
    <div className="visitor-add-container">
      <div className="offices-wrapper d-row">
        <Breadcrumb
          paths={[
            { label: "Dashboard", to: "/" },
            { label: "Visitors", to: "/visitor/edit" },

            { label: "Visitor - Edit" },
          ]}
        />
      </div>
      <h1 className="visitor-add-title">Edit Visitor</h1>
      <Formik
        initialValues={{
          name: visitor.name,
          phone: visitor.phone,
          fin: visitor.fin,
          email: visitor.email,
          address: visitor.address,
          description: visitor.description,
          photo: visitor.photo,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <FormikForm className="form-container">
            {Object.keys(errors).length > 0 && (
              <div className="error">{Object.values(errors).join(", ")}</div>
            )}
            <Field
              type="text"
              name="name"
              placeholder="Enter Name"
              className="form-control"
            />
            <Field
              type="tel"
              name="phone"
              placeholder="Enter Phone"
              className="form-control"
            />
            {/* Repeat for other fields as needed */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </FormikForm>
        )}
      </Formik>
    </div>
  );
};

export default VisitorsEdit;
