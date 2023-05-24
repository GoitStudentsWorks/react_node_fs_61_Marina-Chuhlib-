import React, { useState } from 'react';
import css from './secondStep.module.css';
import TitleModal from 'shared/components/TitleModal/TitleModal';
import StatusIndicator from 'shared/components/StatusIndicator/StatusIndicator';
import ButtonRoutes from 'shared/components/ButtonRoutes/ButtonRoutes';
import ButtonNext from 'shared/components/ButtonRoutes/ButtonNext';
import ButtonPrev from 'shared/components/ButtonRoutes/ButtonPrev';
import { validationSchemaAdd } from '../../../shared/services/FormValidation/addPetValidation';

export const SecondFormSell = ({
  formData,
  currentStatus,
  handleNextData,
  handlePrevStep,
  chooseOption,
  titleForm,
}) => {
  const [title, setAddTitle] = useState(formData.title || '');
  const [name, setName] = useState(formData.name || '');
  const [date, setDate] = useState(formData.date || '');
  const [breed, setBreed] = useState(formData.breed || '');
  const [errors, setErrors] = useState({});

  // const handleNextValidation = () => {

  //   handleNextData({ name, date, breed, title });
  // };

  const handleNextValidation = () => {
    validationSchemaAdd
      .validate({ name, date, breed, title }, { abortEarly: false })
      .then(() => {
        handleNextData({ name, date, breed, title });
      })
      .catch(err => {
        const validationErrors = {};
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div>
      <TitleModal titleForm={titleForm} />

      <StatusIndicator
        currentStatus={currentStatus}
        chooseOption={chooseOption}
      />
      <div className={css.inputContainer}>
        <label className={css.label} htmlFor="addTitle">
          Title of add
        </label>
        <input
          className={css.input}
          type="text"
          id="addTitle"
          value={title}
          onChange={e => setAddTitle(e.target.value)}
          placeholder="Type title of add"
        />
        {errors.title && <p className={css.ErrorText}>{errors.title}</p>}
      </div>
      <div className={css.inputContainer}>
        <label className={css.label} htmlFor="name">
          Pet's name
        </label>
        <input
          className={css.input}
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type name pet"
        />
        {errors.name && <p className={css.ErrorText}>{errors.name}</p>}
      </div>
      <div className={css.inputContainer}>
        <label className={css.label} htmlFor="date">
          Date of birth
        </label>
        <input
          className={css.input}
          type="text"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          placeholder="Type date of birth"
        />
        {errors.date && <p className={css.ErrorText}>{errors.date}</p>}
      </div>
      <div className={css.inputContainer}>
        <label className={css.label} htmlFor="breed">
          Breed
        </label>
        <input
          className={css.input}
          type="text"
          id="breed"
          value={breed}
          onChange={e => setBreed(e.target.value)}
          required
          placeholder="Type breed"
        />
        {errors.breed && <p className={css.ErrorText}>{errors.breed}</p>}
      </div>
      <ButtonRoutes>
        <ButtonNext textButton={'Next'} handleNextData={handleNextValidation} />
        <ButtonPrev textButton={'Back'} handlePrevStep={handlePrevStep} />
      </ButtonRoutes>
    </div>
  );
};
