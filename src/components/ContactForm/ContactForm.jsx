import { Formik } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';

import {
  StyledForm,
  StyledFormField,
  StyledLabel,
  StyledInput,
  StyledButton,
  StyledErrorMessage,
} from './ContactForm.styled';

const phoneSchema = Yup.string().phone().required('Number is a required field');

// (async () => {
//   console.log(await phoneSchema.isValid('9876543210')); // → true
// })();

// const phoneSchema = yup
//   .string()
//   .phone('IN', true, '${path} is invalid')
//   .required();

// try {
//   phoneSchema.validateSync('+1 345 9490088');
// } catch (error) {
//   console.log(error.message); // → this is invalid
// }

//  it('validate phone number strictly with IN (India) region with custom error message', () => {
//    const phoneSchema = yup
//      .string()
//      .phone('IN', true, '${path} is invalid')
//      .required();
//    expect(() => {
//      phoneSchema.validateSync('+1 345 9490088');
//    }).toThrow('is invalid');
//  });

const formSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(25, 'Too Long!')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Invalid name. Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
    )
    .required('Name is a required field'),

  // number: Yup.string()
  //   .min(3, 'Too Short!')
  //   .matches(
  //     /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
  //     'Invalid number. Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  //   )
  //   .required('Number is a required field'),

  number: (async () => {
    await phoneSchema.isValid('9876543210');
  })(),
});

export const ContactForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit({ ...values });
        resetForm();
      }}
    >
      <StyledForm>
        <StyledFormField>
          <StyledLabel>Name</StyledLabel>
          <StyledInput type="text" name="name" />
          <StyledErrorMessage name="name" component="div" />
        </StyledFormField>

        <StyledFormField>
          <StyledLabel>Number</StyledLabel>
          <StyledInput type="tel" name="number" />
          <StyledErrorMessage name="number" component="div" />
        </StyledFormField>
        <StyledButton type="submit">Add contacts</StyledButton>
      </StyledForm>
    </Formik>
  );
};
