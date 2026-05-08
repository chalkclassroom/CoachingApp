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
  IconButton,
  Switch,
  Tooltip,
} from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import React from 'react'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import styled from 'styled-components'
import * as Types from '../../constants/Types'

const TableRow = styled.tr`
  background-color: white;
  :nth-child(odd) { background-color: rgb(234, 234, 234); }
  &:hover { background-color: rgba(9, 136, 236, 0.4); cursor: pointer; }
`

const TableCell = styled.td`
  padding: 4px 8px;
  text-align: left;
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.6;
`

const StatusBadge = styled.span<{ archived: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => (props.archived ? '#ffebee' : '#e8f5e9')};
  color: ${props => (props.archived ? '#c62828' : '#2e7d32')};
`

interface Props {
  users: Types.User[]
  loginCounts: Map<string, number>
  rangeStart: Date
  rangeEnd: Date
  onRangeChange: (start: Date, end: Date) => void
  onUserClick?: (user: Types.User) => void
  onArchiveClick?: (user: Types.User) => void
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
    perPage: 50,
  }

  handleSort = (field: string) => {
    this.setState(s => ({
      sortField: field,
      sortDir: s.sortField === field && s.sortDir === 'asc' ? 'desc' : 'asc',
    }))
  }

  getFilteredUsers = (): Types.User[] => {
    const { search, sortField, sortDir, roleFilter, statusFilter } = this.state
    let users = [...this.props.users]

    if (search) {
      const s = search.toLowerCase()
      users = users.filter(u =>
        `${u.firstName} ${u.lastName} ${u.email} ${u.role} ${u.program}`.toLowerCase().includes(s)
      )
    }
    if (roleFilter) users = users.filter(u => u.role === roleFilter)
    if (statusFilter) users = users.filter(u => u.archived === (statusFilter === 'archived'))

    users.sort((a, b) => {
      const isDateField = sortField === 'lastLogin' || sortField === 'lastAction'
      const isLoginCount = sortField === 'loginCount'
      let aVal: number | string
      let bVal: number | string
      if (isLoginCount) {
        aVal = this.props.loginCounts.get(a.id) || 0
        bVal = this.props.loginCounts.get(b.id) || 0
      } else if (isDateField) {
        aVal = a[sortField]?.getTime() || 0
        bVal = b[sortField]?.getTime() || 0
      } else {
        aVal = String(a[sortField] || '').toLowerCase()
        bVal = String(b[sortField] || '').toLowerCase()
      }
      return sortDir === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1)
    })

    return users
  }

  formatRole = (role: string) => ({
    admin: 'Admin', programLeader: 'Program Leader', siteLeader: 'Site Leader',
    coach: 'Coach', teacher: 'Teacher',
  }[role] || role)

  formatDate = (d: Date | null) => d ? d.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Never'

  formatLastAction = (user: Types.User) => {
    if (!user.lastAction) return 'Never'
    const date = user.lastAction.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
    return user.lastActionType ? `${user.lastActionType} - ${date}` : date
  }

  formatRangeLabel = () => {
    const fmt = (d: Date) => d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    return `${fmt(this.props.rangeStart)} \u2013 ${fmt(this.props.rangeEnd)}`
  }

  applyPreset = (days: number) => {
    const end = new Date()
    end.setHours(23, 59, 59, 999)
    const start = new Date()
    start.setDate(start.getDate() - days + 1)
    start.setHours(0, 0, 0, 0)
    this.props.onRangeChange(start, end)
  }

  handleExport = () => {
    const users = this.getFilteredUsers()
    const headers = [
      'Last Name', 'First Name', 'Email', 'Role', 'Program', 'Status',
      'Last Login', `Logins (${this.formatRangeLabel()})`, 'Last Action', 'Action Type'
    ]
    const escape = (val: string) => `"${(val || '').replace(/"/g, '""')}"`
    const rows = users.map(u => [
      escape(u.lastName), escape(u.firstName), escape(u.email),
      escape(this.formatRole(u.role)), escape(u.program || ''),
      escape(u.archived ? 'Archived' : 'Active'),
      escape(this.formatDate(u.lastLogin)),
      String(this.props.loginCounts.get(u.id) || 0),
      escape(this.formatDate(u.lastAction)),
      escape(u.lastActionType || '')
    ].join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `users_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  render() {
    const { search, sortField, sortDir, roleFilter, statusFilter, page, perPage } = this.state
    const filtered = this.getFilteredUsers()
    const paginated = filtered.slice(page * perPage, (page + 1) * perPage)
    const roles = [...new Set(this.props.users.map(u => u.role))].sort()

    const SortHeader = ({ field, label }: { field: string; label: string }) => (
      <th style={{ padding: '4px 8px', cursor: 'pointer', fontSize: '1.25rem', fontWeight: 500 }} onClick={() => this.handleSort(field)}>
        <TableSortLabel active={sortField === field} direction={sortField === field ? sortDir : 'asc'}>
          <strong>{label}</strong>
        </TableSortLabel>
      </th>
    )

    const { rangeStart, rangeEnd, onRangeChange } = this.props

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

        <Grid item style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>Login range:</span>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar variant="inline" format="MM/dd/yy" margin="none"
              autoOk label="From" value={rangeStart} style={{ width: 150 }}
              onChange={(date: Date | null) => date && onRangeChange(date, rangeEnd)}
            />
            <KeyboardDatePicker
              disableToolbar variant="inline" format="MM/dd/yy" margin="none"
              autoOk label="To" value={rangeEnd} style={{ width: 150 }}
              onChange={(date: Date | null) => date && onRangeChange(rangeStart, date)}
            />
          </MuiPickersUtilsProvider>
          <Button size="small" variant="outlined" onClick={() => this.applyPreset(7)}>Last 7d</Button>
          <Button size="small" variant="outlined" onClick={() => this.applyPreset(30)}>Last 30d</Button>
          <Button size="small" variant="outlined" onClick={() => this.applyPreset(90)}>Last 90d</Button>
        </Grid>

        <Grid item style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 800 }}>
            <thead style={{ borderBottom: '2px solid #0988ec' }}>
              <tr>
                <SortHeader field="lastName" label="Last Name" />
                <SortHeader field="firstName" label="First Name" />
                <SortHeader field="email" label="Email" />
                <SortHeader field="role" label="Role" />
                <SortHeader field="program" label="Program" />
                <SortHeader field="archived" label="Status" />
                <SortHeader field="lastLogin" label="Last Login" />
                <SortHeader field="loginCount" label={`Logins (${this.formatRangeLabel()})`} />
                <SortHeader field="lastAction" label="Last Action" />
                <th style={{ padding: '4px 8px', textAlign: 'center', fontSize: '1.25rem', fontWeight: 500 }}><strong>Edit</strong></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><TableCell colSpan={10} style={{ textAlign: 'center', padding: 40 }}>No users found</TableCell></tr>
              ) : paginated.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{this.formatRole(user.role)}</TableCell>
                  <TableCell>{user.program}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <StatusBadge archived={user.archived}>{user.archived ? 'Archived' : 'Active'}</StatusBadge>
                    <Tooltip title={user.archived ? 'Activate user' : 'Archive user'}>
                      <Switch
                        size="small"
                        checked={!user.archived}
                        onChange={() => this.props.onArchiveClick?.(user)}
                        color="primary"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>{this.formatDate(user.lastLogin)}</TableCell>
                  <TableCell>{this.props.loginCounts.get(user.id) || 0}</TableCell>
                  <TableCell>{this.formatLastAction(user)}</TableCell>
                  <TableCell onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
                    <Tooltip title="Edit user">
                      <IconButton size="small" onClick={() => this.props.onUserClick?.(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
            labelDisplayedRows={({ from, to, count }) => `Showing ${from}-${to} of ${count} records`}
          />
        </Grid>
      </Grid>
    )
  }
}

export default AllUsersTable
