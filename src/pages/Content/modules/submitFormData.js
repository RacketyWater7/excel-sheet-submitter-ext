import selectBestMatch from './selectBestMatch';
import selectBestMatchGroupCheckbox from './selectBestMatchGroupCheckbox';
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

/**
 * Submits the form data to the form
 */
export default async function submitFormData(formData) {
  try {
    // Wait for the form to load
    const form = await waitForElement('form');
    console.info('Submitting form data:', formData);
    // Get the form element
    // form data => form attributes
    // Case ID => #PatientId (type text)
    // Case Date => #ProcedureDate  dd/mm/yyyy (its a form-control type of input with type="text")
    // Case Year => #ProcedureYear (its a select with options 1, 2, 3, 4)
    // Site => #Institutions (its a select with options:
    // <option value="">-- Select --</option>
    // <option value="12913">Lehigh Valley Health Network</option>
    //<option value="12904">Penn State Milton S Hershey Medical Center</option>
    //<option value="12874">UPMC Harrisburg</option>
    //<option value="19367">Other Site</option>
    // Supervisor => #select2-Attendings-container (its a select with many options, so we need to select the one that matches the supervisor name stored in the form data, we have to match even if by partial name and select the best match)
    // Age (e.g. from data "3 years to 12 years") => #PatientTypes (its a select with options:
    // <option value="">-- Select --</option>
    //<option value="30">a. &lt; 3 months</option>
    //<option value="31">b. &gt;= 3 mos. and &lt; 3 yr.</option>
    //<option value="32">c. &gt;= 3 yr. and &lt; 12 yr.</option>
    //<option selected="selected" value="33">d. &gt;= 12 yr. and &lt; 65 yr.</option>
    //<option value="34">e. &gt;= 65 year</option>

    // Difficult Airway Management => #DifficultAirwayManagement (it has two labels (each label having a radio button inside it), we need to select the one that matches the data from the form data, in form data, the value against this is either "Yes" or "No", or "Anticipated" or "Unanticipated", so we need to check the radio button that matches the value, the text of the label is "Anticipated" or "Unanticipated", so we just need to check the radio button that has the label text as "Anticipated" or "Unanticipated")

    // Airway Management => #AirwayManagementTechniques (its a group of checkboxes, we need to check the ones that match the data from the form data, in form data, the values agains this are separated by semi-colon, so we need to split the values and check the checkboxes that match the values)
    // more about Airway Management Techniques: the id holds divs having class as "panel-body", and each div has a another div with class 'row', and each row has a div with class 'col-3', and this div has a label and the input of type checkbox is inside that label, so we need to find the label that matches the value from the form data and then check the checkbox inside that label; for matching the label we can use our selectBestMatch function
    // Procedure Category => #Procedurecategory (its the same as Airway Management Techniques, so we can use the same logic as above)
    // Anasthesia Type => #AnesthesiaAnalgesiatype (its the same as Airway Management Techniques, so we can use the same logic as above)
    // Vascular Access => #SpecializedVascularAccess (its the same as Airway Management Techniques, so we can use the same logic as above)
    // Monitoring Techniques => #SpecializedMonitoringTechniquesProcedures (its the same as Airway Management Techniques, so we can use the same logic as above)
    // Neuraxial Block Site => #NeuraxialBlockadeSiteOptional (its the same as Airway Management Techniques, so we can use the same logic as above)
    // Peripheral Nerve Site => #PeripheralNerveBlockadeSiteOptional (its the same as Airway Management Techniques, so we can use the same logic as above)
    // ASA => #ASAPhysicalStatus (its the same as Airway Management Techniques, so we can use the same logic as above)

    // the above info is from the form page source code, we need to find the best way to fill the form with the data from the form data array

    // fill the form with the data from the form data array, starting with the first object in the array
    const data = formData[0];
    // const patientId = document.querySelector('#PatientId');
    // patientId.value = data.ID;
    // const procedureDate = document.querySelector('#ProcedureDate');
    // procedureDate.value = data.DATE;
    // const procedureYear = document.querySelector('#ProcedureYear');
    // procedureYear.value = data.Year;
    // const institutions = document.querySelector('#Institutions');
    // institutions.value = data.Site;
    // const attendings = document.querySelector('#select2-Attendings-container');
    // attendings.value = data.Supervisor;
    // const patientTypes = document.querySelector('#PatientTypes');
    // patientTypes.value = data['Patient Age'];
    // Fill each input/select element with corresponding data
    form.querySelector('#PatientId').value = data['Case ID'];
    form.querySelector('#ProcedureDate').value = data['Case Date'];
    form.querySelector('#ProcedureYear').value = data['Case Year'];

    setTimeout(() => {
      const institutionsSelect = form.querySelector('#Institutions');
      selectBestMatch(institutionsSelect, data.Site);
      // institutionsSelect.options[2].selected = true;
      // institutionsSelect.dispatchEvent(new Event('change'), { bubbles: true });

      // Regarding the mannual mapping is that we first need to check if the value from the form data matches any of the keys in the mapping object, if it does exactly, then we need to select the option that matches the value of the key in the mapping object (for example, if the value from the form data is "LMA", then we need to check if it matches any of the keys in the mapping object, if it matches the key "LMA", then we need to select the option that matches the value of the key "LMA" in the mapping object, which is "Supraglottic Airway", so we need to select the option that has the text "Supraglottic Airway" in it) or else we need to use the best match functions to select the option that best matches the value from the form data

      // Select the best match for Supervisor
      const supervisorSelect = form.querySelector(
        '#select2-Attendings-container'
      );
      selectBestMatch(supervisorSelect, data.Supervisor);
      // // Select the best match for Patient Age
      const patientTypesSelect = form.querySelector('#PatientTypes');
      const patientTypeFound = patientAgeMapping[data?.Age]
        ? patientAgeMapping[data?.Age]
        : null;
      if (patientTypeFound) {
        selectBestMatch(patientTypesSelect, patientTypeFound);
      } else {
        selectBestMatch(patientTypesSelect, data?.Age);
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

      // Select the best match for Airway Management Techniques
      const airwayManagementTechniques = data['Airway Management'];
      const airwayManagementTechniquesSelect = form.querySelector(
        '#AirwayManagementTechniques'
      );
      const airwayManagementTechniquesOptions = Array.from(
        airwayManagementTechniquesSelect.querySelectorAll('label')
      );
      const airwayManagementTechniquesValues =
        airwayManagementTechniques.split(';');
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
          selectBestMatchGroupCheckbox(
            airwayManagementTechniquesOptions,
            value
          );
        }
      }

      // Select the best match for Procedure Category
      const procedureCategory = data['Procedure Category'];
      const procedureCategorySelect = form.querySelector('#Procedurecategory');
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
          selectBestMatchGroupCheckbox(procedureCategoryOptions, value);
        }
      }

      // Select the best match for Anasthesia Type
      const anesthesiaAnalgesiaType = data['Anasthesia Type'];
      const anesthesiaAnalgesiaTypeSelect = form.querySelector(
        '#AnesthesiaAnalgesiatype'
      );
      const anesthesiaAnalgesiaTypeOptions = Array.from(
        anesthesiaAnalgesiaTypeSelect.querySelectorAll('label')
      );
      const anesthesiaAnalgesiaTypeValues = anesthesiaAnalgesiaType.split(';');
      for (const value of anesthesiaAnalgesiaTypeValues) {
        selectBestMatchGroupCheckbox(anesthesiaAnalgesiaTypeOptions, value);
      }

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
          selectBestMatchGroupCheckbox(vascularAccessOptions, value);
        }
      }

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
        selectBestMatchGroupCheckbox(monitoringTechniquesOptions, value);
      }

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

      // Select the best match for Peripheral Nerve Site
      const peripheralNerveSite = data['Peripheral Nerve Site'];
      const peripheralNerveSiteSelect = form.querySelector(
        '#PeripheralNerveBlockadeSiteOptional'
      );
      const peripheralNerveSiteOptions = Array.from(
        peripheralNerveSiteSelect.querySelectorAll('label')
      );
      const peripheralNerveSiteValues = peripheralNerveSite.split(';');
      for (const value of peripheralNerveSiteValues) {
        selectBestMatchGroupCheckbox(peripheralNerveSiteOptions, value);
      }

      // For patient age, we need to select the option that matches the value from the form data with the manual mapping
      // const patientAgeSelect = form.querySelector('#PatientTypes');
      // const patientAgeValue = patientAgeMapping[data['Patient Age']];
      // const patientAgeOptions = Array.from(patientAgeSelect.querySelectorAll('option'));
      // selectBestMatch(patientAgeSelect, patientAgeValue);
    }, 1000);
    // submit the form
    // form.submit();

    // after submitting, remove the top item from the array, which is at the index 0
    const dataToSubmit = formData.shift();
    console.info('Submitting data:', dataToSubmit);
    // Save the updated array to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
  } catch (err) {
    console.log('Error in submitFormData: ', err);
  }
}
