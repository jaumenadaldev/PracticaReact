import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from '@emotion/styled';
import * as Yup from 'yup';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  width: '300px'
});

const Label = styled.label({
  marginBottom: '5px'
});

const Input = styled(Field)({
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  width: '100%',
  display: 'block'
});

const ErrorMessageStyled = styled(ErrorMessage)({
  color: 'red',
  fontSize: '12px'
});

const Button = styled.button({
  padding: '10px 20px',
  borderRadius: '4px',
  backgroundColor: 'lightblue',
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'deepskyblue'
  }
});

const H1 = styled.h1({
  fontSize: '24px'
}, props => ({
  color: props.color,
  textAlign: 'center',
  width: '100%'
}));


const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es requerido'),
  password: Yup.string().required('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
});

const FormulariFormik: React.FC = () => {
    interface FormValues {
        name: string;
        email: string;
        password: string;
        edad?: number
    }

    const initialValues: FormValues = {
        name: '',
        email: '',
        password: '',
    };

    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    return (
        <Container>
            <H1 color="Black">Formulari amb Formik</H1>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            >
                <StyledForm>
                    <div>
                        <Label htmlFor="name">Nombre:</Label>
                        <Input type="text" id="name" name="name" />
                        <ErrorMessageStyled name="name" component="div" />
                    </div>

                    <div>
                        <Label htmlFor="email">Correo electrónico:</Label>
                        <Input type="email" id="email" name="email" />
                        <ErrorMessageStyled name="email" component="div" />
                    </div>

                    <div>
                        <Label htmlFor="password">Contraseña:</Label>
                        <Input type="password" id="password" name="password" />
                        <ErrorMessageStyled name="password" component="div" />
                    </div>

                    <div>
                        <Label htmlFor="edad">Edad:</Label>
                        <Input type="edad" id="edad" name="edad" />
                        <ErrorMessageStyled name="edad" component="div" />
                    </div>

                    <Button type="submit">Enviar</Button>
                </StyledForm>
            </Formik>
        </Container>
    );
};

export default FormulariFormik;
