import PersonalInformationStep from './PersonalInformationStep';
import WorkDetailsStep from './WorkDetailsStep';
import ContractScheduleStep from './ContractScheduleStep';

const StepRenderer = ({ 
  step, 
  formData, 
  errors, 
  handleInputChange, 
  isEditMode, 
  subjects 
}) => {
  switch (step) {
    case 0:
      return (
        <PersonalInformationStep
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          isEditMode={isEditMode}
        />
      );
    case 1:
      return (
        <WorkDetailsStep
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          subjects={subjects}
        />
      );
    case 2:
      return (
        <ContractScheduleStep
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer; 