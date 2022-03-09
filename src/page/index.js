import React from 'react';
import { Formik, Field, Form } from 'formik';
import schema from '../schema';
import './infor.css'

export const Infor = () => {
    function onSubmit(values, actions) {
        console.log('SUBMIT', values);
    }
    function onBlurCep(e, setFieldValue) {
        const { value } = e.target;

        const cep = value?.replace(/[^0-9]/g, '')

        if (cep?.length !== 8) {
            return;
        }
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((res) => res.json())
            .then((data) => {
                setFieldValue('bairro', data.bairro);
                setFieldValue('cidade', data.localidade);
                setFieldValue('logradouro', data.logradouro);
                setFieldValue('uf', data.uf);
            });
    }
    const handleAdd = () => {
        
    }
    return (
        <div className='App'>
            <Formik
                validationSchema={schema}
                onSubmit={onSubmit}
                validateOnMount
                initialValues={{
                    cep: '',
                    logradouro: '',
                    mumero: '',
                    complemento: '',
                    cidade: '',
                    uf: ''
                }}
                render={({ isValid, setFieldValue }) => (
                    <Form>
                        <div className='formControlGrup'>
                            <label>Cep</label>
                            <Field name="cep" type="text" onBlur={(e) => onBlurCep(e, setFieldValue)} />
                        </div>
                        <div className='formControlGrup'>
                            <label>Logradouro</label>
                            <Field name="logradouro" type="text" />
                        </div>
                        <div className='formControlGrup'>
                            <label>Número</label>
                            <Field name="mumero" type="text" />
                        </div>
                        <div className='formControlGrup'>
                            <label>Complemento</label>
                            <Field name="complemento" type="text" />
                        </div>
                        <div className='formControlGrup'>
                            <label>Bairro</label>
                            <Field name="bairro" type="text" />
                        </div>
                        <div className='formControlGrup'>
                            <label>Cidade</label>
                            <Field name="cidade" type="text" />
                        </div>
                        <div className='formControlGrup'>
                            <label>UF</label>
                            <Field component='select' name="uf">
                                <option value={null}>Selecione o estado</option>
                                <option value='SP'>São Paulo</option>
                                <option value='CE'>Ceara</option>
                            </Field>
                        </div>

                        <button onClick={handleAdd} type="button" >Enviar</button>
                    </Form>

                )}
            />
        </div>

    );
}

