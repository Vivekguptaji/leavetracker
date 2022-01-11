import "./accounts.css";

export default function Accounts() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Account</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label className="required">Account Name</label>
          <input type="text"/>
        </div>
        <div className="newUserItem">
          <label className="required">Start Date</label>
          <input type="date" required/>
        </div>
        <div className="newUserItem">
          <label>End Date</label>
          <input type="date" required/>
        </div>
        <div className="newUserItem">
          <label>Account Code</label>
          <input type="text"/>
        </div>
        <div className="newUserItem">
          <label>Status</label>
          <select>
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div className="newUserItem">
          <label className="required">Claim Hours/Bill Rate</label>
          <input type="text" required/>
        </div>
        <div className="newUserItem">
          <label>Currency</label>
          <input type="text" required/>
        </div>
        <button className="newUserButton">Create</button>
      </form>
    </div>
  );
}
