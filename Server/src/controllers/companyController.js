const DB_Company = require("../models/companyModel");

// Create
exports.createCompany = async (req, res) => {
  try {
    const company = new DB_Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
exports.getCompanies = async (req, res) => {
  try {
    const companies = await DB_Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getCompanyById = async (req, res) => {
  try {
    const company = await DB_Company.findById(req.params.id);
    if (!company) return res.status(404).json({ error: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await DB_Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany) return res.status(404).json({ error: "Company not found" });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await DB_Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) return res.status(404).json({ error: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
