import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Send, Check, AlertCircle } from 'lucide-react';
import { formStructure } from './questions';

const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwwQv6ME6OogE7H9rmxq249SIQu4NxckCup-Lo2Zt5iKw26JaZBOqymYukvx1CACQI/exec';

// NOTA: Las preguntas ahora se gestionan en src/questions.js
// Para añadir o editar preguntas, ve a ese archivo

const LaNitBriefingForm = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate progress
  const progress = ((currentSection + 1) / formStructure.length) * 100;

  // Handle input changes
  const handleChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: null
      }));
    }
  };

  // Validate current section with relaxed percentage validation
  // Validate current section with flexible percentage validation
  const validateSection = () => {
    const section = formStructure[currentSection];
    const newErrors = {};
    
    section.questions.forEach(question => {
      if (question.required && question.type !== 'section_header') {
        if (question.type === 'percentage_group') {
          const total = question.fields.reduce((sum, field) => {
            return sum + (parseInt(formData[field.id] || 0));
          }, 0);
          
          // Very flexible validation: just need some value (> 0)
          if (total === 0) {
            question.fields.forEach(field => {
              newErrors[field.id] = `Necesitas asignar al menos algún valor`;
            });
          }
        } else if (!formData[question.id] || (Array.isArray(formData[question.id]) && formData[question.id].length === 0)) {
          newErrors[question.id] = 'Este campo es obligatorio';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const goToNextSection = () => {
    if (validateSection()) {
      if (currentSection < formStructure.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateSection()) return;

    setIsSubmitting(true);
    
    try {
      const submissionData = {};
      
      formStructure.forEach(section => {
        section.questions.forEach(question => {
          if (question.type === 'section_header') return;
          
          const label = `${section.title} - ${question.label}`;
          let value = formData[question.id];
          
          if (question.type === 'percentage_group') {
            const percentages = question.fields.map(field => 
              `${field.name}: ${formData[field.id] || 0}%`
            ).join(', ');
            submissionData[label] = percentages;
          } else if (Array.isArray(value)) {
            submissionData[label] = value.join(', ');
          } else {
            submissionData[label] = value || '';
          }
        });
      });

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render question based on type
  const renderQuestion = (question) => {
    if (question.type === 'section_header') {
      return (
        <div key={question.id} className="section-header">
          <h3>{question.label}</h3>
        </div>
      );
    }

    const hasError = errors[question.id];

    return (
      <div key={question.id} className={`question ${hasError ? 'error' : ''}`}>
        <label>
          {question.label}
          {question.required && <span className="required">*</span>}
        </label>
        {question.sublabel && <p className="sublabel">{question.sublabel}</p>}
        
        {question.type === 'text' && (
          <input
            type="text"
            placeholder={question.placeholder}
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        )}

        {question.type === 'number' && (
          <input
            type="number"
            min={question.min || 0}
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
          />
        )}

        {question.type === 'textarea' && (
          <textarea
            placeholder={question.placeholder}
            value={formData[question.id] || ''}
            onChange={(e) => handleChange(question.id, e.target.value)}
            rows={4}
          />
        )}

        {question.type === 'radio' && (
          <div className="radio-group">
            {question.options.map((option, idx) => (
              <label key={idx} className="radio-option">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={formData[question.id] === option}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'checkbox' && (
          <div className="checkbox-group">
            {question.options.map((option, idx) => (
              <label key={idx} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={(formData[question.id] || []).includes(option)}
                  onChange={(e) => {
                    const current = formData[question.id] || [];
                    const newValue = e.target.checked
                      ? [...current, option]
                      : current.filter(v => v !== option);
                    handleChange(question.id, newValue);
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'slider' && (
          <div className="slider-container">
            <input
              type="range"
              min={question.min || 0}
              max={question.max || 100}
              value={formData[question.id] || question.min || 0}
              onChange={(e) => handleChange(question.id, e.target.value)}
              className="slider"
            />
            <div className="slider-value">
              {formData[question.id] || question.min || 0}{question.unit || ''}
            </div>
          </div>
        )}

        {question.type === 'percentage_group' && (
          <div className="percentage-group">
            {question.fields.map(field => (
              <div key={field.id} className="percentage-field">
                <label>{field.name}</label>
                <div className="percentage-input">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData[field.id] || ''}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                  />
                  <span>%</span>
                </div>
              </div>
            ))}
            <div className={`percentage-total ${
              (() => {
                const total = question.fields.reduce((sum, field) => 
                  sum + (parseInt(formData[field.id] || 0)), 0
                );
                if (total >= 95 && total <= 105) return 'valid';
                if (total > 105) return 'over';
                return 'under';
              })()
            }`}>
              <span>Total: {question.fields.reduce((sum, field) => 
                sum + (parseInt(formData[field.id] || 0)), 0
              )}%</span>
              {(() => {
                const total = question.fields.reduce((sum, field) => 
                  sum + (parseInt(formData[field.id] || 0)), 0
                );
                if (total >= 95 && total <= 105) return <Check size={16} />;
                return <AlertCircle size={16} />;
              })()}
            </div>
          </div>
        )}

        {hasError && <p className="error-message">{hasError}</p>}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="form-container">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            background: #1B1B1A;
            color: #E0E1F0;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }

          .form-container {
            min-height: 100vh;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .success-screen {
            text-align: center;
            padding: 4rem 2rem;
            animation: fadeIn 0.8s ease-out;
            max-width: 600px;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .success-icon {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1B1B1A;
            animation: scaleIn 0.5s ease-out 0.2s both;
          }

          @keyframes scaleIn {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

          .success-screen h1 {
            font-family: 'Manrope', sans-serif;
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #E0E1F0;
            font-weight: 800;
          }

          .success-screen p {
            font-size: 1.0625rem;
            color: #F8F8F8;
            opacity: 0.7;
            margin-bottom: 1rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .success-footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(224, 225, 240, 0.1);
          }

          .success-footer p {
            color: #F8F8F8;
            font-size: 0.9375rem;
            opacity: 0.6;
          }

          .success-footer strong {
            color: #82FF7A;
            font-weight: 700;
          }

          @media (max-width: 768px) {
            .success-screen {
              padding: 3rem 1.5rem;
            }

            .success-screen h1 {
              font-size: 2rem;
            }

            .success-icon {
              width: 80px;
              height: 80px;
            }
          }
        `}</style>
        <div className="success-screen">
          <div className="success-icon">
            <Check size={64} />
          </div>
          <h1>¡Gracias!</h1>
          <p>Hemos recibido vuestras respuestas correctamente.</p>
          <p>Nos pondremos a trabajar en el análisis y volveremos con nuestras propuestas.</p>
          <div className="success-footer">
            <p><strong>ESES Agency</strong></p>
            <p>Comunicación y Estrategia de Marca</p>
          </div>
        </div>
      </div>
    );
  }

  const section = formStructure[currentSection];

  return (
    <div className="form-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: #1B1B1A;
          color: #E0E1F0;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        .form-container {
          min-height: 100vh;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(74, 84, 106, 0.3);
          z-index: 1000;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4A546A 0%, #82FF7A 100%);
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 20px rgba(130, 255, 122, 0.4);
        }

        .form-header {
          max-width: 700px;
          width: 100%;
          margin-bottom: 3rem;
          text-align: center;
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-header h1 {
          font-family: 'Manrope', sans-serif;
          font-size: clamp(1.75rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .form-header .subtitle {
          font-size: 1rem;
          color: #F8F8F8;
          font-weight: 400;
          opacity: 0.7;
        }

        .section-header h3 {
          font-family: 'Manrope', sans-serif;
          font-size: 1.375rem;
          color: #82FF7A;
          margin: 2.5rem 0 1.5rem;
          font-weight: 700;
        }

        .form-section {
          max-width: 700px;
          width: 100%;
          background: rgba(74, 84, 106, 0.08);
          border: 1px solid rgba(224, 225, 240, 0.06);
          border-radius: 16px;
          padding: 2.5rem 2rem;
          margin-bottom: 2rem;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .section-title {
          font-family: 'Manrope', sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #E0E1F0;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .section-subtitle {
          color: #F8F8F8;
          margin-bottom: 2rem;
          font-size: 1rem;
          opacity: 0.6;
        }

        .question {
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .question.error {
          animation: shake 0.4s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        .question label {
          display: block;
          font-weight: 500;
          color: #E0E1F0;
          margin-bottom: 0.75rem;
          font-size: 0.9375rem;
        }

        .required {
          color: #82FF7A;
          margin-left: 0.25rem;
        }

        .sublabel {
          color: #F8F8F8;
          font-size: 0.8125rem;
          margin-bottom: 0.75rem;
          line-height: 1.5;
          opacity: 0.6;
        }

        input[type="text"],
        input[type="number"],
        textarea {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(27, 27, 26, 0.6);
          border: 1px solid rgba(224, 225, 240, 0.1);
          border-radius: 10px;
          color: #E0E1F0;
          font-size: 0.9375rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        input[type="text"]:focus,
        input[type="number"]:focus,
        textarea:focus {
          outline: none;
          border-color: #4A546A;
          background: rgba(27, 27, 26, 0.8);
          box-shadow: 0 0 0 3px rgba(74, 84, 106, 0.15);
        }

        textarea {
          resize: vertical;
          min-height: 110px;
        }

        .radio-group,
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .radio-option,
        .checkbox-option {
          display: flex;
          align-items: center;
          padding: 0.875rem 1rem;
          background: rgba(27, 27, 26, 0.4);
          border: 1px solid rgba(224, 225, 240, 0.08);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .radio-option:hover,
        .checkbox-option:hover {
          background: rgba(74, 84, 106, 0.15);
          border-color: rgba(74, 84, 106, 0.3);
          transform: translateX(3px);
        }

        .radio-option input,
        .checkbox-option input {
          margin-right: 0.875rem;
          cursor: pointer;
          width: 18px;
          height: 18px;
          accent-color: #82FF7A;
        }

        .radio-option span,
        .checkbox-option span {
          flex: 1;
          color: #E0E1F0;
          font-size: 0.9375rem;
        }

        .slider-container {
          padding: 1.5rem 1.25rem;
          background: rgba(27, 27, 26, 0.4);
          border: 1px solid rgba(224, 225, 240, 0.08);
          border-radius: 10px;
        }

        .slider {
          width: 100%;
          height: 8px;
          background: linear-gradient(to right, 
            rgba(74, 84, 106, 0.3) 0%, 
            rgba(130, 255, 122, 0.3) 100%);
          border-radius: 4px;
          outline: none;
          -webkit-appearance: none;
          margin-bottom: 1rem;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(130, 255, 122, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 16px rgba(130, 255, 122, 0.6);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 10px rgba(130, 255, 122, 0.4);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 16px rgba(130, 255, 122, 0.6);
        }

        .slider-value {
          text-align: center;
          font-weight: 700;
          color: #82FF7A;
          font-size: 1.75rem;
          font-family: 'Manrope', sans-serif;
        }

        .percentage-group {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          padding: 1.25rem;
          background: rgba(27, 27, 26, 0.4);
          border-radius: 10px;
          border: 1px solid rgba(224, 225, 240, 0.08);
        }

        .percentage-field {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .percentage-field label {
          flex: 1;
          margin-bottom: 0;
          font-size: 0.875rem;
        }

        .percentage-input {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .percentage-input input {
          width: 70px;
          padding: 0.5rem 0.625rem;
          text-align: center;
          font-weight: 600;
        }

        .percentage-input span {
          color: #82FF7A;
          font-weight: 600;
        }

        .percentage-total {
          margin-top: 0.875rem;
          padding-top: 0.875rem;
          border-top: 1px solid rgba(224, 225, 240, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 700;
          font-size: 1.125rem;
          font-family: 'Manrope', sans-serif;
        }

        .percentage-total.valid {
          color: #82FF7A;
        }

        .percentage-total.over,
        .percentage-total.under {
          color: #F8F8F8;
          opacity: 0.7;
        }

        .error-message {
          color: #E0E1F0;
          background: rgba(224, 225, 240, 0.1);
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8125rem;
          margin-top: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .error-message::before {
          content: '⚠';
        }

        .form-navigation {
          max-width: 700px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2rem;
        }

        .nav-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          background: rgba(74, 84, 106, 0.15);
          border: 1px solid rgba(74, 84, 106, 0.3);
          border-radius: 10px;
          color: #E0E1F0;
          font-size: 0.9375rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .nav-button:hover:not(:disabled) {
          background: rgba(74, 84, 106, 0.25);
          border-color: rgba(74, 84, 106, 0.5);
          transform: translateY(-2px);
        }

        .nav-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .nav-button.primary {
          background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
          border: none;
          color: #1B1B1A;
          font-weight: 700;
        }

        .nav-button.primary:hover:not(:disabled) {
          box-shadow: 0 8px 24px rgba(130, 255, 122, 0.4);
          transform: translateY(-2px);
        }

        .success-screen {
          text-align: center;
          padding: 4rem 2rem;
          animation: fadeIn 0.8s ease-out;
        }

        .success-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 2rem;
          background: linear-gradient(135deg, #82FF7A 0%, #4A546A 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1B1B1A;
          animation: scaleIn 0.5s ease-out 0.2s both;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-screen h1 {
          font-family: 'Manrope', sans-serif;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #E0E1F0;
          font-weight: 800;
        }

        .success-screen p {
          font-size: 1.0625rem;
          color: #F8F8F8;
          opacity: 0.7;
          margin-bottom: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .success-footer {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(224, 225, 240, 0.1);
        }

        .success-footer p {
          color: #F8F8F8;
          font-size: 0.9375rem;
          opacity: 0.6;
        }

        .success-footer strong {
          color: #82FF7A;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .form-container {
            padding: 1.5rem 1rem;
          }

          .form-section {
            padding: 2rem 1.25rem;
          }

          .form-header h1 {
            font-size: 1.75rem;
          }

          .section-title {
            font-size: 1.375rem;
          }

          .percentage-field {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .percentage-input {
            width: 100%;
            justify-content: flex-end;
          }

          .form-navigation {
            flex-direction: column;
          }

          .nav-button {
            width: 100%;
            justify-content: center;
          }

          .slider-value {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .form-header h1 {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 1.25rem;
          }

          .form-section {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="form-header">
        <h1>Briefing Estratégico La Nit</h1>
        <p className="subtitle">Cuestionario de Descubrimiento: Definición de Identidad y Direccionalidad</p>
      </div>

      <div className="form-section">
        <h2 className="section-title">{section.title}</h2>
        <p className="section-subtitle">{section.subtitle}</p>
        
        {section.questions.map(question => renderQuestion(question))}
      </div>

      <div className="form-navigation">
        <button
          className="nav-button"
          onClick={goToPreviousSection}
          disabled={currentSection === 0}
        >
          <ChevronLeft size={20} />
          Anterior
        </button>

        {currentSection === formStructure.length - 1 ? (
          <button
            className="nav-button primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
            <Send size={20} />
          </button>
        ) : (
          <button
            className="nav-button primary"
            onClick={goToNextSection}
          >
            Siguiente
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LaNitBriefingForm;
