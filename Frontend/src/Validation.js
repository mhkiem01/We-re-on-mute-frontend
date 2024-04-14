import React, { useState } from 'react';
import './Validation.css';

const Validation = () => {
  const [reportFormat, setReportFormat] = useState('');
  const [ruleset, setRuleset] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleReportFormatChange = (event) => {
    setReportFormat(event.target.value);
  };

  const handleRulesetChange = (event) => {
    setRuleset(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleValidation = () => {
    // Logic to handle the validation
    console.log('Report Format:', reportFormat);
    console.log('Ruleset:', ruleset);
    console.log('File to validate:', selectedFile);
  };

  return (
    <div className="validation-container">
      <h1>Welcome!</h1>
      <p>anthony</p>
      <form>
        <div className="selection-group">
          <label>Choose Report Format</label><br />
          <label><input type="radio" name="reportFormat" value="JSON" onChange={handleReportFormatChange} /> JSON</label>
          <label><input type="radio" name="reportFormat" value="PDF" onChange={handleReportFormatChange} /> PDF</label>
          <label><input type="radio" name="reportFormat" value="HTML" onChange={handleReportFormatChange} /> HTML</label>
          <label><input type="radio" name="reportFormat" value="Docx" onChange={handleReportFormatChange} /> Docx</label>
        </div>
        <div className="selection-group">
          <label>Choose Ruleset to Validate</label><br />
          <label><input type="radio" name="ruleset" value="All" onChange={handleRulesetChange} /> All</label>
          <label><input type="radio" name="ruleset" value="PEPPOL" onChange={handleRulesetChange} /> PEPPOL</label>
          <label><input type="radio" name="ruleset" value="EN16931" onChange={handleRulesetChange} /> EN16931 Business Rules</label>
        </div>
        <div className="file-input-group">
          <label htmlFor="file-validate">Invoice File</label>
          <input id="file-validate" type="file" onChange={handleFileChange} />
          {selectedFile && <span>{selectedFile.name}</span>}
        </div>
        <div className="action-buttons">
          <button type="button" onClick={handleValidation}>Validate</button>
        </div>
      </form>
    </div>
  );
}

export default Validation;