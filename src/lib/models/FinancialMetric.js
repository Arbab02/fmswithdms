import mongoose, { Schema, model, models } from 'mongoose';

const FinancialMetricSchema = new Schema({
  revenue: { type: Number, required: true },
  expenses: { type: Number, required: true },
  profit: { type: Number, required: true },
  loss: { type: Number, required: true },
  cogs: { type: Number, required: true },
  grossMargin: { type: Number, required: true },
  netIncome: { type: Number, required: true },
  clv: { type: Number, required: true },
  cac: { type: Number, required: true },
  roi: { type: Number, required: true },
  churnRate: { type: Number, required: true },
  month: { type: String, required: true },  // Example: 'January'
  year: { type: Number, required: true },   // Example: 2025

});

export default models.FinancialMetric || model('FinancialMetric', FinancialMetricSchema);
