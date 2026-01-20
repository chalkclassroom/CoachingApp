import {
  Grid,
  TextField,
  TableSortLabel,
  TablePagination,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@material-ui/core'
import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp'
import styled from 'styled-components'
import * as xlsx from 'xlsx'
import { generateUsersXlsx } from '../../services/xlsxGenerator'

const TableRow = styled.tr`
  background-color: white;
  :nth-child(odd) { background-color: #eaeaea; }
  &:hover { background-color: rgba(9, 136, 236, 0.4); cursor: pointer; }
`

const TableCell = styled.td`
  padding: 10px 8px;
  text-align: left;
`

const StatusBadge = styled.span<{ archived: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => (props.archived ? '#ffebee' : '#e8f5e9')};
  color: ${props => (props.archived ? '#c62828' : '#2e7d32')};
`

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  school: string
  archived: boolean
  lastLogin: Date | null
}

interface Props {
  users: User[]
  onUserClick?: (user: User) => void
}

interface State {
  search: string
  sortField: string
  sortDir: 'asc' | 'desc'
  roleFilter: string
  statusFilter: string
  page: number
  perPage: number
}

class AllUsersTable extends React.Component<Props, State> {
  state: State = {
    search: '',
    sortField: 'lastName',
    sortDir: 'asc',
    roleFilter: '',
    statusFilter: '',
    page: 0,
    perPage: 10,
  }

  handleSort = (field: string) => {
    this.setState(s => ({
      sortField: field,
      sortDir: s.sortField === field && s.sortDir === 'asc' ? 'desc' : 'asc',
    }))
  }

  getFilteredUsers = (): User[] => {
    const { search, sortField, sortDir, roleFilter, statusFilter } = this.state
    let users = [...this.props.users]

    if (search) {
      const s = search.toLowerCase()
      users = users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.email} ${u.role} ${u.school}`.toLowerCase().includes(s)
      )
    }
    if (roleFilter) users = users.filter(u => u.role === roleFilter)
    if (statusFilter) users = users.filter(u => u.archived === (statusFilter === 'archived'))

    users.sort((a, b) => {
      const aVal = sortField === 'lastLogin'
        ? (a.lastLogin?.getTime() || 0)
        : String(a[sortField] || '').toLowerCase()
      const bVal = sortField === 'lastLogin'
        ? (b.lastLogin?.getTime() || 0)
        : String(b[sortField] || '').toLowerCase()
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
    })

    return users
  }

  formatRole = (role: string) => ({
    admin: 'Admin', programLeader: 'Program Leader', siteLeader: 'Site Leader',
    coach: 'Coach', teacher: 'Teacher',
  }[role] || role)

  formatDate = (d: Date | null) => d ? d.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Never'

  handleExport = () => {
    const wb = generateUsersXlsx(this.getFilteredUsers())
    xlsx.writeFile(wb, `users_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  render() {
    const { search, sortField, sortDir, roleFilter, statusFilter, page, perPage } = this.state
    const filtered = this.getFilteredUsers()
    const paginated = filtered.slice(page * perPage, (page + 1) * perPage)
    const roles = [...new Set(this.props.users.map(u => u.role))].sort()

    const SortHeader = ({ field, label }: { field: string; label: string }) => (
      <th style={{ padding: '10px 8px', cursor: 'pointer' }} onClick={() => this.handleSort(field)}>
        <TableSortLabel active={sortField === field} direction={sortField === field ? sortDir : 'asc'}>
          <strong>{label}</strong>
        </TableSortLabel>
      </th>
    )

    return (
      <Grid container direction="column" spacing={2}>
        <Grid item style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            size="small" variant="outlined" label="Search" value={search}
            onChange={e => this.setState({ search: e.target.value, page: 0 })}
            style={{ width: 200 }}
          />
          <FormControl variant="outlined" size="small" style={{ minWidth: 130 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={e => this.setState({ roleFilter: e.target.value as string, page: 0 })}>
              <MenuItem value=""><em>All</em></MenuItem>
              {roles.map(r => <MenuItem key={r} value={r}>{this.formatRole(r)}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" style={{ minWidth: 130 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} label="Status" onChange={e => this.setState({ statusFilter: e.target.value as string, page: 0 })}>
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" color="primary" startIcon={<GetAppIcon />} onClick={this.handleExport}>
            Export
          </Button>
        </Grid>

        <Grid item style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 800 }}>
            <thead style={{ borderBottom: '2px solid #0988ec' }}>
              <tr>
                <SortHeader field="lastName" label="Last Name" />
                <SortHeader field="firstName" label="First Name" />
                <SortHeader field="email" label="Email" />
                <SortHeader field="role" label="Role" />
                <SortHeader field="school" label="School" />
                <SortHeader field="archived" label="Status" />
                <SortHeader field="lastLogin" label="Last Login" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><TableCell colSpan={7} style={{ textAlign: 'center', padding: 40 }}>No users found</TableCell></tr>
              ) : paginated.map(user => (
                <TableRow key={user.id} onClick={() => this.props.onUserClick?.(user)}>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{this.formatRole(user.role)}</TableCell>
                  <TableCell>{user.school}</TableCell>
                  <TableCell><StatusBadge archived={user.archived}>{user.archived ? 'Archived' : 'Active'}</StatusBadge></TableCell>
                  <TableCell>{this.formatDate(user.lastLogin)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </table>
        </Grid>

        <Grid item>
          <TablePagination
            component="div" count={filtered.length} page={page} rowsPerPage={perPage}
            onPageChange={(_, p) => this.setState({ page: p })}
            onRowsPerPageChange={e => this.setState({ perPage: +e.target.value, page: 0 })}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </Grid>
      </Grid>
    )
  }
}

export default AllUsersTable
