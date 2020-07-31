import React from 'react';

import {Button, Grid, Container, Fab, TextField, CircularProgress} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import {Form, Field, Formik} from "formik";

import * as Yup from "yup";

import './Styles/Global.css';

function App() {
    return <Container maxWidth='md'>
        <Formik
            initialValues={{
                name: '',
                lastName: '',
                message: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .min(3, 'Must be at least 3 characters!')
                    .max(15, 'Must be 15 characters or less!')
                    .required('Required!'),
                lastName: Yup.string()
                    .min(3, 'Must be at least 3 characters!')
                    .max(32, 'Must be 32 characters or less!')
                    .required('Required!'),
                message: Yup.string().min(12, `That's not a proper message now is it ?`).required('Required!')
            })}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                setTimeout(() => {
                    console.log(values);
                    resetForm();
                    setSubmitting(false);
                }, 3000);

            }}
        >
            {({values, errors, touched, isSubmitting}) => (
                <Form>
                    <pre>{JSON.stringify(values, null, 4)}</pre>

                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <Field
                                name='name'
                                label='Name'
                                fullWidth
                                as={TextField}
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name ? errors.name : null}
                            />
                        </Grid>

                        <Grid item sm={6} xs={12}>
                            <Field
                                name='lastName'
                                label='Last Name'
                                fullWidth
                                as={TextField}
                                error={touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName ? errors.lastName : null}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                name='message'
                                label='Message'
                                multiline
                                variant='outlined'
                                rowsMax={6}
                                rows={4}
                                fullWidth
                                as={TextField}
                                error={touched.message && !!errors.message}
                                helperText={touched.message && errors.message ? errors.message : null}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                color='primary'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                            {
                                isSubmitting
                                    ?
                                    <CircularProgress size={28} style={{marginLeft: '1em'}}/>
                                    :
                                    null
                            }
                        </Grid>
                    </Grid>

                    <pre>{JSON.stringify(errors, null, 4)}</pre>
                </Form>
            )}
        </Formik>

        <Fab color='secondary' aria-label='add' style={{position: 'absolute', bottom: '1em', right: '1em'}}>
            <AddIcon/>
        </Fab>
    </Container>
}

export default App;
