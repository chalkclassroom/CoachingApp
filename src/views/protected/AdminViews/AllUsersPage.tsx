import * as React from 'react'
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core'
import CHALKLogoGIF from '../../../assets/images/CHALKLogoGIF.gif'
import Firebase, { FirebaseContext } from '../../../components/Firebase'
import AppBar from '../../../components/AppBar'
import { connect } from 'react-redux'
import { Role } from '../../../state/actions/coach'
import AllUsersTable from '../../../components/UsersComponents/AllUsersTable'
import * as Types from '../../../constants/Types'

interface Props { isAdmin: boolean }
interface State {
  loading: boolean
  users: Types.User[]
  loginCounts: Map<string, number>
  rangeStart: Date
  rangeEnd: Date
  editOpen: boolean
  archiveOpen: boolean
  selected: Types.User | null
  firstName: string
  lastName: string
  email: string
}

const defaultRange = (): { start: Date; end: Date } => {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  const start = new Date()
  start.setDate(start.getDate() - 29)
  start.setHours(0, 0, 0, 0)
  return { start, end }
}

class AllUsersPage extends React.Component<Props, State> {
  static contextType = FirebaseContext
  context!: Firebase

  state: State = {
    loading: true, users: [], loginCounts: new Map(),
    rangeStart: defaultRange().start, rangeEnd: defaultRange().end,
    editOpen: false, archiveOpen: false,
    selected: null, firstName: '', lastName: '', email: '',
  }

  componentDidMount() {
    const { rangeStart, rangeEnd } = this.state
    Promise.all([
      this.context.getAllUsers(),
      this.context.getUsersLoginCounts(rangeStart, rangeEnd)
    ])
      .then(([users, loginCounts]) => this.setState({ users, loginCounts, loading: false }))
      .catch(() => { alert('Error loading users'); this.setState({ loading: false }) })
  }

  handleRangeChange = (start: Date, end: Date) => {
    this.setState({ rangeStart: start, rangeEnd: end })
    this.context.getUsersLoginCounts(start, end)
      .then(loginCounts => this.setState({ loginCounts }))
      .catch(() => alert('Error loading login counts'))
  }

  handleUserClick = (user: Types.User) => {
    this.setState({
      selected: user, firstName: user.firstName, lastName: user.lastName,
      email: user.email || '', editOpen: true,
    })
  }

  handleSave = async () => {
    const { selected, firstName, lastName, email } = this.state
    if (!selected || !firstName.trim() || !lastName.trim()) return alert('Name required')

    await this.context.editUserName(selected.id, firstName, lastName, email, selected.role)
    this.setState(s => ({
      users: s.users.map(u => u.id === selected.id ? { ...u, firstName, lastName, email } : u),
      editOpen: false, selected: null,
    }))
  }

  handleArchive = async () => {
    const { selected } = this.state
    if (!selected) return

    await this.context.db.collection('users').doc(selected.id).update({ archived: !selected.archived })
    this.setState(s => ({
      users: s.users.map(u => u.id === selected.id ? { ...u, archived: !selected.archived } : u),
      archiveOpen: false, selected: null,
    }))
  }

  render() {
    const { isAdmin } = this.props
    const { loading, users, loginCounts, rangeStart, rangeEnd, editOpen, archiveOpen, selected, firstName, lastName, email } = this.state

    return (
      <div style={{ height: '100vh', overflow: 'auto' }}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase) => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>

        {!isAdmin ? (
          <Typography style={{ padding: 32 }}>You must be an admin to access this page.</Typography>
        ) : (
          <div style={{ padding: 32 }}>
            <Typography variant="h4" style={{ marginBottom: 24 }}>All Users</Typography>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: 64 }}>
                <img src={CHALKLogoGIF} alt="Loading" width="150" />
              </div>
            ) : (
              <AllUsersTable
                users={users}
                loginCounts={loginCounts}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onRangeChange={this.handleRangeChange}
                onUserClick={this.handleUserClick}
                onArchiveClick={user => this.setState({ selected: user, archiveOpen: true })}
              />
            )}
          </div>
        )}

        <Dialog open={editOpen} onClose={() => this.setState({ editOpen: false })} maxWidth="sm" fullWidth>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} style={{ marginTop: 8 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="First Name" variant="outlined" value={firstName}
                  onChange={e => this.setState({ firstName: e.target.value })} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Last Name" variant="outlined" value={lastName}
                  onChange={e => this.setState({ lastName: e.target.value })} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" variant="outlined" value={email}
                  onChange={e => this.setState({ email: e.target.value })} />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ editOpen: false, archiveOpen: true })}
              color={selected?.archived ? 'primary' : 'secondary'}>
              {selected?.archived ? 'Unarchive' : 'Archive'}
            </Button>
            <div style={{ flex: 1 }} />
            <Button onClick={() => this.setState({ editOpen: false })}>Cancel</Button>
            <Button onClick={this.handleSave} color="primary" variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={archiveOpen} onClose={() => this.setState({ archiveOpen: false })}>
          <DialogTitle>{selected?.archived ? 'Unarchive' : 'Archive'} User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to {selected?.archived ? 'unarchive' : 'archive'} {selected?.firstName} {selected?.lastName}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ archiveOpen: false })}>Cancel</Button>
            <Button onClick={this.handleArchive} color={selected?.archived ? 'primary' : 'secondary'} variant="contained">
              {selected?.archived ? 'Unarchive' : 'Archive'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default connect(state => ({
  isAdmin: state.coachState.role === Role.ADMIN,
}))(AllUsersPage)
