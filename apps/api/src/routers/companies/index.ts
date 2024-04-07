import { trpc } from '../../trpc';
import { createCompany } from './createCompany';
import { deleteCompany } from './deleteCompany';
import { fetchCompanies } from './fetchCompanies';
import { updateCompany } from './updateCompany';

export default trpc.router({
  createCompany,
  deleteCompany,
  fetchCompanies,
  updateCompany,
});
