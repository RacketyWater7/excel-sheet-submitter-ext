import selectBestMatch from './selectBestMatch';
import selectBestMatchGroupCheckbox from './selectBestMatchGroupCheckbox';
import { selectItemInDynamicDropdown } from './selectItemInDynamicDropdown';
import { simulateClick } from './simulateClick';
import waitForElement from './waitForElement';

// Manual mapping of variations to actual options
const patientAgeMapping = {
  'less than 3 months': 'a. < 3 months',
  '3 months to 3 years': 'b. >= 3 mos. and < 3 yr.',
  '3 years to 12 years': 'c. >= 3 yr. and < 12 yr.',
  '12 years to 65 years': 'd. >= 12 yr. and < 65 yr.',
  'over 65 years': 'e. >= 65 year',
};

const airwayManagementTechniquesMapping = {
  LMA: 'Supraglottic Airway',
  'Mac/Miller': 'Direct',
  Glide: 'Indirect',
  Oral: 'Oral ETT',
  Nasal: 'Nasal ETT',
  FOB: 'Flexible Bronchoscopic',
  Awake: 'Awake',
  DLT: 'DLT',
  BB: 'Bronchial Blocker',
  Mask: 'Mask',
};

const procedureCategoryMapping = {
  'Cardiac - No CPB': 'W/out CPB',
  'Cardiac - CPB': 'With CPB',
  'Vascular (open)': 'Procs on major vessels',
  Neurostar: 'Endovascular',
  Crani: 'Nonvascular open',
  'Crani (vascular)': 'Vascular (open)',
  'C/S': 'Cesarean del',
  'C/S - high risk': 'Cesarean del high-risk',
  Delivery: 'Vag del',
  'Delivery - high risk': 'Vag del high-risk',
  Thoracic: 'Intrathoracic non-cardiac',
};

const vascularAccessMapping = {
  Aline: 'Arterial Catheter',
  CVC: 'Central Venous Catheter',
  Swan: 'Pulmonary artery cath',
  US: 'Ultrasound for line place',
};

const monitoringTechniquesMapping = {
  'Lumbar Drain': 'CSF Drain',
  EEG: 'Electrophysiologic mon',
  TEE: 'TEE',
};

/**
 * Submits the form data to the form
 */
export default async function submitFormData(formData) {
  try {
    // Wait for the form to load
    /**
     * @type {HTMLFormElement}
     */
    const form = await waitForElement('form');
    const data = formData[0];
    console.info('data to submit:', data);
    if (!data['Case ID']) return;
    form.querySelector('#PatientId').value = data['Case ID'];
    form.querySelector('#ProcedureDate').value = data['Case Date'];
    form.querySelector('#ProcedureYear').value = data['Case Year'];

    setTimeout(() => {
      const institutionsSelect = form.querySelector('#Institutions');
      selectBestMatch(institutionsSelect, data.Site);

      if (data?.Supervisor) {
        selectItemInDynamicDropdown(data?.Supervisor);
      }
      // Select the best match for Patient Age
      if (data?.Age) {
        const patientTypesSelect = form.querySelector('#PatientTypes');
        const patientTypeFound = patientAgeMapping[data?.Age]
          ? patientAgeMapping[data?.Age]
          : null;
        if (patientTypeFound) {
          selectBestMatch(patientTypesSelect, patientTypeFound);
        } else {
          selectBestMatch(patientTypesSelect, data?.Age);
        }
      }

      // Select the best match for Difficult Airway Management
      const difficultAirwayManagementSelect = form.querySelector(
        '#DifficultAirwayManagement'
      );
      const difficultAirwayManagementOptions = Array.from(
        difficultAirwayManagementSelect.querySelectorAll('label')
      );
      // select the radio button that matches the value from the form data
      const difficultAirwayManagementValue =
        data['Difficult Airway Management'];
      if (
        difficultAirwayManagementValue.toLowerCase() === 'yes' ||
        difficultAirwayManagementValue.toLowerCase() === 'anticipated'
      ) {
        difficultAirwayManagementOptions[0].querySelector(
          'input'
        ).checked = true;
      } else if (
        difficultAirwayManagementValue.toLowerCase() === 'no' ||
        difficultAirwayManagementValue.toLowerCase() === 'unanticipated' ||
        difficultAirwayManagementValue.toLowerCase() === ''
      ) {
        difficultAirwayManagementOptions[1].querySelector(
          'input'
        ).checked = true;
      }

      if (data['Airway Management']) {
        // Select the best match for Airway Management Techniques
        const airwayManagementTechniques = data['Airway Management'];
        const airwayManagementTechniquesSelect = form.querySelector(
          '#AirwayManagementTechniques'
        );
        const airwayManagementTechniquesOptions = Array.from(
          airwayManagementTechniquesSelect.querySelectorAll('label')
        );
        const airwayManagementTechniquesValues = airwayManagementTechniques
          .split(';')
          .map((value) => value.trim());
        for (const value of airwayManagementTechniquesValues) {
          const airwayManagementTechniquesValueFound =
            airwayManagementTechniquesMapping[value]
              ? airwayManagementTechniquesMapping[value]
              : null;
          if (airwayManagementTechniquesValueFound) {
            selectBestMatchGroupCheckbox(
              airwayManagementTechniquesOptions,
              airwayManagementTechniquesValueFound
            );
          } else {
            console.info(
              "didn't find the match in airwayManagementTechniquesMapping for:",
              value
            );
            selectBestMatchGroupCheckbox(
              airwayManagementTechniquesOptions,
              value
            );
          }
        }
      }

      if (data['ASA']) {
        // Select the best match for ASA
        const asaPhysicalStatus = data['ASA'];
        const asaPhysicalStatusSelect =
          form.querySelector('#ASAPhysicalStatus');
        const asaPhysicalStatusOptions = Array.from(
          asaPhysicalStatusSelect.querySelectorAll('label')
        );
        selectBestMatchGroupCheckbox(
          asaPhysicalStatusOptions,
          asaPhysicalStatus
        );

        // Select the best match for Case Type
        const caseTypeSelect = form.querySelector('#CaseType');
        const caseTypeOptions = Array.from(
          caseTypeSelect.querySelectorAll('label')
        );
        const caseTypeValue = asaPhysicalStatus.toLowerCase().includes('e')
          ? 'Trauma Life-Threatening Pathology'
          : 'Non-Trauma Life-Threatening Pathology';

        if (caseTypeValue === 'Trauma Life-Threatening Pathology') {
          caseTypeOptions[1].childNodes[0].checked = true;
        } else if (caseTypeValue === 'Non-Trauma Life-Threatening Pathology') {
          caseTypeOptions[0].childNodes[0].checked = true;
        } else {
        }
      }

      if (data['Procedure Category']) {
        // Select the best match for Procedure Category
        const procedureCategory = data['Procedure Category'];
        const procedureCategorySelect =
          form.querySelector('#Procedurecategory');
        const procedureCategoryOptions = Array.from(
          procedureCategorySelect.querySelectorAll('label')
        );
        const procedureCategoryValues = procedureCategory.split(';');
        for (const value of procedureCategoryValues) {
          const procedureCategoryValueFound = procedureCategoryMapping[value]
            ? procedureCategoryMapping[value]
            : null;
          if (procedureCategoryValueFound) {
            selectBestMatchGroupCheckbox(
              procedureCategoryOptions,
              procedureCategoryValueFound
            );
          } else {
            console.info(
              "didn't find the match in procedureCategoryMapping for:",
              value
            );
            selectBestMatchGroupCheckbox(procedureCategoryOptions, value);
          }
        }
      }

      if (data['Anasthesia Type']) {
        // Select the best match for Anasthesia Type
        const anesthesiaAnalgesiaType = data['Anasthesia Type'];
        const anesthesiaAnalgesiaTypeSelect = form.querySelector(
          '#AnesthesiaAnalgesiatype'
        );
        const anesthesiaAnalgesiaTypeOptions = Array.from(
          anesthesiaAnalgesiaTypeSelect.querySelectorAll('label')
        );
        const anesthesiaAnalgesiaTypeValues =
          anesthesiaAnalgesiaType.split(';');
        for (const value of anesthesiaAnalgesiaTypeValues) {
          selectBestMatchGroupCheckbox(anesthesiaAnalgesiaTypeOptions, value);
        }
      }

      if (data['Vascular Access']) {
        // Select the best match for Vascular Access
        const vascularAccess = data['Vascular Access'];
        const vascularAccessSelect = form.querySelector(
          '#SpecializedVascularAccess'
        );
        const vascularAccessOptions = Array.from(
          vascularAccessSelect.querySelectorAll('label')
        );
        const vascularAccessValues = vascularAccess.split(';');
        for (const value of vascularAccessValues) {
          const vascularAccessValueFound = vascularAccessMapping[value]
            ? vascularAccessMapping[value]
            : null;
          if (vascularAccessValueFound) {
            selectBestMatchGroupCheckbox(
              vascularAccessOptions,
              vascularAccessValueFound
            );
          } else {
            console.info(
              "didn't find the match in vascularAccessMapping for:",
              value
            );
            selectBestMatchGroupCheckbox(vascularAccessOptions, value);
          }
        }
      }

      if (data['Monitoring Techniques']) {
        // Select the best match for Monitoring Techniques
        const monitoringTechniques = data['Monitoring Techniques'];
        const monitoringTechniquesSelect = form.querySelector(
          '#SpecializedMonitoringTechniquesProcedures'
        );

        const monitoringTechniquesOptions = Array.from(
          monitoringTechniquesSelect.querySelectorAll('label')
        );
        const monitoringTechniquesValues = monitoringTechniques.split(';');
        for (const value of monitoringTechniquesValues) {
          const monitoringTechniquesValueFound = monitoringTechniquesMapping[
            value
          ]
            ? monitoringTechniquesMapping[value]
            : null;
          if (monitoringTechniquesValueFound) {
            selectBestMatchGroupCheckbox(
              monitoringTechniquesOptions,
              monitoringTechniquesValueFound
            );
          } else {
            selectBestMatchGroupCheckbox(monitoringTechniquesOptions, value);
          }
        }
      }

      if (data['Neuraxial Block Site']) {
        // Select the best match for Neuraxial Block Site
        const neuraxialBlockSite = data['Neuraxial Block Site'];
        const neuraxialBlockSiteSelect = form.querySelector(
          '#NeuraxialBlockadeSiteOptional'
        );
        const neuraxialBlockSiteOptions = Array.from(
          neuraxialBlockSiteSelect.querySelectorAll('label')
        );
        const neuraxialBlockSiteValues = neuraxialBlockSite.split(';');
        for (const value of neuraxialBlockSiteValues) {
          selectBestMatchGroupCheckbox(neuraxialBlockSiteOptions, value);
        }
      }

      if (data['Peripheral Nerve Site']) {
        // Select the best match for Peripheral Nerve Site
        const peripheralNerveSite = data['Peripheral Nerve Site'];
        const peripheralNerveSiteSelect = form.querySelector(
          '#PeripheralNerveBlockadeSiteOptional'
        );
        const peripheralNerveSiteOptions = Array.from(
          peripheralNerveSiteSelect.querySelectorAll('label')
        );
        const peripheralNerveSiteValues = peripheralNerveSite?.split(';') ?? [];
        for (const value of peripheralNerveSiteValues) {
          selectBestMatchGroupCheckbox(peripheralNerveSiteOptions, value);
        }
      }
    }, 1000);
    // after submitting, remove the top item from the array, which is at the index 0
    formData.shift();
    // Save the updated array to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // submit the form
    const submitBtn = await waitForElement('#submitButton');
    simulateClick(submitBtn);
  } catch (err) {
    console.log('Error in submitFormData: ', err);
  }
}
