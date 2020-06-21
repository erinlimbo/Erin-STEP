import Button from '@material-ui/core/Button';
import React from "react"

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello from Create React App</h1>
        <p>This is a React Component!</p>
        <Button variant="contained" color="primary">
            Material Button
        </Button>
      </div>
    )
  }
}
export default AppContainer