import { trpc } from '../../trpc';
import { createCompany } from './createCompany';
import { deleteCompany } from './deleteCompany';
import { fetchCompanies } from './fetchCompanies';
import { updateCompanies } from './updateCompanies';

export default trpc.router({
  createCompany,
  deleteCompany,
  fetchCompanies,
  updateCompanies,
});
