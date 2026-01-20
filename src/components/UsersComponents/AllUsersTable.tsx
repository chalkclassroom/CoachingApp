import {
  Grid,
  Typography,
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
  :nth-child(odd) {
    background-color: rgb(234, 234, 234);
  }
  &:hover {
    background-color: rgb(9, 136, 236, 0.4);
    cursor: pointer;
  }
`

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  min-width: 800px;
`

const TableHeader = styled.th`
  padding: 12px 8px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
`

const TableCell = styled.td`
  padding: 12px 8px;
  text-align: left;
`

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`

const StatusBadge = styled.span<{ archived: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => (props.archived ? '#ffebee' : '#e8f5e9')};
  color: ${props => (props.archived ? '#c62828' : '#2e7d32')};
`

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  archived: boolean
  lastLogin: Date | null
  school: string
}

interface Props {
  users: User[]
  onUserClick?: (user: User) => void
}

interface State {
  searchInput: string
  sortField: string
  sortDirection: 'asc' | 'desc'
  roleFilter: string
  statusFilter: string
  page: number
  rowsPerPage: number
}

type SortField = 'lastName' | 'firstName' | 'email' | 'role' | 'archived' | 'lastLogin' | 'school'

class AllUsersTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      searchInput: '',
      sortField: 'lastName',
      sortDirection: 'asc',
      roleFilter: '',
      statusFilter: '',
      page: 0,
      rowsPerPage: 10,
    }
  }

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchInput: event.target.value, page: 0 })
  }

  handleSort = (field: SortField) => {
    const { sortField, sortDirection } = this.state
    if (sortField === field) {
      this.setState({ sortDirection: sortDirection === 'asc' ? 'desc' : 'asc' })
    } else {
      this.setState({ sortField: field, sortDirection: 'asc' })
    }
  }

  handleRoleFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ roleFilter: event.target.value as string, page: 0 })
  }

  handleStatusFilter = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({ statusFilter: event.target.value as string, page: 0 })
  }

  handleChangePage = (_event: unknown, newPage: number) => {
    this.setState({ page: newPage })
  }

  handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 })
  }

  handleExport = () => {
    const filteredUsers = this.getFilteredAndSortedUsers()
    const wb = generateUsersXlsx(filteredUsers)
    xlsx.writeFile(wb, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  getFilteredAndSortedUsers = (): User[] => {
    const { searchInput, sortField, sortDirection, roleFilter, statusFilter } = this.state
    let filtered = [...this.props.users]

    // Apply search filter
    if (searchInput) {
      const search = searchInput.toLowerCase()
      filtered = filtered.filter(
        user =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search) ||
          user.school.toLowerCase().includes(search) ||
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(search)
      )
    }

    // Apply role filter
    if (roleFilter) {
      filtered = filtered.filter(user => user.role === roleFilter)
    }

    // Apply status filter
    if (statusFilter) {
      const isArchived = statusFilter === 'archived'
      filtered = filtered.filter(user => user.archived === isArchived)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aVal: string | number | boolean | null = a[sortField as keyof User]
      let bVal: string | number | boolean | null = b[sortField as keyof User]

      // Handle null values for lastLogin
      if (sortField === 'lastLogin') {
        aVal = a.lastLogin ? a.lastLogin.getTime() : 0
        bVal = b.lastLogin ? b.lastLogin.getTime() : 0
      }

      // Handle string comparison
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }

  formatDate = (date: Date | null): string => {
    if (!date) return 'Never'
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  formatRole = (role: string): string => {
    const roleMap: { [key: string]: string } = {
      admin: 'Admin',
      programLeader: 'Program Leader',
      siteLeader: 'Site Leader',
      coach: 'Coach',
      teacher: 'Teacher',
    }
    return roleMap[role] || role
  }

  getUniqueRoles = (): string[] => {
    const roles = new Set(this.props.users.map(user => user.role))
    return Array.from(roles).sort()
  }

  render() {
    const { searchInput, sortField, sortDirection, roleFilter, statusFilter, page, rowsPerPage } =
      this.state
    const { onUserClick } = this.props

    const filteredUsers = this.getFilteredAndSortedUsers()
    const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    const uniqueRoles = this.getUniqueRoles()

    return (
      <Grid container direction="column" spacing={3}>
        {/* Filters and Search */}
        <Grid item>
          <FilterContainer>
            <TextField
              style={{ width: '250px' }}
              id="user-search"
              label="Search"
              type="search"
              value={searchInput}
              variant="outlined"
              size="small"
              onChange={this.handleSearch}
            />
            <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
              <InputLabel>Role</InputLabel>
              <Select value={roleFilter} onChange={this.handleRoleFilter} label="Role">
                <MenuItem value="">
                  <em>All Roles</em>
                </MenuItem>
                {uniqueRoles.map(role => (
                  <MenuItem key={role} value={role}>
                    {this.formatRole(role)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={this.handleStatusFilter} label="Status">
                <MenuItem value="">
                  <em>All Status</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={this.handleExport}
            >
              Export
            </Button>
          </FilterContainer>
        </Grid>

        {/* Table */}
        <Grid item>
          <TableContainer>
            <StyledTable>
              <thead style={{ borderBottom: '2px solid #0988ec' }}>
                <tr>
                  <TableHeader onClick={() => this.handleSort('lastName')}>
                    <TableSortLabel
                      active={sortField === 'lastName'}
                      direction={sortField === 'lastName' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>Last Name</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('firstName')}>
                    <TableSortLabel
                      active={sortField === 'firstName'}
                      direction={sortField === 'firstName' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>First Name</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('email')}>
                    <TableSortLabel
                      active={sortField === 'email'}
                      direction={sortField === 'email' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>Email</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('role')}>
                    <TableSortLabel
                      active={sortField === 'role'}
                      direction={sortField === 'role' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>Role</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('school')}>
                    <TableSortLabel
                      active={sortField === 'school'}
                      direction={sortField === 'school' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>School/Site</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('archived')}>
                    <TableSortLabel
                      active={sortField === 'archived'}
                      direction={sortField === 'archived' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>Status</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                  <TableHeader onClick={() => this.handleSort('lastLogin')}>
                    <TableSortLabel
                      active={sortField === 'lastLogin'}
                      direction={sortField === 'lastLogin' ? sortDirection : 'asc'}
                    >
                      <Typography variant="subtitle2">
                        <strong>Last Login</strong>
                      </Typography>
                    </TableSortLabel>
                  </TableHeader>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.length === 0 ? (
                  <tr>
                    <TableCell colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>
                      <Typography variant="body1" color="textSecondary">
                        No users found
                      </Typography>
                    </TableCell>
                  </tr>
                ) : (
                  paginatedUsers.map((user, index) => (
                    <TableRow
                      key={user.id || index}
                      onClick={() => onUserClick && onUserClick(user)}
                    >
                      <TableCell>
                        <Typography variant="body2">{user.lastName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.firstName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.email}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{this.formatRole(user.role)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{user.school}</Typography>
                      </TableCell>
                      <TableCell>
                        <StatusBadge archived={user.archived}>
                          {user.archived ? 'Archived' : 'Active'}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{this.formatDate(user.lastLogin)}</Typography>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </tbody>
            </StyledTable>
          </TableContainer>
        </Grid>

        {/* Pagination */}
        <Grid item>
          <TablePagination
            component="div"
            count={filteredUsers.length}
            page={page}
            onPageChange={this.handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Grid>
      </Grid>
    )
  }
}

export default AllUsersTable
