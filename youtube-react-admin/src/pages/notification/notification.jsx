import React from "react";
import "../notification/notification.css";
import { Notifications } from "@material-ui/icons/Lock";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
function NotificationPage() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Notify</h1>
      <form>
        <div class="UserItem">
          <label class="label">From</label>
          <input
            type="email"
            placeholder=""
            // value={name}
            // onChange={changeName}
            required
          />
        </div>
        <div class="UserItem">
          <label class="label">To</label>
          <input
            type="email"
            placeholder=""
            // value={name}
            // onChange={changeName}
            required
          />
        </div>{" "}
        <div class="UserItem">
          <label class="label">Cc</label>
          <input
            type="email"
            placeholder=""
            // value={name}
            // onChange={changeName}
            required
          />
        </div>
        <div class="UserItem">
          <label class="label">Bcc</label>
          <input
            type="email"
            placeholder=""
            // value={name}
            // onChange={changeName}
            required
          />
        </div>
        <div class="UserItem">
          <label class="labelSubject">Subject</label>
          <input
            type="email"
            placeholder=""
            // value={name}
            // onChange={changeName}
            required
          />
        </div>
        <Editor
        //   editorState={editorState}
        //   onEditorStateChange={this.onEditorStateChange}
        />
      </form>
    </div>
  );
}
export default NotificationPage;
