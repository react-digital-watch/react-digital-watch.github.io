import logo from './logo.svg';
import './App.css';
import { ReactCrud } from 'react-crud-2';

const formData = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name",
    value: ""
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name",
    value: ""
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    value: ""
  },
  {
    name: "address",
    type: "textarea",
    label: "Address",
    placeholder: "Enter Address",
    value: ""
  }
];

function App() {
  return (
    <div>
      <div className="App">
        <ReactCrud formTitle={"Employee Data"} showDate={false} bengaliDate={false} data={formData} />
      </div>
    </div>
  );
}

export default App;
