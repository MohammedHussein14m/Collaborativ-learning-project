import React, { useState } from "react";
import { Card, CardContent, Avatar } from "@material-ui/core";
import Formsy from "formsy-react";
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Image from "assets/img/default-avatar.png";
import Input from "shared/components/Input/Input";
import InputFile from "./InputFlie";
import CustomButton from "shared/components/CustomButton/CustomButton";
import styles from "../style/style";

const useStyles = makeStyles(styles);

function SettingForm() {
  const classes = useStyles();
  const [userImage, setUserImage] = useState(Image);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [disableControls, setDisableControls] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    setDisableControls(true);
  };

  return (
    <Card className={classes.SettingForm}>
      <CardContent className={classes.CardContent}>
        <div className={classes.SettingText}>Settings</div>
        <div className={classes.CardForm}>
          <div className={classes.imageForm}>
            <Avatar
              alt="Remy Sharp"
              src={userImage}
              className={classes.userImage}
            />
            <InputFile />
          </div>
          <Formsy
            onValidSubmit={handleSubmit}
            onValid={() => setCanSubmit(true)}
            onInvalid={() => setCanSubmit(false)}
            className={classes.form}
          >
            <div className="ui form">
              <div className="field">
                <Input
                  name="FirstName"
                  type="text"
                  validations="isExisty"
                  value={firstName}
                  placeholder="First Name"
                  onChange={e => setFirstName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <Input
                  name="lastName"
                  type="text"
                  validations="isExisty"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={e => setLastName(e.target.value)}
                  required
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <Input
                  name="title"
                  type="text"
                  value={title}
                  placeholder="Your Title"
                  onChange={e => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <Input
                  style={{ height: "8em" }}
                  name="Description"
                  type="textarea"
                  value={description}
                  placeholder="Description"
                  onChange={e => setDescription(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  padding: 8,
                  alignItems: "center",
                  justifyContent: "flex-end"
                }}
              >
                <CustomButton
                  isLoading={disableControls}
                  disabled={!canSubmit}
                  onClick={handleSubmit}
                  style={{ maxWidth: 100, minWidth: 50 }}
                >
                  Save
                </CustomButton>
              </div>
            </div>
          </Formsy>
        </div>
      </CardContent>
    </Card>
  );
}

export default SettingForm;
