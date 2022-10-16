# react-select-control
A library of React components created using `create-react-app`.
## Installation
Run the following command:
`npm install react-select-control`

## Usage
import ReactSelectControl from 'react-select-control'
<ReactSelectControl options={options} />


## Example Usage with props
const App = () => {
  const options = []
  return <ReactSelectControl options={options} isSearchable isMulti />
}